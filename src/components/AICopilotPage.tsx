"use client";

import { useState, useRef, useEffect } from "react";
// Card components available if needed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, Sparkles, Trash2, Loader2 } from "lucide-react";
import { useAppStore } from "@/lib/store";

const suggestedQuestions = [
  "What are the biggest research gaps in textile wet processing right now?",
  "Suggest a novel BSc thesis topic combining sustainable dyeing and bio-mordants",
  "How can I design experiments for salt-free dyeing at low liquor ratio?",
  "Which journals are most likely to accept a BSc textile research paper?",
  "What statistical methods should I use for analyzing dyeing results?",
  "Help me write an abstract for low liquor ratio salt-free dyeing research",
];

let msgCounter = 0;
function nextId(prefix: string) {
  msgCounter++;
  return `${prefix}-${msgCounter}`;
}

export default function AICopilotPage() {
  const { chatMessages, addChatMessage, clearChat } = useAppStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message || isLoading) return;

    const userMsgId = nextId("user");
    const userTime = new Date().toLocaleTimeString();
    addChatMessage({
      id: userMsgId,
      role: "user",
      content: message,
      timestamp: userTime,
    });
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const aiMsgId = nextId("ai");
      const aiTime = new Date().toLocaleTimeString();
      addChatMessage({
        id: aiMsgId,
        role: "assistant",
        content: data.reply || "I couldn't generate a response. Please try again.",
        timestamp: aiTime,
      });
    } catch {
      const aiMsgId = nextId("ai-err");
      const aiTime = new Date().toLocaleTimeString();
      addChatMessage({
        id: aiMsgId,
        role: "assistant",
        content: "I encountered a connection error. Please check your internet and try again.",
        timestamp: aiTime,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Bot size={20} className="text-emerald-500" />
            AI Research Copilot
          </h2>
          <p className="text-sm text-slate-500">
            Powered by AI — your intelligent textile research assistant
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearChat}
          className="text-slate-400 gap-1"
        >
          <Trash2 size={14} /> Clear
        </Button>
      </div>

      {/* Suggested Questions */}
      {chatMessages.length === 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <Sparkles size={12} /> Try asking:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="text-left text-xs p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-slate-600 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1 custom-scrollbar"
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={14} className="text-emerald-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white"
                  : "bg-white border border-slate-200 text-slate-800 shadow-sm"
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
              <p
                className={`text-[10px] mt-1.5 ${
                  msg.role === "user"
                    ? "text-emerald-200"
                    : "text-slate-400"
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={14} className="text-blue-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-emerald-600" />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <Loader2 size={14} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-3 border-t bg-white">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask anything about textile research..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="gap-2 bg-emerald-600 hover:bg-emerald-700"
        >
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          Send
        </Button>
      </div>
    </div>
  );
}
