import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const JARVIS_RESPONSES = [
  "Good day. How may I assist you today?",
  "I've analyzed your request. Here's what I found...",
  "Running diagnostics now. One moment please.",
  "Certainly. I'll process that immediately.",
  "I've compiled the relevant data for you.",
  "Allow me to elaborate on that matter.",
  "That's an excellent question. Let me provide some insight.",
  "I've taken the liberty of preparing a comprehensive response.",
  "Accessing the database now. Your request is being processed.",
  "My analysis suggests the following course of action...",
];

export const JarvisChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Good day. I am J.A.R.V.I.S., your personal AI assistant. How may I be of service today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate JARVIS response
    setTimeout(() => {
      const randomResponse =
        JARVIS_RESPONSES[Math.floor(Math.random() * JARVIS_RESPONSES.length)];
      
      const jarvisMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, jarvisMessage]);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50 opacity-[0.02]">
        <div
          className="absolute w-full h-px bg-primary"
          style={{
            animation: "scan-line 8s linear infinite",
          }}
        />
      </div>

      {/* Grid pattern background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <ChatHeader />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          <p className="text-center text-[10px] text-muted-foreground mt-3">
            JARVIS is ready to assist • Powered by Stark Industries
          </p>
        </div>
      </div>
    </div>
  );
};
