import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  isListening: boolean;
  isSpeaking: boolean;
  onToggleListen: () => void;
  onStopSpeaking: () => void;
  disabled?: boolean;
}

export const VoiceButton = ({
  isListening,
  isSpeaking,
  onToggleListen,
  onStopSpeaking,
  disabled,
}: VoiceButtonProps) => {
  return (
    <div className="flex items-center gap-2">
      {isSpeaking && (
        <button
          onClick={onStopSpeaking}
          className="w-10 h-10 rounded-xl bg-destructive/20 text-destructive flex items-center justify-center transition-all hover:bg-destructive/30 hover:scale-105 active:scale-95"
          title="Stop speaking"
        >
          <VolumeX size={18} />
        </button>
      )}
      
      <button
        onClick={onToggleListen}
        disabled={disabled || isSpeaking}
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95",
          isListening
            ? "bg-primary text-primary-foreground animate-pulse shadow-glow-strong"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          (disabled || isSpeaking) && "opacity-50 cursor-not-allowed"
        )}
        title={isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? <Mic size={18} /> : <MicOff size={18} />}
      </button>
    </div>
  );
};
