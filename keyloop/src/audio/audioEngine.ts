// All Tone.js logic lives here, out of the React components.
//
// Timing model: ONE Tone.js Transport is the clock for everything — the drum
// beat (Tone.Sequence), the metronome (Tone.Loop) and the recorded phrase
// (Tone.Part). Note events are captured and stored in transport TICKS, not
// seconds, so changing the BPM retimes the beat AND the recorded loop
// together and they can never drift apart.
import * as Tone from "tone";
import { PATTERNS } from "./patterns";

export interface NoteEvent {
  note: string;
  /** Start time in transport ticks, relative to the start of the phrase. */
  ticks: number;
  durationTicks: number;
  velocity: number;
}

const DEFAULT_BPM = 90;
const DEFAULT_VELOCITY = 0.85;

let initialized = false;
let samplerReady = false;

let synth: Tone.PolySynth;
let sampler: Tone.Sampler;
let pianoGain: Tone.Gain;
let beatGain: Tone.Gain;
let kick: Tone.MembraneSynth;
let snare: Tone.NoiseSynth;
let hat: Tone.NoiseSynth;
let click: Tone.Synth;
let beatSeq: Tone.Sequence<number>;
let metronomeLoop: Tone.Loop;

let patternIndex = 0;
let sustainOn = false;
const sustainedNotes = new Set<string>();

let recording = false;
let recordStartTicks = 0;
let events: NoteEvent[] = [];
const heldForRecording = new Map<string, { ticks: number; velocity: number }>();

// Shape Tone.Part consumes: `time` is transport ticks notation ("480i").
type LoopEvent = {
  time: string;
  note: string;
  durationTicks: number;
  velocity: number;
};
let loopPart: Tone.Part<LoopEvent> | null = null;
let loopBars = 0;

function transport() {
  return Tone.getTransport();
}

function ticksPerBar(): number {
  return transport().PPQ * 4; // 4/4 time
}

function instrument(): Tone.Sampler | Tone.PolySynth {
  return samplerReady ? sampler : synth;
}

let initPromise: Promise<void> | null = null;

/**
 * Must be called from a user gesture (browsers/webviews refuse to start an
 * AudioContext otherwise). Safe to call repeatedly.
 */
export function initAudio(): Promise<void> {
  if (initPromise) {
    // The OS can suspend the context (e.g. app backgrounded) — resume on
    // the next touch.
    if (initialized && Tone.getContext().state !== "running") {
      void Tone.start();
    }
    return initPromise;
  }
  initPromise = doInit();
  return initPromise;
}

async function doInit(): Promise<void> {
  await Tone.start();

  // SPEC-NOTE: Tone's default 100ms scheduling look-ahead is audible as key
  // latency. 30ms keeps scheduling stable while feeling instant on touch.
  Tone.getContext().lookAhead = 0.03;

  pianoGain = new Tone.Gain(0.9).toDestination();
  beatGain = new Tone.Gain(0.5).toDestination();

  // Synth fallback: piano-ish envelope so development/first-load isn't
  // blocked while the sampler buffers load.
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "fatsine", count: 2, spread: 8 },
    envelope: { attack: 0.004, decay: 0.9, sustain: 0.12, release: 1.4 },
    volume: -8,
  }).connect(pianoGain);

  // Target sound: Salamander Grand samples (CC-BY, bundled in /public/samples).
  // Mapped every minor third across the playable range; Tone.Sampler
  // pitch-shifts between mapped notes. Equal temperament, A4 = 440Hz comes
  // from Tone's note-name handling — no hand-computed frequencies.
  sampler = new Tone.Sampler({
    urls: {
      A3: "A3.mp3",
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
      C5: "C5.mp3",
      "D#5": "Ds5.mp3",
      "F#5": "Fs5.mp3",
      A5: "A5.mp3",
    },
    baseUrl: `${import.meta.env.BASE_URL}samples/`,
    onload: () => {
      samplerReady = true;
    },
    onerror: (err) => {
      // Keep playing on the PolySynth fallback if samples are missing.
      console.warn("Piano samples failed to load, using synth fallback", err);
    },
  }).connect(pianoGain);

  // --- Drum kit (synthesised, no sample files needed) ---
  kick = new Tone.MembraneSynth({
    pitchDecay: 0.045,
    octaves: 7,
    envelope: { attack: 0.001, decay: 0.35, sustain: 0 },
  }).connect(beatGain);

  const snareFilter = new Tone.Filter(1800, "highpass").connect(beatGain);
  snare = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.17, sustain: 0 },
    volume: -6,
  }).connect(snareFilter);

  const hatFilter = new Tone.Filter(8000, "highpass").connect(beatGain);
  hat = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.045, sustain: 0 },
    volume: -14,
  }).connect(hatFilter);

  click = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.02 },
    volume: -16,
  }).toDestination();

  transport().bpm.value = DEFAULT_BPM;

  // One-bar, 16-step drum sequence, locked to the transport. It is always
  // "started" and toggled via mute so it never loses bar alignment.
  beatSeq = new Tone.Sequence<number>(
    (time, step) => {
      const p = PATTERNS[patternIndex];
      if (p.kick.includes(step)) kick.triggerAttackRelease("C1", "8n", time);
      if (p.snare.includes(step)) snare.triggerAttackRelease("16n", time);
      if (p.hat.includes(step)) hat.triggerAttackRelease("32n", time, 0.6);
    },
    Array.from({ length: 16 }, (_, i) => i),
    "16n"
  );
  beatSeq.mute = true;
  beatSeq.start(0);

  metronomeLoop = new Tone.Loop((time) => {
    const tick = transport().getTicksAtTime(time);
    const isBarStart = Math.round(tick) % ticksPerBar() === 0;
    click.triggerAttackRelease(isBarStart ? "G5" : "C5", "32n", time);
  }, "4n");
  metronomeLoop.mute = true;
  metronomeLoop.start(0);

  initialized = true;
}

function ensureTransportRunning() {
  if (transport().state !== "started") transport().start();
}

// --- Piano ---

export function noteOn(note: string, velocity: number = DEFAULT_VELOCITY) {
  if (!initialized) return;
  instrument().triggerAttack(note, undefined, velocity);
  sustainedNotes.delete(note);
  if (recording) {
    heldForRecording.set(note, {
      ticks: Math.max(0, transport().ticks - recordStartTicks),
      velocity,
    });
  }
}

export function noteOff(note: string) {
  if (!initialized) return;
  if (sustainOn) {
    sustainedNotes.add(note);
  } else {
    releaseNote(note);
  }
  if (recording) finalizeRecordedNote(note);
}

function releaseNote(note: string) {
  // Release on both instruments: a note may have been attacked on the synth
  // just before the sampler finished loading. Releasing an inactive note is
  // harmless in Tone.
  synth.triggerRelease(note);
  if (samplerReady) sampler.triggerRelease(note);
}

export function setSustain(on: boolean) {
  sustainOn = on;
  if (!on) {
    sustainedNotes.forEach((n) => releaseNote(n));
    sustainedNotes.clear();
  }
}

function finalizeRecordedNote(note: string) {
  const start = heldForRecording.get(note);
  if (!start) return;
  heldForRecording.delete(note);
  const now = Math.max(0, transport().ticks - recordStartTicks);
  events.push({
    note,
    ticks: start.ticks,
    durationTicks: Math.max(transport().PPQ / 8, now - start.ticks),
    velocity: start.velocity,
  });
}

// --- Beat ---

export function setBpm(bpm: number) {
  if (!initialized) return;
  transport().bpm.value = bpm;
}

export function setBeatVolume(v: number) {
  if (!initialized) return;
  beatGain.gain.rampTo(v, 0.05);
}

export function setPattern(index: number) {
  patternIndex = index;
}

export function setBeatPlaying(on: boolean) {
  if (!initialized) return;
  beatSeq.mute = !on;
  if (on) ensureTransportRunning();
}

export function setMetronome(on: boolean) {
  if (!initialized) return;
  metronomeLoop.mute = !on;
  if (on) ensureTransportRunning();
}

// --- Record / playback ---

export function startRecording() {
  if (!initialized) return;
  clearRecording();
  ensureTransportRunning();
  // Anchor the phrase to the start of the current bar so recorded notes keep
  // their musical position relative to the beat on playback.
  recordStartTicks =
    Math.floor(transport().ticks / ticksPerBar()) * ticksPerBar();
  recording = true;
}

/** Stops recording; returns true if a non-empty loop is now playing. */
export function stopRecording(): boolean {
  if (!recording) return false;
  recording = false;
  // Close any keys still held down.
  Array.from(heldForRecording.keys()).forEach(finalizeRecordedNote);

  if (events.length === 0) return false;

  const elapsed = transport().ticks - recordStartTicks;
  const lastEventEnd = Math.max(
    ...events.map((e) => e.ticks + e.durationTicks)
  );
  loopBars = Math.max(
    1,
    Math.ceil(Math.max(elapsed, lastEventEnd) / ticksPerBar())
  );

  loopPart = new Tone.Part<LoopEvent>(
    (time, ev) => {
      const dur = Math.max(0.05, Tone.Ticks(ev.durationTicks).toSeconds());
      instrument().triggerAttackRelease(ev.note, dur, time, ev.velocity);
    },
    events.map((ev) => ({
      time: `${ev.ticks}i`,
      note: ev.note,
      durationTicks: ev.durationTicks,
      velocity: ev.velocity,
    }))
  );
  loopPart.loop = true;
  loopPart.loopStart = 0;
  loopPart.loopEnd = `${loopBars}m`;
  // SPEC-NOTE: the spec suggests Transport.loopEnd; looping the Part instead
  // is equivalent (same transport clock) but lets the one-bar beat sequence
  // run continuously without being restarted by a transport loop seam.
  // "@1m" starts the looped phrase on the next bar boundary so it stays
  // bar-aligned with the beat.
  loopPart.start("@1m");
  return true;
}

export function setLoopPlaying(on: boolean) {
  if (!loopPart) return;
  // Mute rather than stop/start so the phrase never loses its bar alignment.
  // The transport intentionally keeps running once started: stopping it
  // would reset its clock and orphan the Part's absolute start time.
  loopPart.mute = !on;
  if (on) ensureTransportRunning();
}

export function clearRecording() {
  recording = false;
  heldForRecording.clear();
  events = [];
  if (loopPart) {
    loopPart.dispose();
    loopPart = null;
  }
  loopBars = 0;
}

export function hasRecording(): boolean {
  return loopPart !== null;
}

export function getLoopBars(): number {
  return loopBars;
}

export function isSamplerReady(): boolean {
  return samplerReady;
}
