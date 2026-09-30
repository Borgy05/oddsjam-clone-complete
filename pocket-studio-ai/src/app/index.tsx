import { useEffect, useState } from 'react';
import { AppState, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DrumMachine, Pattern, STEPS, VOICES } from '@/audio/drum-machine';
import { DrumVoice } from '@/audio/drum-synth';
import { clampBpm } from '@/audio/scheduler';
import { colors, TOUCH_TARGET } from '@/theme';

// Phase 0: timing test. A 16-step drum grid at 130 BPM using lookahead
// scheduling, plus a stress switch and a long list to scroll, so we can prove
// the timing holds while the phone is busy.

const VOICE_LABEL: Record<DrumVoice, string> = { kick: 'Kick', snare: 'Snare', hat: 'Hats' };

function stepsFrom(on: number[]): boolean[] {
  return Array.from({ length: STEPS }, (_, i) => on.includes(i));
}

// A simple 2-step garage groove to start from.
const STARTER_PATTERN: Pattern = {
  kick: stepsFrom([0, 7, 10]),
  snare: stepsFrom([4, 12]),
  hat: stepsFrom([2, 6, 10, 14, 3, 11]),
};

const BPM_STEPS = [-5, -1, 1, 5];

const TESTS = [
  'App installs and opens',
  'Loop plays kick, snare and hats in time',
  'Scroll and tap hard for 30 seconds: no drift or stutter',
  'Change BPM while playing: stays in time',
];

// Blocks the JS thread for 40 ms out of every 100 ms, to simulate a busy app.
function startStress(): () => void {
  const id = setInterval(() => {
    const until = Date.now() + 40;
    while (Date.now() < until) {
      // busy wait on purpose
    }
  }, 100);
  return () => clearInterval(id);
}

export default function TimingTestScreen() {
  const [pattern, setPattern] = useState<Pattern>(STARTER_PATTERN);
  const [bpm, setBpm] = useState(130);
  const [voice, setVoice] = useState<DrumVoice>('kick');
  const [playing, setPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(-1);
  const [stress, setStress] = useState(false);
  const [machine] = useState(() => new DrumMachine(STARTER_PATTERN, 130));

  useEffect(() => {
    machine.setPattern(pattern);
  }, [machine, pattern]);

  useEffect(() => {
    machine.setBpm(bpm);
  }, [machine, bpm]);

  // Release audio when the screen goes away.
  useEffect(() => () => void machine.dispose(), [machine]);

  // Stop when the app goes to the background.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state !== 'active') {
        machine.stop();
        setPlaying(false);
      }
    });
    return () => sub.remove();
  }, [machine]);

  // Move the playhead in step with what is actually heard.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const loop = () => {
      setPlayhead(machine.currentStep());
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [machine, playing]);

  useEffect(() => (stress ? startStress() : undefined), [stress]);

  const activeStep = playing ? playhead : -1;

  const togglePlay = async () => {
    if (machine.isPlaying) {
      machine.stop();
      setPlaying(false);
    } else {
      await machine.start();
      setPlaying(true);
    }
  };

  const toggleStep = (step: number) => {
    setPattern((prev) => ({
      ...prev,
      [voice]: prev[voice].map((on, i) => (i === step ? !on : on)),
    }));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Pocket Studio AI</Text>
        <Text style={styles.subtitle}>Phase 0 · Timing test</Text>

        <View style={styles.card}>
          <Pressable
            onPress={togglePlay}
            style={[styles.playButton, playing && styles.playButtonActive]}
            accessibilityRole="button"
            accessibilityLabel={playing ? 'Stop' : 'Play'}>
            <Text style={styles.playLabel}>{playing ? '■  Stop' : '▶  Play'}</Text>
          </Pressable>

          <View style={styles.bpmRow}>
            {BPM_STEPS.slice(0, 2).map((d) => (
              <BpmButton key={d} delta={d} bpm={bpm} onChange={setBpm} />
            ))}
            <View style={styles.bpmReadout}>
              <Text style={styles.bpmValue}>{bpm}</Text>
              <Text style={styles.bpmUnit}>BPM</Text>
            </View>
            {BPM_STEPS.slice(2).map((d) => (
              <BpmButton key={d} delta={d} bpm={bpm} onChange={setBpm} />
            ))}
          </View>
        </View>

        <View style={styles.tabs}>
          {VOICES.map((v) => (
            <Pressable
              key={v}
              onPress={() => setVoice(v)}
              style={[styles.tab, voice === v && styles.tabActive]}
              accessibilityRole="tab"
              accessibilityState={{ selected: voice === v }}>
              <Text style={[styles.tabLabel, voice === v && styles.tabLabelActive]}>
                {VOICE_LABEL[v]}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* One row per beat, four 16th-note steps per row. */}
        <View style={styles.grid}>
          {[0, 1, 2, 3].map((beat) => (
            <View key={beat} style={styles.gridRow}>
              {[0, 1, 2, 3].map((sub) => {
                const step = beat * 4 + sub;
                const on = pattern[voice][step];
                return (
                  <Pressable
                    key={step}
                    onPress={() => toggleStep(step)}
                    style={[
                      styles.cell,
                      sub === 0 && styles.cellDownbeat,
                      on && styles.cellOn,
                      activeStep === step && styles.cellPlayhead,
                    ]}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: on }}
                    accessibilityLabel={`${VOICE_LABEL[voice]} step ${step + 1}`}
                  />
                );
              })}
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Whole pattern</Text>
        <View style={styles.overview}>
          {VOICES.map((v) => (
            <View key={v} style={styles.overviewRow}>
              <Text style={styles.overviewLabel}>{VOICE_LABEL[v]}</Text>
              {pattern[v].map((on, step) => (
                <View
                  key={step}
                  style={[
                    styles.dot,
                    step % 4 === 0 && styles.dotDownbeat,
                    on && styles.dotOn,
                    activeStep === step && styles.dotPlayhead,
                  ]}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={[styles.card, styles.stressRow]}>
          <View style={styles.stressText}>
            <Text style={styles.stressTitle}>Stress test</Text>
            <Text style={styles.muted}>Keeps the phone busy on purpose. The beat should not wobble.</Text>
          </View>
          <Switch
            value={stress}
            onValueChange={setStress}
            trackColor={{ true: colors.accent, false: colors.border }}
          />
        </View>

        <Text style={styles.sectionLabel}>Tests for Paul</Text>
        <View style={styles.card}>
          {TESTS.map((t, i) => (
            <Text key={t} style={styles.testItem}>
              {i + 1}. {t}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Scroll test: flick through this while it plays</Text>
        {Array.from({ length: 40 }, (_, i) => (
          <View key={i} style={styles.scrollRow}>
            <Text style={styles.muted}>Scroll row {i + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function BpmButton({
  delta,
  bpm,
  onChange,
}: {
  delta: number;
  bpm: number;
  onChange: (bpm: number) => void;
}) {
  const next = clampBpm(bpm + delta);
  const disabled = next === bpm; // already at the 60 or 180 limit
  return (
    <Pressable
      onPress={() => onChange(next)}
      disabled={disabled}
      style={[styles.bpmButton, disabled && styles.disabled]}
      accessibilityRole="button"
      accessibilityLabel={`${delta > 0 ? 'Increase' : 'Decrease'} tempo by ${Math.abs(delta)}`}>
      <Text style={styles.bpmButtonLabel}>{delta > 0 ? `+${delta}` : `${delta}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 48, gap: 16 },
  title: { color: colors.text, fontSize: 28, fontWeight: '700' },
  subtitle: { color: colors.textMuted, fontSize: 16, marginTop: -12 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  playButton: {
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: { backgroundColor: colors.accent },
  playLabel: { color: colors.text, fontSize: 20, fontWeight: '700' },
  bpmRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bpmButton: {
    minWidth: TOUCH_TARGET + 8,
    height: TOUCH_TARGET + 4,
    borderRadius: 26,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bpmButtonLabel: { color: colors.text, fontSize: 17, fontWeight: '600' },
  bpmReadout: { flex: 1, alignItems: 'center' },
  bpmValue: { color: colors.text, fontSize: 32, fontWeight: '700', fontVariant: ['tabular-nums'] },
  bpmUnit: { color: colors.textMuted, fontSize: 12, letterSpacing: 1 },
  disabled: { opacity: 0.35 },
  tabs: { flexDirection: 'row', gap: 8 },
  tab: {
    flex: 1,
    height: TOUCH_TARGET,
    borderRadius: TOUCH_TARGET / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: { backgroundColor: colors.drums, borderColor: colors.drums },
  tabLabel: { color: colors.textMuted, fontSize: 16, fontWeight: '600' },
  tabLabelActive: { color: colors.background },
  grid: { gap: 10 },
  gridRow: { flexDirection: 'row', gap: 10 },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  cellDownbeat: { backgroundColor: colors.surfaceRaised },
  cellOn: { backgroundColor: colors.drums, borderColor: colors.drums },
  cellPlayhead: { borderColor: colors.text },
  sectionLabel: { color: colors.textMuted, fontSize: 13, letterSpacing: 0.5, marginBottom: -8 },
  overview: { gap: 6 },
  overviewRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  overviewLabel: { color: colors.textMuted, fontSize: 12, width: 44 },
  dot: { flex: 1, height: 14, borderRadius: 4, backgroundColor: colors.surface },
  dotDownbeat: { backgroundColor: colors.surfaceRaised },
  dotOn: { backgroundColor: colors.drums },
  dotPlayhead: { borderWidth: 2, borderColor: colors.text },
  stressRow: { flexDirection: 'row', alignItems: 'center' },
  stressText: { flex: 1, gap: 4 },
  stressTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  muted: { color: colors.textMuted, fontSize: 14 },
  testItem: { color: colors.text, fontSize: 15, lineHeight: 22 },
  scrollRow: {
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
