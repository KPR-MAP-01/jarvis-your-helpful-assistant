import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
          "px-4 py-2 rounded-full glass-strong glow-border flex items-center gap-2 text-sm",
          isListening && "border-primary/50",
          isSpeaking && "border-accent/50"
        )}
      >
        {isListening && (
          <>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${8 + Math.random() * 8}px`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
            <span className="text-primary">Listening...</span>
          </>
        )}
        {isSpeaking && (
          <>
            <Volume2 size={16} className="text-accent animate-pulse" />
            <span className="text-accent">JARVIS is speaking...</span>
          </>
        )}
      </div>
    </div>
  );
};
