@AGENTS.md

# Pocket Studio AI

Read `README.md` (product principles) and `PROGRESS.md` (phase status, decisions, next step) before starting work. Update `PROGRESS.md` at the end of every session.

Paul is new to development: give exact commands, say which folder to run them in, and explain errors in plain English. Work one phase at a time and stop at the end of each phase for Paul's go-ahead.

## Testing on Paul's phone (USB)

When this runs on Paul's laptop with his Android phone plugged in, Claude drives the phone tests directly:

1. Check the phone is connected: `adb devices` should list one device as `device`. If it says `unauthorized`, ask Paul to accept the "Allow USB debugging" prompt on the phone. If nothing is listed, walk him through enabling Developer options and USB debugging.
2. Install and run:
   - If Android Studio / the Android SDK is installed: `npx expo run:android --device` builds locally and installs over USB (fastest).
   - Otherwise: build with `npm run build:dev` (EAS cloud), install with `adb install <downloaded.apk>`, then `npx expo start`.
3. Read errors and audio issues from the phone's log while Paul uses the app:
   `adb logcat -v time *:E ReactNativeJS:V AudioAPI:V AudioAPIModule:V miniaudio:V`
4. Screenshots to check layout: `adb exec-out screencap -p > screenshot.png` (don't commit them).
5. Before handing a phase to Paul, also run `npm test`, `npm run typecheck` and `npm run lint`.

Timing and sound quality still need Paul's ears. Claude checks installs, crashes, logs and layout; Paul ticks the listening tests in `PROGRESS.md`.
