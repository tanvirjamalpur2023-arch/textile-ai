"use client";
import { create } from "zustand";

export type PageId =
  | "dashboard"
  | "research-monitor"
  | "topic-recommender"
  | "paper-writer"
  | "publication-guide"
  | "ai-copilot"
  | "trend-analysis"
  | "my-research";

interface ResearchNote {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AppState {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  researchNotes: ResearchNote[];
  addNote: (note: ResearchNote) => void;
  deleteNote: (id: string) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  paperProgress: number;
  setPaperProgress: (p: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: "dashboard",
  setCurrentPage: (page) => set({ currentPage: page }),
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  researchNotes: [],
  addNote: (note) =>
    set((s) => ({ researchNotes: [note, ...s.researchNotes] })),
  deleteNote: (id) =>
    set((s) => ({
      researchNotes: s.researchNotes.filter((n) => n.id !== id),
    })),
  chatMessages: [],
  addChatMessage: (msg) =>
    set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
  clearChat: () => set({ chatMessages: [] }),
  selectedTopic: null,
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  paperProgress: 0,
  setPaperProgress: (p) => set({ paperProgress: p }),
}));
