# Pocket Studio AI

An Android app where the user describes a beat by voice or text, an AI builds it as editable tracks, mixes it, and explains every production move.

Kept in this folder for now. It is separate from the OddsJam clone in the rest of this repository and will move to its own repository (`pocket-studio-ai`).

## Core principle: the user is the artist, the app is their producer

The app should feel like a well-paid, experienced producer the artist has hired.

- **Serve the artist's vision.** The AI is confident and experienced, but it suggests and explains; it never overrules. Example: "I pushed the sub up because you said heavy. Tell me if you want it cleaner."
- **The artist has the final say.** Every AI change is a proposal the artist can accept, tweak or undo (one undo step per AI change).
- **The Producer Log talks like a producer** walking an artist through their choices, not like a textbook.
- **Learning is a side effect.** Because the producer explains its choices, the artist picks up the craft over time.
- **Complexity grows with the user.** The MVP has two levels ("Just make it" and "Producer mode"). Later versions will adjust complexity to the user's experience.

This shapes the AI's system prompt and all in-app wording. Working tagline: *"Suno makes the song for you. We give you a producer."* Open to change.

## Status

Phase 0 (setup and timing test) is built and waiting for a phone test. See [PROGRESS.md](PROGRESS.md) for status, decisions and the exact steps to install it on your phone.

## Proposed decisions (awaiting Paul's confirmation)

From the review of the technical brief:

- Move the project to its own repository (for now it is built in this folder and moved later, as Paul chose).
- Build the phone app with EAS cloud builds rather than local Android Studio builds (set up in Phase 0).
- Use Supabase Edge Functions for the backend proxy.
- Use live scheduling for all playback; use offline rendering only for WAV export.
- Move Channel view scenes and the sampler to "MVP+" unless early testers ask for them.
- The audio library (react-native-audio-api 0.13.x) has no compressor node, so compression and the limiter will be custom-built. Pin its exact version.

## Open questions

- Which Android phone model Paul tests on
- Monthly AI cost ceiling for testing
