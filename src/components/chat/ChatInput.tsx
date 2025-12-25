import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-2 glow-border">
      <div className="flex items-end gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask JARVIS anything..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none text-sm placeholder:text-muted-foreground px-3 py-2 max-h-32 min-h-[40px]"
          style={{ scrollbarWidth: "thin" }}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center transition-all hover:shadow-glow-strong disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
