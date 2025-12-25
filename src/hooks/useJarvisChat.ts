import { useState, useCallback } from "react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/jarvis-chat`;

export const useJarvisChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Good day. I am J.A.R.V.I.S., your personal AI assistant. How may I be of service today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string): Promise<string> => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    let assistantContent = "";

    try {
      const chatMessages = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.isUser ? "user" : "assistant",
          content: m.content,
        }));

      chatMessages.push({ role: "user", content });

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response from JARVIS");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      const assistantId = (Date.now() + 1).toString();

      // Add empty assistant message
      setMessages((prev) => [
        ...prev,
        { id: assistantId, content: "", isUser: false, timestamp: new Date() },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: assistantContent } : m
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("JARVIS chat error:", error);
      assistantContent = "I apologize, Sir, but I'm experiencing technical difficulties. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: assistantContent,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }

    return assistantContent;
  }, [messages]);

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
