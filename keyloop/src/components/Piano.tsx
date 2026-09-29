import { KEYS } from "../lib/notes";
import { BlackKey, WhiteKey } from "./Key";

interface PianoProps {
  pressed: Set<string>;
  hintNote?: string | null;
  onNoteOn: (note: string) => void;
  onNoteOff: (note: string) => void;
}

export function Piano({ pressed, hintNote, onNoteOn, onNoteOff }: PianoProps) {
  const { whites, blacks } = KEYS;
  const whiteWidthPct = 100 / whites.length;
  // SPEC-NOTE: the spec's "9% width" for black keys would make them nearly
  // as wide as a white key at this 10-white-key range; 58% of a white key
  // matches real piano proportions, which is what the reference look needs.
  const blackWidthPct = whiteWidthPct * 0.58;

  return (
    <div className="piano-surface relative w-full" style={{ height: "100%" }}>
      <div className="flex h-full w-full">
        {whites.map((k, i) => (
          <WhiteKey
            key={k.note}
            note={k.note}
            octave={k.octave}
            isFirst={i === 0}
            pressed={pressed.has(k.note)}
            hint={hintNote === k.note}
            onNoteOn={onNoteOn}
            onNoteOff={onNoteOff}
          />
        ))}
      </div>
      {blacks.map((k) => (
        <BlackKey
          key={k.note}
          note={k.note}
          pressed={pressed.has(k.note)}
          hint={hintNote === k.note}
          leftPct={(k.afterWhiteIndex + 1) * whiteWidthPct - blackWidthPct / 2}
          widthPct={blackWidthPct}
          onNoteOn={onNoteOn}
          onNoteOff={onNoteOff}
        />
      ))}
    </div>
  );
}
