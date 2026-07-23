import { useRef } from "react";
import {
  FastForward,
  Flag,
  Pause,
  Play,
  Repeat,
  Rewind,
  RotateCcw,
  X,
} from "lucide-react";
import type { TeacherMode, TeacherState } from "../audio/teacherEngine";
import { SONGS } from "../audio/songs";

interface TeacherBarProps {
  state: TeacherState;
  onSelectSong: (id: string) => void;
  onSetMode: (mode: TeacherMode) => void;
  onTempo: (scale: number) => void;
  onTogglePlay: () => void;
  onRestart: () => void;
  onSkip: (dir: 1 | -1) => void;
  onSeek: (fraction: number) => void;
  onMarkA: () => void;
  onMarkB: () => void;
  onClearLoop: () => void;
  onExit: () => void;
}

export function TeacherBar({
  state,
  onSelectSong,
  onSetMode,
  onTempo,
  onTogglePlay,
  onRestart,
  onSkip,
  onSeek,
  onMarkA,
  onMarkB,
  onClearLoop,
  onExit,
}: TeacherBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const playing = state.status === "running" || state.status === "countin";

  const seekFromEvent = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    onSeek((clientX - rect.left) / rect.width);
  };

  return (
    <>
      {/* Row A — song, scrub bar (the "time bar along the top"), mode */}
      <div
        className="flex h-[56px] shrink-0 items-center gap-3 px-3 text-icon"
        style={{ background: "#121215" }}
      >
        <select
          value={state.songId}
          onChange={(e) => onSelectSong(e.target.value)}
          className="shrink-0 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white outline-none"
          aria-label="Choose a song"
        >
          {SONGS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        <div className="relative flex-1">
          <div
            ref={trackRef}
            className="relative h-2.5 w-full cursor-pointer rounded-full bg-white/10"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              seekFromEvent(e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.buttons > 0) seekFromEvent(e.clientX);
            }}
            role="slider"
            aria-label="Song position"
            aria-valuenow={Math.round(state.progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* A–B loop region */}
            {state.loopA !== null && state.loopB !== null && (
              <div
                className="absolute inset-y-0 rounded-full bg-[#4da3ff]/25"
                style={{
                  left: `${state.loopA * 100}%`,
                  width: `${(state.loopB - state.loopA) * 100}%`,
                }}
              />
            )}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#4da3ff]"
              style={{ width: `${state.progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
              style={{ left: `${state.progress * 100}%` }}
            />
          </div>
        </div>

        {state.status === "countin" && (
          <span className="w-6 shrink-0 text-center text-lg font-bold text-[#4da3ff]">
            {state.countBeat}
          </span>
        )}
        {state.status === "finished" && (
          <span className="shrink-0 text-xs font-semibold text-[#a9f0c1]">Done! 🎉</span>
        )}

        {/* Learn / Play toggle */}
        <div className="flex shrink-0 overflow-hidden rounded-full bg-white/5 text-[11px] font-medium">
          {(["learn", "play"] as TeacherMode[]).map((m) => (
            <button
              key={m}
              onClick={() => onSetMode(m)}
              className={`px-3 py-1 capitalize ${
                state.mode === m ? "bg-[#4da3ff] text-black" : "text-icon/80"
              }`}
            >
              {m === "learn" ? "Learn" : "Play along"}
            </button>
          ))}
        </div>

        <button
          aria-label="Exit teacher"
          onClick={onExit}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10"
        >
          <X size={15} />
        </button>
      </div>

      {/* Row B — transport, tempo, loop */}
      <div
        className="flex h-[48px] shrink-0 items-center gap-3 overflow-x-auto px-3 text-icon"
        style={{ background: "#141417" }}
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            aria-label="Rewind"
            onClick={() => onSkip(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
          >
            <Rewind size={15} />
          </button>
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={onTogglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4da3ff] text-black"
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
          <button
            aria-label="Fast forward"
            onClick={() => onSkip(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
          >
            <FastForward size={15} />
          </button>
          <button
            aria-label="Restart"
            onClick={onRestart}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {state.mode === "learn" && (
          <span className="shrink-0 text-[11px] text-icon/60">
            {state.status === "finished"
              ? "Great job!"
              : "Press the glowing key"}
          </span>
        )}

        {/* Tempo */}
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-[11px] text-icon/70">Speed</span>
          <input
            type="range"
            min={25}
            max={150}
            step={5}
            value={Math.round(state.tempoScale * 100)}
            onChange={(e) => onTempo(Number(e.target.value) / 100)}
            className="w-24 accent-[#4da3ff]"
            aria-label="Speed"
          />
          <span className="w-10 text-xs font-semibold tabular-nums text-white/90">
            {Math.round(state.tempoScale * 100)}%
          </span>
        </div>

        {/* A–B loop */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            aria-label="Set loop start"
            onClick={onMarkA}
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
              state.loopA !== null ? "bg-[#4da3ff]/30 text-white" : "bg-white/5 text-icon/80"
            }`}
          >
            <Flag size={12} /> A
          </button>
          <button
            aria-label="Set loop end"
            onClick={onMarkB}
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
              state.loopB !== null ? "bg-[#4da3ff]/30 text-white" : "bg-white/5 text-icon/80"
            }`}
          >
            <Flag size={12} /> B
          </button>
          <button
            aria-label="Clear loop"
            onClick={onClearLoop}
            disabled={state.loopA === null && state.loopB === null}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 disabled:opacity-30"
          >
            <Repeat size={13} />
          </button>
        </div>
      </div>
    </>
  );
}
