import { useCallback, useEffect, useRef, useState } from "react";
import * as engine from "./audio/audioEngine";
import * as teacher from "./audio/teacherEngine";
import type { TeacherMode, TeacherState } from "./audio/teacherEngine";
import { BeatControls } from "./components/BeatControls";
import { Navigator } from "./components/Navigator";
import { Piano } from "./components/Piano";
import { RotatePrompt } from "./components/RotatePrompt";
import { TeacherBar } from "./components/TeacherBar";
import { TopBar } from "./components/TopBar";
import { COMPUTER_KEY_MAP } from "./lib/notes";

export default function App() {
  // Loop data stays in memory only (spec: no persistence in v1).
  const pressedRef = useRef(new Set<string>());
  const [pressed, setPressed] = useState<Set<string>>(new Set());

  const [metronomeOn, setMetronomeOn] = useState(false);
  const [sustainOn, setSustainOn] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [hasLoop, setHasLoop] = useState(false);
  const [loopPlaying, setLoopPlaying] = useState(false);
  const [loopBars, setLoopBars] = useState(0);

  const [beatPlaying, setBeatPlaying] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [patternIndex, setPatternIndex] = useState(0);
  const [beatVolume, setBeatVolume] = useState(0.5);

  const [teacherOn, setTeacherOn] = useState(false);
  const [teacherState, setTeacherState] = useState<TeacherState | null>(null);

  useEffect(() => teacher.subscribe(setTeacherState), []);

  const [isPortrait, setIsPortrait] = useState(
    () => window.matchMedia("(orientation: portrait)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const onChange = (e: MediaQueryListEvent) => setIsPortrait(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const noteOn = useCallback(async (note: string) => {
    if (pressedRef.current.has(note)) return;
    pressedRef.current.add(note);
    setPressed(new Set(pressedRef.current));
    // Audio starts on the first user gesture; afterwards this await is a
    // resolved promise and adds no latency.
    await engine.initAudio();
    engine.noteOn(note);
    // In Learn mode the teacher advances when you hit the glowing key.
    teacher.handleUserNote(note);
  }, []);

  const noteOff = useCallback(async (note: string) => {
    if (!pressedRef.current.has(note)) return;
    pressedRef.current.delete(note);
    setPressed(new Set(pressedRef.current));
    await engine.initAudio();
    engine.noteOff(note);
  }, []);

  // SPEC-NOTE: computer-keyboard input is a dev/testing convenience only.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const note = COMPUTER_KEY_MAP[e.key.toLowerCase()];
      if (note) void noteOn(note);
    };
    const up = (e: KeyboardEvent) => {
      const note = COMPUTER_KEY_MAP[e.key.toLowerCase()];
      if (note) void noteOff(note);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [noteOn, noteOff]);

  const toggleRecord = async () => {
    await engine.initAudio();
    if (isRecording) {
      // SPEC-NOTE: like a hardware looper, stopping record immediately starts
      // loop playback; the play/stop button then toggles it.
      const playing = engine.stopRecording();
      setIsRecording(false);
      setHasLoop(engine.hasRecording());
      setLoopBars(engine.getLoopBars());
      setLoopPlaying(playing);
    } else {
      engine.startRecording();
      setIsRecording(true);
      setHasLoop(false);
      setLoopPlaying(false);
      setLoopBars(0);
    }
  };

  const toggleLoopPlay = async () => {
    await engine.initAudio();
    const next = !loopPlaying;
    engine.setLoopPlaying(next);
    setLoopPlaying(next);
  };

  const clearLoop = () => {
    engine.clearRecording();
    setIsRecording(false);
    setHasLoop(false);
    setLoopPlaying(false);
    setLoopBars(0);
  };

  const toggleBeat = async () => {
    await engine.initAudio();
    const next = !beatPlaying;
    engine.setBeatPlaying(next);
    setBeatPlaying(next);
  };

  const toggleMetronome = async () => {
    await engine.initAudio();
    const next = !metronomeOn;
    engine.setMetronome(next);
    setMetronomeOn(next);
  };

  const toggleSustain = () => {
    const next = !sustainOn;
    engine.setSustain(next);
    setSustainOn(next);
  };

  const changeBpm = (v: number) => {
    setBpm(v);
    engine.setBpm(v);
  };

  const changePattern = (i: number) => {
    setPatternIndex(i);
    engine.setPattern(i);
  };

  const changeBeatVolume = (v: number) => {
    setBeatVolume(v);
    engine.setBeatVolume(v);
  };

  const toggleTeacher = async () => {
    await engine.initAudio();
    if (teacherOn) {
      teacher.exit();
      setTeacherOn(false);
    } else {
      // Stop the free-play beat so the lesson owns the tempo cleanly.
      engine.setBeatPlaying(false);
      setBeatPlaying(false);
      teacher.setRestoreBpm(bpm);
      teacher.load(teacher.getSongId());
      setTeacherOn(true);
    }
  };

  const selectSong = (id: string) => {
    teacher.setRestoreBpm(bpm);
    teacher.load(id);
  };

  const teacherPlay = async () => {
    await engine.initAudio();
    teacher.togglePlay();
  };

  return (
    <div
      className="flex h-full flex-col"
      style={{ background: "linear-gradient(180deg, #0a0a0d 0%, #0d0d12 100%)" }}
      onPointerDown={() => void engine.initAudio()}
    >
      <TopBar
        metronomeOn={metronomeOn}
        sustainOn={sustainOn}
        teacherOn={teacherOn}
        isRecording={isRecording}
        hasLoop={hasLoop}
        loopPlaying={loopPlaying}
        loopBars={loopBars}
        onToggleMetronome={() => void toggleMetronome()}
        onToggleSustain={toggleSustain}
        onToggleTeacher={() => void toggleTeacher()}
        onToggleRecord={() => void toggleRecord()}
        onToggleLoopPlay={() => void toggleLoopPlay()}
        onClear={clearLoop}
      />
      {teacherOn && teacherState ? (
        <TeacherBar
          state={teacherState}
          onSelectSong={selectSong}
          onSetMode={(m: TeacherMode) => teacher.setMode(m)}
          onTempo={(s) => teacher.setTempoScale(s)}
          onTogglePlay={() => void teacherPlay()}
          onRestart={() => teacher.restart()}
          onSkip={(d) => teacher.skip(d)}
          onSeek={(f) => teacher.seekFraction(f)}
          onMarkA={() => teacher.markLoopA()}
          onMarkB={() => teacher.markLoopB()}
          onClearLoop={() => teacher.clearLoop()}
          onExit={() => void toggleTeacher()}
        />
      ) : (
        <>
          <Navigator />
          <BeatControls
            beatPlaying={beatPlaying}
            bpm={bpm}
            patternIndex={patternIndex}
            volume={beatVolume}
            onToggleBeat={() => void toggleBeat()}
            onBpmChange={changeBpm}
            onPatternChange={changePattern}
            onVolumeChange={changeBeatVolume}
          />
        </>
      )}

      {/* Keys anchor to the bottom and cap their height so they keep a real
          keyboard proportion instead of stretching into ribbons. */}
      <div className="flex min-h-0 flex-1 items-end px-1 pb-1 pt-2">
        <div className="w-full" style={{ height: "min(100%, 420px)" }}>
          <Piano
            pressed={pressed}
            hintNote={teacherOn ? teacherState?.targetNote : null}
            onNoteOn={(n) => void noteOn(n)}
            onNoteOff={(n) => void noteOff(n)}
          />
        </div>
      </div>

      {isPortrait && <RotatePrompt />}
    </div>
  );
}
