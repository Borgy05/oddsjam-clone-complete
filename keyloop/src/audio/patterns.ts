// Built-in drum patterns. Each array lists the 16th-note steps (0–15 within
// one 4/4 bar) on which that voice fires.
export interface DrumPattern {
  name: string;
  kick: number[];
  snare: number[];
  hat: number[];
}

export const PATTERNS: DrumPattern[] = [
  {
    name: "Basic",
    kick: [0, 8],
    snare: [4, 12],
    hat: [0, 2, 4, 6, 8, 10, 12, 14],
  },
  {
    name: "Hip-hop",
    kick: [0, 3, 10],
    snare: [4, 12],
    hat: [0, 2, 4, 6, 7, 8, 10, 12, 14, 15],
  },
  {
    name: "Four-on-floor",
    kick: [0, 4, 8, 12],
    snare: [4, 12],
    hat: [2, 6, 10, 14],
  },
];
