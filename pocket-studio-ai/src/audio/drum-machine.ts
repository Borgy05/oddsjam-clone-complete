import { AudioBuffer, AudioContext, GainNode } from 'react-native-audio-api';

import { DrumVoice, renderDrum } from './drum-synth';
import { StepScheduler } from './scheduler';

export const VOICES: DrumVoice[] = ['kick', 'snare', 'hat'];
export const STEPS = 16;

export type Pattern = Record<DrumVoice, boolean[]>;

const TIMER_INTERVAL_MS = 25;
const VOICE_GAIN: Record<DrumVoice, number> = { kick: 1, snare: 0.8, hat: 0.55 };

/**
 * Phase 0 drum machine: plays a 16-step pattern using lookahead scheduling on
 * the audio clock. The pattern can change while playing; edits are heard on
 * the next pass of that step.
 */
export class DrumMachine {
  private ctx: AudioContext | null = null;
  private buffers: Partial<Record<DrumVoice, AudioBuffer>> = {};
  // A fresh bus per play, so Stop can silence notes that were already booked.
  private bus: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private scheduler: StepScheduler | null = null;
  private pattern: Pattern;
  private bpm: number;
  // Booked steps and their audio times, used to draw the playhead in sync with what is heard.
  private booked: { step: number; time: number }[] = [];

  constructor(pattern: Pattern, bpm: number) {
    this.pattern = pattern;
    this.bpm = bpm;
  }

  setPattern(pattern: Pattern): void {
    this.pattern = pattern;
  }

  setBpm(bpm: number): void {
    this.bpm = bpm;
    this.scheduler?.setBpm(bpm);
  }

  get isPlaying(): boolean {
    return this.scheduler?.isRunning ?? false;
  }

  async start(): Promise<void> {
    if (this.isPlaying) return;
    const ctx = this.ensureContext();
    await ctx.resume();

    const bus = ctx.createGain();
    bus.connect(ctx.destination);
    this.bus = bus;
    this.booked = [];

    this.scheduler = new StepScheduler(
      () => ctx.currentTime,
      (step, time) => this.playStep(step, time),
      { bpm: this.bpm },
    );
    // Small offset so the first step is booked before it is due.
    this.scheduler.start(ctx.currentTime + 0.05);
    this.timer = setInterval(() => this.scheduler?.tick(), TIMER_INTERVAL_MS);
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.scheduler?.stop();
    this.scheduler = null;
    this.booked = [];
    if (this.bus && this.ctx) {
      this.bus.gain.setValueAtTime(0, this.ctx.currentTime);
      this.bus.disconnect();
    }
    this.bus = null;
  }

  /** The step that is audible right now, or -1 when stopped. */
  currentStep(): number {
    if (!this.ctx || !this.isPlaying) return -1;
    const now = this.ctx.currentTime;
    while (this.booked.length > 1 && this.booked[1].time <= now) {
      this.booked.shift();
    }
    const head = this.booked[0];
    return head && head.time <= now ? head.step : -1;
  }

  async dispose(): Promise<void> {
    this.stop();
    await this.ctx?.close();
    this.ctx = null;
    this.buffers = {};
  }

  private ensureContext(): AudioContext {
    if (this.ctx) return this.ctx;
    const ctx = new AudioContext();
    for (const voice of VOICES) {
      const data = renderDrum(voice, ctx.sampleRate);
      const buffer = ctx.createBuffer(1, data.length, ctx.sampleRate);
      buffer.copyToChannel(data, 0);
      this.buffers[voice] = buffer;
    }
    this.ctx = ctx;
    return ctx;
  }

  private playStep(step: number, time: number): void {
    const ctx = this.ctx;
    const bus = this.bus;
    if (!ctx || !bus) return;
    this.booked.push({ step, time });

    for (const voice of VOICES) {
      if (!this.pattern[voice][step]) continue;
      const buffer = this.buffers[voice];
      if (!buffer) continue;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      // Softer off-beat hats give the loop a little bounce.
      const accent = voice === 'hat' && step % 4 !== 0 ? 0.7 : 1;
      gain.gain.value = VOICE_GAIN[voice] * accent;
      source.connect(gain);
      gain.connect(bus);
      source.start(time);
    }
  }
}
