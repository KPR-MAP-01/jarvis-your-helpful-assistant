export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      {/* JARVIS Avatar */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/20 border border-primary/50 animate-pulse-glow">
        <span className="text-sm font-display text-primary glow-text">J</span>
      </div>

      {/* Typing dots */}
      <div className="glass glow-border px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-typing"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-typing"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary animate-typing"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};
