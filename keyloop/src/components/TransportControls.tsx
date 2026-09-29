import { motion, useReducedMotion } from "framer-motion";
import { Play, Square, Trash2 } from "lucide-react";

interface TransportControlsProps {
  isRecording: boolean;
  hasLoop: boolean;
  loopPlaying: boolean;
  loopBars: number;
  onToggleRecord: () => void;
  onToggleLoopPlay: () => void;
  onClear: () => void;
}

export function TransportControls({
  isRecording,
  hasLoop,
  loopPlaying,
  loopBars,
  onToggleRecord,
  onToggleLoopPlay,
  onClear,
}: TransportControlsProps) {
  const reduced = useReducedMotion();
  return (
    <div className="flex items-center gap-3">
      <button
        aria-label={isRecording ? "Stop recording" : "Record"}
        onClick={onToggleRecord}
        className="relative flex h-8 w-8 items-center justify-center"
      >
        <motion.span
          className="block h-4 w-4 rounded-full"
          style={{ background: "#ff3b30" }}
          animate={
            isRecording && !reduced
              ? {
                  scale: [1, 1.25, 1],
                  boxShadow: [
                    "0 0 0px rgba(255,59,48,0.0)",
                    "0 0 14px rgba(255,59,48,0.9)",
                    "0 0 0px rgba(255,59,48,0.0)",
                  ],
                }
              : { scale: 1, boxShadow: "0 0 0px rgba(255,59,48,0)" }
          }
          transition={
            isRecording && !reduced
              ? { repeat: Infinity, duration: 1.1, ease: "easeInOut" }
              : { duration: 0.15 }
          }
        />
        {isRecording && (
          <span className="absolute inset-0 rounded-full border border-[#ff3b30]/60" />
        )}
      </button>

      <button
        aria-label={loopPlaying ? "Stop loop" : "Play loop"}
        onClick={onToggleLoopPlay}
        disabled={!hasLoop}
        className="flex h-8 w-8 items-center justify-center text-icon disabled:opacity-30"
      >
        {loopPlaying ? <Square size={16} /> : <Play size={17} />}
      </button>

      <button
        aria-label="Clear recording"
        onClick={onClear}
        disabled={!hasLoop && !isRecording}
        className="flex h-8 w-8 items-center justify-center text-icon disabled:opacity-30"
      >
        <Trash2 size={16} />
      </button>

      {hasLoop && (
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-icon">
          LOOP · {loopBars} bar{loopBars === 1 ? "" : "s"}
        </span>
      )}
    </div>
  );
}
