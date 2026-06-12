# KeyLoop

A landscape piano that records what you play and loops it back over an
adjustable background beat. Web app built with React + TypeScript + Vite,
packaged for Android/iOS with Capacitor.

## Stack

- **React + TypeScript + Vite** — app framework and build
- **Tailwind CSS** — styling
- **Framer Motion** — press/transition animation (respects reduced motion)
- **Tone.js** — piano sampler, drum synthesis, and all timing. One Transport
  is the single sample-accurate clock for the beat, the metronome and the
  recorded loop; note events are stored in transport *ticks*, so changing the
  BPM retimes everything together and nothing drifts.
- **lucide-react** — icons
- **Capacitor** — native Android/iOS packaging

Piano sound: Salamander Grand Piano samples (CC-BY 3.0, Alexander Holm),
bundled in `public/samples/` and mapped every minor third across the range;
Tone.js pitch-shifts between mapped notes (equal temperament, A4 = 440 Hz).
A `PolySynth` fallback plays until the sample buffers finish loading.

## Using the app

- **Top bar:** back (placeholder) · metronome toggle · **record** (red dot) ·
  loop play/stop · clear · — · sustain toggle · FX/instrument/settings
  (visual placeholders).
- **Beat strip:** beat play/stop · pattern (Basic / Hip-hop / Four-on-floor) ·
  BPM 60–180 (slider or ±) · beat volume.
- **Record:** tap the red dot, play, tap again. The phrase is rounded up to
  whole bars, starts looping on the next bar boundary, and stays locked to
  the beat — including through live BPM changes.
- Keyboard range is C4–E5 (`src/lib/notes.ts` — change `RANGE_START`/`RANGE_END`
  to extend). On desktop you can also play with the computer keyboard
  (`a w s e d f t g y h u j k o l p ;`).

## Development

```bash
cd keyloop
npm install
npm run dev          # dev server at http://localhost:5173
```

## Building for devices

```bash
npm run build        # type-check + web bundle into dist/
npx cap sync         # copy bundle + plugins into android/ and ios/
npx cap open android # open in Android Studio, then Run on device/emulator
npx cap open ios     # open in Xcode (macOS), then Run on device/simulator
```

(`npm run sync` does build + sync in one step.)

Both native projects are landscape-locked (`sensorLandscape` on Android,
landscape-only `UISupportedInterfaceOrientations` on iOS). Audio starts on
the first touch — required by mobile webview autoplay policies — and resumes
automatically if the OS suspends the audio context.

For store submission steps (accounts, signing, icons), see [RELEASE.md](./RELEASE.md).

## Project structure

```
src/
  audio/
    audioEngine.ts   # ALL Tone.js logic: sampler/synth, drums, metronome,
                     # tick-based record/loop scheduling
    patterns.ts      # built-in 16-step drum patterns
  components/
    TopBar.tsx       # toolbar incl. TransportControls
    TransportControls.tsx  # record / loop play / clear
    Navigator.tsx    # mini-keyboard range strip (visual-only in v1)
    BeatControls.tsx # beat play/stop, pattern, BPM, volume
    Piano.tsx, Key.tsx
    RotatePrompt.tsx # portrait overlay
  lib/notes.ts       # key range + layout generation
```

V1 is fully offline: no network calls, no backend, no persistence (the loop
lives in memory). Out of scope, by design: multi-track layering, saving
recordings, audio export, other instruments, full keyboard range.
