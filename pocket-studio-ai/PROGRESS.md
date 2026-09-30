# Progress

## Phase status

| Phase | Status |
| --- | --- |
| 0. Setup and timing test | Built, waiting for Paul's phone test |
| 1. Studio skeleton and playback | Not started |
| 2–7 | Not started |

## Phase 0: what was built

- Expo SDK 57 project (React Native 0.86, TypeScript, Expo Router), Android package `ai.pocketstudio.app`.
- `react-native-audio-api` 0.13.6, pinned to an exact version because the library is pre-1.0 and its API changes between releases.
- A 16-step drum grid (kick, snare, hats) at 130 BPM, playing through a lookahead scheduler on the audio clock (`src/audio/scheduler.ts`).
- Drum sounds generated in code (`src/audio/drum-synth.ts`), so there are no sample files and no licences to track yet. Real sampled kits come in Phase 2.
- A stress-test switch that deliberately keeps the phone's JavaScript busy, and a long list to scroll, for the timing tests.
- Automated tests for the scheduler: steady timing, recovery after a freeze, tempo changes, stop.

### Checks run before pushing

- `npm test`: 5/5 scheduler tests pass
- `npm run typecheck` and `npm run lint`: clean
- Android JavaScript bundle builds (`expo export --platform android`)
- Android native config generates correctly (`expo prebuild`), with the right package name and audio permission
- Screen renders and plays without errors in a phone-sized browser test

Not yet tested: a real phone. That is Paul's Phase 0 test.

## How to test Phase 0 on your phone

Do this on your laptop. The folder names below assume you clone into your home folder.

**One-time setup**

1. Install Node.js "LTS" from https://nodejs.org.
2. Create a free account at https://expo.dev.
3. Get the code (in a terminal, from your home folder):
   ```
   git clone https://github.com/Borgy05/oddsjam-clone-complete.git
   cd oddsjam-clone-complete
   git checkout claude/odds-jam-clone-setup-g9q1ci
   cd pocket-studio-ai
   npm install
   ```
4. Log in to Expo and link the project (in the `pocket-studio-ai` folder):
   ```
   npx eas-cli@latest login
   npx eas-cli@latest init
   ```
   `init` adds a project ID to `app.json`. That change should be committed.

**Build and install the app (about 10–20 minutes, done in the cloud)**

5. In the `pocket-studio-ai` folder:
   ```
   npm run build:dev
   ```
   Answer "yes" if it asks to create an Android keystore. When it finishes it shows a link and QR code.
6. Open that link on your phone and install the APK. Android will ask you to allow installs from your browser; allow it.

**Run it**

7. On the laptop, in the `pocket-studio-ai` folder:
   ```
   npx expo start
   ```
8. Make sure the phone and laptop are on the same Wi-Fi. Open **Pocket Studio AI** on the phone; it should find the laptop, or scan the QR code shown in the terminal.

You only repeat step 5 when native packages change. For normal code changes, steps 7–8 are enough.

**Phase 0 tests (all four must pass)**

- [ ] App installs and opens on your phone
- [ ] Loop plays kick, snare and hats in time
- [ ] Scrolling and tapping hard for 30 seconds causes no audible drift or stutter (try it with the stress test on too)
- [ ] Changing BPM while playing stays in time

Note: the development build runs slower than the final app, so if timing holds here, it will hold in the release.

## Decisions made

- **Folder structure:** routes in `src/app/`, audio code in `src/audio/`, colours in `src/theme.ts`.
- **Builds:** EAS cloud builds (`eas.json` has `development` and `preview` profiles, both producing APKs).
- **Tests:** Node's built-in test runner for pure logic, so no extra test framework is needed yet.
- **Scheduler settings:** timer every 25 ms, books 120 ms ahead. If the phone freezes for longer than that, missed beats are skipped rather than played late in a burst, and the groove carries on in time.
- **Tempo changes** apply from the next beat that hasn't been booked yet (at most 120 ms later), so the groove never jumps.
- **Stop** silences notes that were already booked, so nothing plays after you press stop.
- **Playback stops** when the app goes to the background.

## Known issues

- Expo's online checks (`expo-doctor` schema and directory checks, `expo install` version lookup) could not run in the cloud session because its network blocks Expo's servers. Run `npx expo-doctor` on the laptop once.
- `npx expo install` could not reach Expo's servers here, so packages were installed with `npm` at the versions Expo SDK 57 lists. `expo-doctor` on the laptop will confirm them.
- Web preview is not a target. It only works with `"output": "single"` in `app.json`.

## Next step

Paul runs the Phase 0 tests on his phone. If all four pass, start Phase 1 (studio skeleton and playback).
