import {
  ChevronLeft,
  GraduationCap,
  Menu,
  Piano as PianoIcon,
  Sparkles,
  Timer,
  Waves,
} from "lucide-react";
import { TransportControls } from "./TransportControls";

interface TopBarProps {
  metronomeOn: boolean;
  sustainOn: boolean;
  teacherOn: boolean;
  isRecording: boolean;
  hasLoop: boolean;
  loopPlaying: boolean;
  loopBars: number;
  onToggleMetronome: () => void;
  onToggleSustain: () => void;
  onToggleTeacher: () => void;
  onToggleRecord: () => void;
  onToggleLoopPlay: () => void;
  onClear: () => void;
}

function IconButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
        active ? "bg-white/15 text-white" : "text-icon"
      }`}
    >
      {children}
    </button>
  );
}

export function TopBar(props: TopBarProps) {
  return (
    <header
      className="flex h-[52px] shrink-0 items-center justify-between px-3"
      style={{ background: "#1c1c1e" }}
    >
      <div className="flex items-center gap-2">
        <IconButton label="Back">
          <ChevronLeft size={20} />
        </IconButton>
        <IconButton
          label="Metronome"
          active={props.metronomeOn}
          onClick={props.onToggleMetronome}
        >
          <Timer size={18} />
        </IconButton>
        <TransportControls
          isRecording={props.isRecording}
          hasLoop={props.hasLoop}
          loopPlaying={props.loopPlaying}
          loopBars={props.loopBars}
          onToggleRecord={props.onToggleRecord}
          onToggleLoopPlay={props.onToggleLoopPlay}
          onClear={props.onClear}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <IconButton
          label="Teacher"
          active={props.teacherOn}
          onClick={props.onToggleTeacher}
        >
          <GraduationCap size={19} />
        </IconButton>
        <IconButton
          label="Sustain"
          active={props.sustainOn}
          onClick={props.onToggleSustain}
        >
          <Waves size={18} />
        </IconButton>
        {/* FX, instrument and settings are visual placeholders in v1. */}
        <IconButton label="Effects">
          <Sparkles size={18} />
        </IconButton>
        <IconButton label="Instrument">
          <PianoIcon size={18} />
        </IconButton>
        <IconButton label="Settings">
          <Menu size={18} />
        </IconButton>
      </div>
    </header>
  );
}
