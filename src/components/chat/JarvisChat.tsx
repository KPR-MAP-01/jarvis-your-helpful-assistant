import { useRef, useEffect, useCallback } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { VoiceButton } from "./VoiceButton";
import { VoiceIndicator } from "./VoiceIndicator";
import { useJarvisChat } from "@/hooks/useJarvisChat";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useVoiceSynthesis } from "@/hooks/useVoiceSynthesis";

export const JarvisChat = () => {
  const { messages, isLoading, sendMessage } = useJarvisChat();
  const { isListening, transcript, startListening, stopListening, isSupported: sttSupported } = useVoiceRecognition();
  const { isSpeaking, speak, stop: stopSpeaking, isSupported: ttsSupported } = useVoiceSynthesis();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle voice transcript
  useEffect(() => {
    if (transcript && !isListening) {
      handleSendMessage(transcript);
    }
  }, [transcript, isListening]);

  const handleSendMessage = useCallback(async (content: string) => {
    const response = await sendMessage(content);
    if (response && ttsSupported) {
      speak(response);
    }
  }, [sendMessage, speak, ttsSupported]);

  const handleToggleListen = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeaking();
      startListening();
    }
  }, [isListening, startListening, stopListening, stopSpeaking]);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      {/* Voice indicator */}
      <VoiceIndicator isListening={isListening} isSpeaking={isSpeaking} />

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
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <ChatInput onSend={handleSendMessage} disabled={isLoading || isListening} />
            </div>
            {sttSupported && (
              <VoiceButton
                isListening={isListening}
                isSpeaking={isSpeaking}
                onToggleListen={handleToggleListen}
                onStopSpeaking={stopSpeaking}
                disabled={isLoading}
              />
            )}
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-3">
            JARVIS is ready to assist • Voice enabled • Powered by Stark Industries
          </p>
        </div>
      </div>
    </div>
  );
};
