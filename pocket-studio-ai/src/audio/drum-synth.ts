// Placeholder drum sounds generated in code, so Phase 0 needs no sample files
// (and no licences). Real sampled kits replace these in Phase 2.

export type DrumVoice = 'kick' | 'snare' | 'hat';

// Small seeded random generator so the noise sounds identical every launch.
function noiseSource(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return (state / 0xffffffff) * 2 - 1;
  };
}

function kick(sampleRate: number): Float32Array<ArrayBuffer> {
  const length = Math.floor(sampleRate * 0.5);
  const out = new Float32Array(length);
  let phase = 0;
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    // Pitch drops fast from 150 Hz to 45 Hz: the "thump".
    const freq = 45 + 105 * Math.exp(-t * 30);
    phase += (2 * Math.PI * freq) / sampleRate;
    const body = Math.sin(phase) * Math.exp(-t * 7);
    const click = t < 0.004 ? (1 - t / 0.004) * 0.3 : 0;
    out[i] = (body + click) * 0.95;
  }
  return out;
}

function snare(sampleRate: number): Float32Array<ArrayBuffer> {
  const length = Math.floor(sampleRate * 0.25);
  const out = new Float32Array(length);
  const rand = noiseSource(7);
  let prev = 0;
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const white = rand();
    const bright = white - prev; // simple high-pass: keeps the snappy top end
    prev = white;
    const noise = bright * 0.5 * Math.exp(-t * 22);
    const tone = Math.sin(2 * Math.PI * 185 * t) * 0.45 * Math.exp(-t * 35);
    out[i] = (noise + tone) * 0.8;
  }
  return out;
}

function hat(sampleRate: number): Float32Array<ArrayBuffer> {
  const length = Math.floor(sampleRate * 0.08);
  const out = new Float32Array(length);
  const rand = noiseSource(42);
  let prev = 0;
  let prev2 = 0;
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const white = rand();
    // Second-order difference: an even steeper high-pass for a thin, metallic tick.
    const bright = white - 2 * prev + prev2;
    prev2 = prev;
    prev = white;
    out[i] = bright * 0.22 * Math.exp(-t * 60);
  }
  return out;
}

export function renderDrum(voice: DrumVoice, sampleRate: number): Float32Array<ArrayBuffer> {
  switch (voice) {
    case 'kick':
      return kick(sampleRate);
    case 'snare':
      return snare(sampleRate);
    case 'hat':
      return hat(sampleRate);
  }
}
