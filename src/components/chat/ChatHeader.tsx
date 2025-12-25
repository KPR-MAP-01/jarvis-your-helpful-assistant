import { Bot, Sparkles } from "lucide-react";

export const ChatHeader = () => {
  return (
    <header className="glass-strong border-b border-border/50 px-6 py-4">
      <div className="flex items-center gap-4">
        {/* JARVIS Logo */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse-glow">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
        </div>

        {/* Title & Status */}
        <div className="flex-1">
          <h1 className="font-display text-xl tracking-wider text-foreground glow-text">
            J.A.R.V.I.S
          </h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Sparkles size={12} className="text-primary" />
            Just A Rather Very Intelligent System
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400 font-mono">ONLINE</span>
        </div>
      </div>
    </header>
  );
};
