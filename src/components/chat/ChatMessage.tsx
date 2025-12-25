import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ content, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
          isUser
            ? "bg-secondary border border-border"
            : "bg-primary/20 border border-primary/50 animate-pulse-glow"
        )}
      >
        {isUser ? (
          <span className="text-sm font-mono text-muted-foreground">YOU</span>
        ) : (
          <span className="text-sm font-display text-primary glow-text">J</span>
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[75%] px-4 py-3 rounded-2xl",
          isUser
            ? "bg-secondary/80 border border-border rounded-br-sm"
            : "glass glow-border rounded-bl-sm"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        <span className="text-[10px] text-muted-foreground mt-2 block">
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
};
