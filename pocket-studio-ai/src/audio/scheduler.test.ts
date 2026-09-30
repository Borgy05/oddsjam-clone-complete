/// <reference types="node" />
// Run with: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { clampBpm, stepDuration, StepScheduler } from './scheduler.ts';

type Booked = { step: number; time: number };

function setup(bpm: number) {
  let now = 0;
  const booked: Booked[] = [];
  const scheduler = new StepScheduler(
    () => now,
    (step, time) => booked.push({ step, time }),
    { bpm },
  );
  const advanceTo = (t: number) => {
    now = t;
    scheduler.tick();
  };
  return { scheduler, booked, advanceTo };
}

const close = (a: number, b: number) => Math.abs(a - b) < 1e-9;

test('books every step exactly once, on the grid, despite irregular timer wake-ups', () => {
  const { scheduler, booked, advanceTo } = setup(130);
  scheduler.start(0.05);
  // Timer wakes every 10-60 ms at random, like a busy phone.
  let t = 0;
  let seed = 1;
  while (t < 10) {
    seed = (seed * 16807) % 2147483647;
    t += 0.01 + (seed / 2147483647) * 0.05;
    advanceTo(t);
  }
  const dur = stepDuration(130);
  booked.forEach((b, i) => {
    assert.equal(b.step, i % 16);
    assert.ok(close(b.time, 0.05 + i * dur), `step ${i} at ${b.time}`);
  });
  // Everything due by t=10 was booked (plus the lookahead).
  assert.ok(booked[booked.length - 1].time >= 10);
});

test('never books a step in the past by more than the late limit after a long stall', () => {
  const { scheduler, booked, advanceTo } = setup(130);
  scheduler.start(0);
  advanceTo(0.1);
  const before = booked.length;
  advanceTo(1.5); // JS thread frozen for 1.4 s
  const after = booked.slice(before);
  for (const b of after) assert.ok(b.time >= 1.5 - 0.05, `late step at ${b.time}`);
  // Still on the original grid, so the groove resumes in phase.
  const dur = stepDuration(130);
  for (const b of after) {
    const n = b.time / dur;
    assert.ok(close(n, Math.round(n)), 'off grid');
    assert.equal(b.step, Math.round(n) % 16);
  }
});

test('tempo change applies from the next unbooked step with no gap or overlap', () => {
  const { scheduler, booked, advanceTo } = setup(120);
  scheduler.start(0);
  for (let t = 0; t < 2; t += 0.025) advanceTo(t);
  const switchIndex = booked.length;
  scheduler.setBpm(140);
  for (let t = 2; t < 4; t += 0.025) advanceTo(t);

  const gaps = booked.slice(1).map((b, i) => b.time - booked[i].time);
  gaps.forEach((gap, i) => {
    const expected = i < switchIndex ? stepDuration(120) : stepDuration(140);
    assert.ok(close(gap, expected), `gap ${i} was ${gap}`);
  });
});

test('stop means no more steps are booked', () => {
  const { scheduler, booked, advanceTo } = setup(130);
  scheduler.start(0);
  advanceTo(0.5);
  scheduler.stop();
  const count = booked.length;
  advanceTo(2);
  assert.equal(booked.length, count);
});

test('bpm is clamped to 60-180 and rounded', () => {
  assert.equal(clampBpm(20), 60);
  assert.equal(clampBpm(300), 180);
  assert.equal(clampBpm(129.6), 130);
});
