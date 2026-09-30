// Lookahead step scheduler.
//
// JavaScript timers drift and stall (scrolling, garbage collection, busy
// renders), but the audio clock does not. So a timer wakes up often and books
// every step that falls inside a short window ahead of "now" onto the audio
// clock. As long as the timer wakes up at least once per window, playback stays
// sample-accurate even when the JS thread is busy.
//
// This file has no audio or React imports so it can be tested with a fake clock.

export type StepCallback = (step: number, time: number) => void;

export type SchedulerOptions = {
  bpm: number;
  stepsPerLoop?: number;      // 16 = one bar of 16th notes
  scheduleAheadSec?: number;  // how far ahead to book steps
  maxLateSec?: number;        // later than this, skip the step instead of playing it late
};

export const MIN_BPM = 60;
export const MAX_BPM = 180;

export function clampBpm(bpm: number): number {
  return Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(bpm)));
}

/** Length of one 16th note in seconds. */
export function stepDuration(bpm: number): number {
  return 60 / bpm / 4;
}

export class StepScheduler {
  private bpm: number;
  private readonly stepsPerLoop: number;
  private readonly scheduleAheadSec: number;
  private readonly maxLateSec: number;
  private nextStep = 0;
  private nextStepTime = 0;
  private running = false;
  private readonly now: () => number;
  private readonly onStep: StepCallback;

  constructor(now: () => number, onStep: StepCallback, options: SchedulerOptions) {
    this.now = now;
    this.onStep = onStep;
    this.bpm = clampBpm(options.bpm);
    this.stepsPerLoop = options.stepsPerLoop ?? 16;
    this.scheduleAheadSec = options.scheduleAheadSec ?? 0.12;
    this.maxLateSec = options.maxLateSec ?? 0.05;
  }

  get isRunning(): boolean {
    return this.running;
  }

  start(startTime: number): void {
    this.nextStep = 0;
    this.nextStepTime = startTime;
    this.running = true;
    this.tick();
  }

  stop(): void {
    this.running = false;
  }

  /**
   * Takes effect from the next unbooked step, so the groove never jumps.
   * Steps already booked (at most scheduleAheadSec ahead) keep the old tempo.
   */
  setBpm(bpm: number): void {
    this.bpm = clampBpm(bpm);
  }

  /** Call from a timer every ~25 ms. */
  tick(): void {
    if (!this.running) return;
    const now = this.now();

    // If the JS thread stalled for longer than the lookahead window, skip the
    // missed steps rather than firing them all at once as a late burst.
    while (this.nextStepTime < now - this.maxLateSec) {
      this.advance();
    }

    while (this.nextStepTime < now + this.scheduleAheadSec) {
      this.onStep(this.nextStep, this.nextStepTime);
      this.advance();
    }
  }

  private advance(): void {
    this.nextStepTime += stepDuration(this.bpm);
    this.nextStep = (this.nextStep + 1) % this.stepsPerLoop;
  }
}
