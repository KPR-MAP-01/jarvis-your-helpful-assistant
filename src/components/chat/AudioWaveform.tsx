import { cn } from "@/lib/utils";

interface AudioWaveformProps {
  isActive: boolean;
  className?: string;
  barCount?: number;
}

export const AudioWaveform = ({ isActive, className, barCount = 5 }: AudioWaveformProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {[...Array(barCount)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full bg-primary transition-all duration-150",
            isActive ? "animate-waveform" : "h-1"
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.4 + Math.random() * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
};
