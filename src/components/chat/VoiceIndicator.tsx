import { cn } from "@/lib/utils";
import { AudioWaveform } from "./AudioWaveform";

interface VoiceIndicatorProps {
  isListening: boolean;
  isSpeaking: boolean;
}

export const VoiceIndicator = ({ isListening, isSpeaking }: VoiceIndicatorProps) => {
  if (!isListening && !isSpeaking) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
      <div
        className={cn(
          "px-6 py-3 rounded-full glass-strong glow-border flex items-center gap-3 text-sm",
          isListening && "border-primary/50",
          isSpeaking && "border-primary/50 animate-pulse-glow"
        )}
      >
        {isListening && (
          <>
            <AudioWaveform isActive={true} barCount={4} />
            <span className="text-primary font-medium">Listening...</span>
          </>
        )}
        {isSpeaking && (
          <>
            <AudioWaveform isActive={true} barCount={7} className="h-6" />
            <span className="text-primary font-medium">JARVIS</span>
            <AudioWaveform isActive={true} barCount={7} className="h-6" />
          </>
        )}
      </div>
    </div>
  );
};
