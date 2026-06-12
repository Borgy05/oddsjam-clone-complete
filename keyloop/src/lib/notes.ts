// Keyboard range for v1. Extend by changing these two constants —
// the key layout is generated from them.
export const RANGE_START = "C4";
export const RANGE_END = "E5";

const NOTE_ORDER = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export interface WhiteKeyDef {
  note: string;
  octave: number;
}

export interface BlackKeyDef {
  note: string;
  octave: number;
  /** Index of the white key whose right boundary this black key sits on. */
  afterWhiteIndex: number;
}

function parse(note: string): { pc: string; octave: number } {
  const m = /^([A-G]#?)(\d)$/.exec(note);
  if (!m) throw new Error(`Bad note name: ${note}`);
  return { pc: m[1], octave: Number(m[2]) };
}

function toMidi(note: string): number {
  const { pc, octave } = parse(note);
  return (octave + 1) * 12 + NOTE_ORDER.indexOf(pc as (typeof NOTE_ORDER)[number]);
}

function fromMidi(midi: number): { pc: string; octave: number } {
  return { pc: NOTE_ORDER[midi % 12], octave: Math.floor(midi / 12) - 1 };
}

export function buildKeys(start = RANGE_START, end = RANGE_END) {
  const whites: WhiteKeyDef[] = [];
  const blacks: BlackKeyDef[] = [];
  for (let m = toMidi(start); m <= toMidi(end); m++) {
    const { pc, octave } = fromMidi(m);
    if (pc.includes("#")) {
      blacks.push({
        note: `${pc}${octave}`,
        octave,
        afterWhiteIndex: whites.length - 1,
      });
    } else {
      whites.push({ note: `${pc}${octave}`, octave });
    }
  }
  return { whites, blacks };
}

export const KEYS = buildKeys();

// SPEC-NOTE: dev convenience only — lets the piano be played from a computer
// keyboard while testing in a browser. Touch is the primary input.
export const COMPUTER_KEY_MAP: Record<string, string> = {
  a: "C4",
  w: "C#4",
  s: "D4",
  e: "D#4",
  d: "E4",
  f: "F4",
  t: "F#4",
  g: "G4",
  y: "G#4",
  h: "A4",
  u: "A#4",
  j: "B4",
  k: "C5",
  o: "C#5",
  l: "D5",
  p: "D#5",
  ";": "E5",
};
