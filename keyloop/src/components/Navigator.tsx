import { ChevronLeft, ChevronRight } from "lucide-react";

// SPEC-NOTE: visual-only for v1 per the spec — shows where the playable
// C4–E5 window sits on a wider C3–B5 keyboard. The ‹ › buttons are inert
// until range scrolling ships.

const MINI_OCTAVES = 3; // C3..B5
const MINI_WHITES = MINI_OCTAVES * 7;
// Window covers C4..E5 = white keys 7..16 (10 keys) of the 21 shown.
const WINDOW_START_PCT = (7 / MINI_WHITES) * 100;
const WINDOW_WIDTH_PCT = (10 / MINI_WHITES) * 100;

// Black key slots within one octave, after white keys 0,1,3,4,5.
const BLACK_SLOTS = [0, 1, 3, 4, 5];

export function Navigator() {
  const whiteW = 100 / MINI_WHITES;
  return (
    <div
      className="flex h-[56px] shrink-0 items-center gap-1 px-2"
      style={{ background: "#121215" }}
    >
      <button aria-label="Scroll keyboard left" className="p-1 text-icon/60">
        <ChevronLeft size={18} />
      </button>

      <div className="relative h-9 flex-1 overflow-hidden rounded-md bg-[#1a1a1e]">
        {/* mini white keys */}
        <div className="flex h-full w-full gap-px p-px">
          {Array.from({ length: MINI_WHITES }, (_, i) => (
            <div key={i} className="h-full flex-1 rounded-[2px] bg-[#e8e8ec]" />
          ))}
        </div>
        {/* mini black keys */}
        {Array.from({ length: MINI_OCTAVES }, (_, oct) =>
          BLACK_SLOTS.map((slot) => {
            const left = (oct * 7 + slot + 1) * whiteW - whiteW * 0.28;
            return (
              <div
                key={`${oct}-${slot}`}
                className="absolute top-px rounded-b-[2px] bg-[#222228]"
                style={{ left: `${left}%`, width: `${whiteW * 0.56}%`, height: "58%" }}
              />
            );
          })
        )}
        {/* visible-range window */}
        <div
          className="pointer-events-none absolute inset-y-0 rounded-md border-2 border-[#4da3ff] bg-[#4da3ff]/25"
          style={{ left: `${WINDOW_START_PCT}%`, width: `${WINDOW_WIDTH_PCT}%` }}
        />
      </div>

      <button aria-label="Scroll keyboard right" className="p-1 text-icon/60">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
