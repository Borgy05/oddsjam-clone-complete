import { Minus, Play, Plus, Square, Volume2 } from "lucide-react";
import { PATTERNS } from "../audio/patterns";

interface BeatControlsProps {
  beatPlaying: boolean;
  bpm: number;
  patternIndex: number;
  volume: number;
  onToggleBeat: () => void;
  onBpmChange: (bpm: number) => void;
  onPatternChange: (index: number) => void;
  onVolumeChange: (v: number) => void;
}

const BPM_MIN = 60;
const BPM_MAX = 180;

export function BeatControls({
  beatPlaying,
  bpm,
  patternIndex,
  volume,
  onToggleBeat,
  onBpmChange,
  onPatternChange,
  onVolumeChange,
}: BeatControlsProps) {
  const clampBpm = (v: number) => Math.min(BPM_MAX, Math.max(BPM_MIN, v));
  return (
    <div
      className="flex h-[48px] shrink-0 items-center gap-3 overflow-x-auto px-3 text-icon"
      style={{ background: "#141417" }}
    >
      <button
        aria-label={beatPlaying ? "Stop beat" : "Play beat"}
        onClick={onToggleBeat}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          beatPlaying ? "bg-[#4da3ff] text-black" : "bg-white/10"
        }`}
      >
        {beatPlaying ? <Square size={14} /> : <Play size={15} />}
      </button>

      <div className="flex shrink-0 items-center gap-1">
        {PATTERNS.map((p, i) => (
          <button
            key={p.name}
            onClick={() => onPatternChange(i)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              i === patternIndex ? "bg-white/20 text-white" : "bg-white/5 text-icon/80"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <button
          aria-label="Decrease tempo"
          onClick={() => onBpmChange(clampBpm(bpm - 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10"
        >
          <Minus size={13} />
        </button>
        <input
          type="range"
          min={BPM_MIN}
          max={BPM_MAX}
          value={bpm}
          onChange={(e) => onBpmChange(Number(e.target.value))}
          className="w-28 accent-[#4da3ff]"
          aria-label="Tempo"
        />
        <button
          aria-label="Increase tempo"
          onClick={() => onBpmChange(clampBpm(bpm + 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10"
        >
          <Plus size={13} />
        </button>
        <span className="w-16 text-xs font-semibold tabular-nums text-white/90">
          {bpm} BPM
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <Volume2 size={15} className="text-icon/70" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-20 accent-[#4da3ff]"
          aria-label="Beat volume"
        />
      </div>
    </div>
  );
}
