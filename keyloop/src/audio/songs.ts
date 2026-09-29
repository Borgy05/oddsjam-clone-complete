// Public-domain melodies, hand-encoded so the teacher works with zero API
// cost and zero copyright risk. Each note's duration is in BEATS (quarter=1,
// half=2, whole=4, eighth=0.5). `note: null` is a rest.
//
// SPEC-NOTE: this is the same {note, durationBeats} shape the LLM will later
// emit, so the whole play-along engine is proven before any API is wired in.
// All melodies are arranged to fit the C4–E5 key range.
export interface SongNote {
  note: string | null;
  beats: number;
}

export interface Song {
  id: string;
  title: string;
  bpm: number;
  notes: SongNote[];
}

const q = (note: string | null): SongNote => ({ note, beats: 1 });
const h = (note: string | null): SongNote => ({ note, beats: 2 });

export const SONGS: Song[] = [
  {
    id: "twinkle",
    title: "Twinkle, Twinkle",
    bpm: 100,
    notes: [
      q("C4"), q("C4"), q("G4"), q("G4"), q("A4"), q("A4"), h("G4"),
      q("F4"), q("F4"), q("E4"), q("E4"), q("D4"), q("D4"), h("C4"),
      q("G4"), q("G4"), q("F4"), q("F4"), q("E4"), q("E4"), h("D4"),
      q("G4"), q("G4"), q("F4"), q("F4"), q("E4"), q("E4"), h("D4"),
      q("C4"), q("C4"), q("G4"), q("G4"), q("A4"), q("A4"), h("G4"),
      q("F4"), q("F4"), q("E4"), q("E4"), q("D4"), q("D4"), h("C4"),
    ],
  },
  {
    id: "ode-to-joy",
    title: "Ode to Joy",
    bpm: 108,
    notes: [
      q("E4"), q("E4"), q("F4"), q("G4"), q("G4"), q("F4"), q("E4"), q("D4"),
      q("C4"), q("C4"), q("D4"), q("E4"), q("E4"), q("D4"), h("D4"),
      q("E4"), q("E4"), q("F4"), q("G4"), q("G4"), q("F4"), q("E4"), q("D4"),
      q("C4"), q("C4"), q("D4"), q("E4"), q("D4"), q("C4"), h("C4"),
    ],
  },
  {
    id: "mary",
    title: "Mary Had a Little Lamb",
    bpm: 100,
    notes: [
      q("E4"), q("D4"), q("C4"), q("D4"), q("E4"), q("E4"), h("E4"),
      q("D4"), q("D4"), h("D4"), q("E4"), q("G4"), h("G4"),
      q("E4"), q("D4"), q("C4"), q("D4"), q("E4"), q("E4"), q("E4"), q("E4"),
      q("D4"), q("D4"), q("E4"), q("D4"), { note: "C4", beats: 4 },
    ],
  },
  {
    id: "frere-jacques",
    title: "Frère Jacques",
    bpm: 96,
    notes: [
      q("C4"), q("D4"), q("E4"), q("C4"), q("C4"), q("D4"), q("E4"), q("C4"),
      q("E4"), q("F4"), h("G4"), q("E4"), q("F4"), h("G4"),
      { note: "G4", beats: 0.5 }, { note: "A4", beats: 0.5 }, { note: "G4", beats: 0.5 },
      { note: "F4", beats: 0.5 }, q("E4"), q("C4"),
      { note: "G4", beats: 0.5 }, { note: "A4", beats: 0.5 }, { note: "G4", beats: 0.5 },
      { note: "F4", beats: 0.5 }, q("E4"), q("C4"),
      // "Din, dan, don" — arranged C4→G4→C4 to stay within the C4–E5 range
      // (the traditional low G sits below the keyboard).
      q("C4"), q("G4"), h("C4"), q("C4"), q("G4"), h("C4"),
    ],
  },
];

export function getSong(id: string): Song {
  return SONGS.find((s) => s.id === id) ?? SONGS[0];
}
