// Teacher engine: drives "learn a song" play-along on the SAME Tone.js
// Transport and sampler the rest of the app uses, so lessons stay in time and
// can layer over the beat. No falling notes — guidance is the target key
// lighting up (with a slight early highlight in Play mode for preparation).
//
// Two modes:
//   • learn — event-driven; the song WAITS for you to press the right key.
//   • play  — runs at (scaled) tempo through a Tone.Part; you play along.
//
// SPEC-NOTE: during a lesson the Transport tempo is owned by the lesson
// (song BPM × tempo scale). If the drum beat is on it simply plays at the
// lesson tempo too, which is musically what you want. The app's own beat BPM
// is restored on exit().
import * as Tone from "tone";
import * as core from "./audioEngine";
import { getSong, type Song } from "./songs";

export type TeacherMode = "learn" | "play";
export type TeacherStatus = "idle" | "countin" | "running" | "paused" | "finished";

export interface TeacherState {
  songId: string;
  mode: TeacherMode;
  status: TeacherStatus;
  tempoScale: number;
  progress: number; // 0..1
  targetNote: string | null; // key to light up NOW
  upcomingNote: string | null; // subtle look-ahead (play mode)
  countBeat: number; // 0 = not counting in, else 1..4
  loopA: number | null; // fraction 0..1
  loopB: number | null;
  playedIndex: number; // learn: notes completed
  totalPlayable: number;
}

interface Playable {
  note: string;
  startBeat: number;
  beats: number;
}

const SKIP_SECONDS = 7; // Play-mode quick rewind/FF step (adjustable later)
const LEARN_SKIP_NOTES = 4; // Learn-mode skip ≈ one phrase
const LEAD_BEATS = 0.5; // Play-mode early-highlight lead time

let song: Song = getSong("twinkle");
let playable: Playable[] = [];
let totalBeats = 0;

let mode: TeacherMode = "learn";
let status: TeacherStatus = "idle";
let tempoScale = 1;
let playedIndex = 0;
let loopA: number | null = null;
let loopB: number | null = null;

let part: Tone.Part | null = null;
let rafId: number | null = null;
let restoreBpm = 90;

type Listener = (s: TeacherState) => void;
const listeners = new Set<Listener>();

function transport() {
  return Tone.getTransport();
}
function ppq() {
  return transport().PPQ;
}
function songStartTicks() {
  return ppq() * 4; // 1-bar count-in
}
function totalTicks() {
  return totalBeats * ppq();
}

function precompute() {
  playable = [];
  let beat = 0;
  for (const n of song.notes) {
    if (n.note) playable.push({ note: n.note, startBeat: beat, beats: n.beats });
    beat += n.beats;
  }
  totalBeats = beat;
}

function currentState(extra?: Partial<TeacherState>): TeacherState {
  return {
    songId: song.id,
    mode,
    status,
    tempoScale,
    progress: 0,
    targetNote: null,
    upcomingNote: null,
    countBeat: 0,
    loopA,
    loopB,
    playedIndex,
    totalPlayable: playable.length,
    ...extra,
  };
}

function publish(extra?: Partial<TeacherState>) {
  const s = currentState(extra);
  listeners.forEach((l) => l(s));
}

export function subscribe(l: Listener): () => void {
  listeners.add(l);
  l(currentState());
  return () => listeners.delete(l);
}

export function load(songId: string) {
  stopInternal();
  song = getSong(songId);
  precompute();
  playedIndex = 0;
  loopA = null;
  loopB = null;
  status = mode === "learn" ? "running" : "idle";
  publish(learnExtras());
}

export function setMode(next: TeacherMode) {
  stopInternal();
  mode = next;
  playedIndex = 0;
  status = mode === "learn" ? "running" : "idle";
  publish(mode === "learn" ? learnExtras() : undefined);
}

export function setTempoScale(scale: number) {
  tempoScale = Math.max(0.25, Math.min(1.5, scale));
  if (mode === "play" && (status === "running" || status === "countin")) {
    transport().bpm.value = song.bpm * tempoScale;
  }
  publish(mode === "learn" ? learnExtras() : undefined);
}

// ---- Learn mode ----

function learnExtras(): Partial<TeacherState> {
  const target = playable[playedIndex]?.note ?? null;
  return {
    progress: playable.length ? playedIndex / playable.length : 0,
    targetNote: status === "finished" ? null : target,
  };
}

/** Returns true if the pressed note was the expected one (Learn mode only). */
export function handleUserNote(note: string): boolean {
  if (mode !== "learn" || status === "finished") return false;
  const target = playable[playedIndex]?.note;
  if (note !== target) return false;
  playedIndex++;
  if (loopB !== null && playedIndex / playable.length >= loopB) {
    playedIndex = Math.round((loopA ?? 0) * playable.length);
  }
  if (playedIndex >= playable.length) {
    status = "finished";
    publish({ progress: 1, targetNote: null });
    return true;
  }
  publish(learnExtras());
  return true;
}

// ---- Play mode ----

export function play() {
  if (mode === "learn") {
    // Learn mode is always armed; "play" just (re)starts from where you are.
    if (status === "finished") playedIndex = 0;
    status = "running";
    publish(learnExtras());
    return;
  }
  if (status === "paused") {
    status = "running";
    transport().start();
    tick();
    return;
  }
  buildPlayPart();
  transport().bpm.value = song.bpm * tempoScale;
  transport().pause();
  transport().position = 0;
  for (let b = 0; b < 4; b++) {
    transport().scheduleOnce((time) => core.playClick(b === 0, time), `0:${b}:0`);
  }
  part!.start("1m");
  status = "countin";
  transport().start();
  tick();
}

function buildPlayPart() {
  if (part) part.dispose();
  part = new Tone.Part(
    (time, ev: Playable) => {
      const dur = Tone.Ticks(ev.beats * ppq()).toSeconds();
      core.playNoteAt(ev.note, dur, time, 0.9);
    },
    playable.map((p) => ({ time: `${p.startBeat * ppq()}i`, ...p }))
  );
  part.loop = false;
}

export function pause() {
  if (mode === "play" && (status === "running" || status === "countin")) {
    transport().pause();
    status = "paused";
    stopRaf();
    publish();
  } else if (mode === "learn") {
    status = "paused";
    publish();
  }
}

export function togglePlay() {
  if (status === "running" || status === "countin") pause();
  else play();
}

/** Reset to the start without exiting the lesson. */
export function restart() {
  if (mode === "play") {
    stopInternal();
    status = "idle";
    publish({ progress: 0, targetNote: null });
  } else {
    playedIndex = 0;
    status = "running";
    publish(learnExtras());
  }
}

export function seekFraction(f: number) {
  const frac = Math.max(0, Math.min(1, f));
  if (mode === "learn") {
    playedIndex = Math.round(frac * playable.length);
    if (playedIndex >= playable.length) playedIndex = playable.length;
    status = playedIndex >= playable.length ? "finished" : "running";
    publish(learnExtras());
  } else {
    transport().ticks = songStartTicks() + frac * totalTicks();
    publish();
  }
}

export function skip(dir: 1 | -1) {
  if (mode === "learn") {
    playedIndex = Math.max(
      0,
      Math.min(playable.length, playedIndex + dir * LEARN_SKIP_NOTES)
    );
    status = playedIndex >= playable.length ? "finished" : "running";
    publish(learnExtras());
  } else {
    const deltaTicks = Tone.Time(SKIP_SECONDS).toTicks() * dir;
    const min = songStartTicks();
    transport().ticks = Math.max(min, transport().ticks + deltaTicks);
    publish();
  }
}

// ---- A–B loop (fractions, uniform across modes) ----

export function markLoopA() {
  loopA = currentFraction();
  if (loopB !== null && loopB <= loopA) loopB = null;
  publish(mode === "learn" ? learnExtras() : undefined);
}
export function markLoopB() {
  const f = currentFraction();
  loopB = loopA !== null && f > loopA ? f : f;
  if (loopA !== null && loopB <= loopA) loopA = null;
  publish(mode === "learn" ? learnExtras() : undefined);
}
export function clearLoop() {
  loopA = null;
  loopB = null;
  publish(mode === "learn" ? learnExtras() : undefined);
}

function currentFraction(): number {
  if (mode === "learn") {
    return playable.length ? playedIndex / playable.length : 0;
  }
  const t = transport().ticks - songStartTicks();
  return Math.max(0, Math.min(1, totalTicks() ? t / totalTicks() : 0));
}

// ---- Play-mode animation loop ----

function tick() {
  stopRaf();
  const step = () => {
    const startTicks = songStartTicks();
    const cur = transport().ticks - startTicks;
    if (transport().ticks < startTicks) {
      // still in the count-in bar
      const beat = Math.floor(transport().ticks / ppq()) + 1;
      publish({ status: "countin", countBeat: beat, progress: 0 });
      rafId = requestAnimationFrame(step);
      return;
    }
    status = "running";
    const progress = Math.max(0, Math.min(1, cur / totalTicks()));

    if (loopB !== null && progress >= loopB) {
      seekFraction(loopA ?? 0);
      rafId = requestAnimationFrame(step);
      return;
    }
    if (progress >= 1) {
      finishPlay();
      return;
    }

    const leadTicks = LEAD_BEATS * ppq();
    let target: string | null = null;
    let upcoming: string | null = null;
    for (let i = 0; i < playable.length; i++) {
      const p = playable[i];
      const s = p.startBeat * ppq();
      const e = (p.startBeat + p.beats) * ppq();
      if (cur >= s - leadTicks && cur < e) {
        target = p.note;
        upcoming = playable[i + 1]?.note ?? null;
        break;
      }
      if (cur < s - leadTicks) {
        upcoming = p.note;
        break;
      }
    }
    publish({ status: "running", progress, targetNote: target, upcomingNote: upcoming });
    rafId = requestAnimationFrame(step);
  };
  rafId = requestAnimationFrame(step);
}

function finishPlay() {
  transport().pause();
  status = "finished";
  stopRaf();
  publish({ progress: 1, targetNote: null });
}

function stopRaf() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function stopInternal() {
  stopRaf();
  if (part) {
    part.dispose();
    part = null;
  }
}

export function setRestoreBpm(bpm: number) {
  restoreBpm = bpm;
}

/** Fully tear down the lesson and hand the Transport tempo back to the beat. */
export function exit() {
  stopInternal();
  transport().bpm.value = restoreBpm;
  status = "idle";
  playedIndex = 0;
  publish({ progress: 0, targetNote: null });
}

export function getSongId() {
  return song.id;
}
