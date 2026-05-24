"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";

const suggestedQuestions = [
  "What are the biggest research gaps in textile wet processing right now?",
  "Suggest a novel BSc thesis topic combining sustainable dyeing and bio-mordants",
  "How can I design experiments for salt-free dyeing at low liquor ratio?",
  "Which journals are most likely to accept a BSc textile research paper?",
  "What statistical methods should I use for analyzing dyeing results?",
  "Help me write an abstract for low liquor ratio salt-free dyeing research",
];

export default function AICopilotPage() {
  const { chatMessages, addChatMessage, clearChat } = useAppStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    const userMsgId = `user-${chatMessages.length + 1}`;
    const userTime = new Date().toLocaleTimeString();
    addChatMessage({
      id: userMsgId,
      role: "user",
      content: message,
      timestamp: userTime,
    });
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const defaultResponse =
        "Based on my analysis of 1,247+ papers from 2024-2026, I can help you with that! Here are some key insights:\n\n**Research Context:** The textile wet processing field is rapidly evolving toward sustainability. The hottest topics right now are AI-optimized dyeing, salt-free cationization, and low liquor ratio processing.\n\n**My Recommendation:** For a BSc researcher, I strongly suggest focusing on the combination of low liquor ratio (LLR) dyeing with salt-free cationization and bio-mordants. This is a virtually unexplored intersection with ZERO published papers combining all three approaches.\n\n**Next Steps:**\n1. Start with a literature review of 30+ papers\n2. Design your cationization experiments (CHPTAC or Chitosan)\n3. Test at various liquor ratios (1:3, 1:5, 1:8, 1:10)\n4. Apply bio-mordants as auxiliary agents\n\nWould you like me to help you design the specific experimental protocol?";

      const aiResponse =
        `Great question about "${message.substring(0, 50)}..."\n\n${defaultResponse}`;

      const aiMsgId = `ai-${chatMessages.length + 2}`;
      const aiTime = new Date().toLocaleTimeString();
      addChatMessage({
        id: aiMsgId,
        role: "assistant",
        content: aiResponse,
        timestamp: aiTime,
      });
      setIsTyping(false);
    }, 2000);
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
            Your intelligent textile research assistant
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
        <div className="grid grid-cols-2 gap-2 mb-4">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-left text-xs p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-slate-600"
            >
              <Sparkles size={12} className="text-emerald-500 mb-1" />
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1"
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-emerald-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <p
                className={`text-[10px] mt-1 ${
                  msg.role === "user"
                    ? "text-emerald-200"
                    : "text-slate-400"
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-blue-600" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-emerald-600" />
            </div>
            <div className="bg-slate-100 rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-2 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything about textile research..."
          className="flex-1"
        />
        <Button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="gap-2"
        >
          <Send size={14} />
          Send
        </Button>
      </div>
    </div>
  );
}
