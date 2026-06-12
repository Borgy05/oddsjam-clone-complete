import { motion, useReducedMotion } from "framer-motion";
import type { PointerEvent } from "react";

// SPEC-NOTE: velocity is fixed for v1 (pointer "pressure" is unreliable
// across devices); the engine API already takes a velocity per note so
// pressure mapping can be added later without changing the data model.

interface KeyHandlers {
  onNoteOn: (note: string) => void;
  onNoteOff: (note: string) => void;
}

const pressSpring = { type: "spring", stiffness: 700, damping: 22 } as const;

function usePointerHandlers(note: string, { onNoteOn, onNoteOff }: KeyHandlers) {
  return {
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      // Release implicit capture so a finger sliding across the keyboard
      // (glissando) triggers enter/leave on neighbouring keys.
      e.currentTarget.releasePointerCapture?.(e.pointerId);
      onNoteOn(note);
    },
    onPointerEnter: (e: PointerEvent<HTMLDivElement>) => {
      if (e.buttons > 0) onNoteOn(note);
    },
    onPointerUp: () => onNoteOff(note),
    onPointerLeave: () => onNoteOff(note),
    onPointerCancel: () => onNoteOff(note),
  };
}

interface WhiteKeyProps extends KeyHandlers {
  note: string;
  octave: number;
  pressed: boolean;
  isFirst: boolean;
}

const CHIP_COLORS: Record<number, { bg: string; text: string }> = {
  4: { bg: "#a9f0c1", text: "#1a4a2a" },
  5: { bg: "#9ee3ec", text: "#0d4650" },
};

export function WhiteKey({ note, octave, pressed, isFirst, onNoteOn, onNoteOff }: WhiteKeyProps) {
  const reduced = useReducedMotion();
  const handlers = usePointerHandlers(note, { onNoteOn, onNoteOff });
  const chip = CHIP_COLORS[octave] ?? CHIP_COLORS[4];
  return (
    <motion.div
      {...handlers}
      animate={{ y: pressed ? 3 : 0 }}
      transition={reduced ? { duration: 0 } : pressSpring}
      className="relative h-full flex-1 rounded-b-[7px]"
      style={{
        background: pressed
          ? "linear-gradient(180deg, #e9e9ee 0%, #dddde4 60%, #c9c9d2 100%)"
          : "linear-gradient(180deg, #ffffff 0%, #f4f4f6 60%, #dcdce2 100%)",
        borderLeft: isFirst ? "none" : "1px solid #c8c8d0",
        boxShadow: "inset 0 -7px 9px -5px rgba(0,0,0,0.28)",
      }}
    >
      <span
        className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none"
        style={{ background: chip.bg, color: chip.text }}
      >
        {note}
      </span>
    </motion.div>
  );
}

interface BlackKeyProps extends KeyHandlers {
  note: string;
  pressed: boolean;
  /** Left edge and width as percentages of the keyboard width. */
  leftPct: number;
  widthPct: number;
}

export function BlackKey({ note, pressed, leftPct, widthPct, onNoteOn, onNoteOff }: BlackKeyProps) {
  const reduced = useReducedMotion();
  const handlers = usePointerHandlers(note, { onNoteOn, onNoteOff });
  return (
    <motion.div
      {...handlers}
      animate={{ y: pressed ? 1 : 0 }}
      transition={reduced ? { duration: 0 } : pressSpring}
      className="absolute top-0 z-10 rounded-b-[5px]"
      style={{
        left: `${leftPct}%`,
        width: `${widthPct}%`,
        height: "62%",
        background: pressed
          ? "linear-gradient(180deg, #2e2e34 0%, #101014 40%, #020203 100%)"
          : "linear-gradient(180deg, #4a4a52 0%, #1a1a1f 40%, #050507 100%)",
        boxShadow:
          "0 4px 7px rgba(0,0,0,0.65), inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -2px 3px rgba(0,0,0,0.6)",
      }}
    />
  );
}
