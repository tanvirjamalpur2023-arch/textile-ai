"use client";

import {
  LayoutDashboard,
  Search,
  Lightbulb,
  PenTool,
  BookOpen,
  Bot,
  TrendingUp,
  FolderOpen,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore, type PageId } from "@/lib/store";

const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  {
    id: "research-monitor",
    label: "Research Monitor",
    icon: <Search size={20} />,
  },
  {
    id: "topic-recommender",
    label: "Topic Recommender",
    icon: <Lightbulb size={20} />,
  },
  {
    id: "paper-writer",
    label: "Paper Writer",
    icon: <PenTool size={20} />,
  },
  {
    id: "publication-guide",
    label: "Publication Guide",
    icon: <BookOpen size={20} />,
  },
  { id: "ai-copilot", label: "AI Copilot", icon: <Bot size={20} /> },
  {
    id: "trend-analysis",
    label: "Trend Analysis",
    icon: <TrendingUp size={20} />,
  },
  {
    id: "my-research",
    label: "My Research",
    icon: <FolderOpen size={20} />,
  },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } =
    useAppStore();

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } h-screen bg-slate-900 text-white flex flex-col transition-all duration-300 fixed left-0 top-0 z-50`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 py-4 min-h-[64px]">
        <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <FlaskConical size={20} className="text-white" />
        </div>
        {sidebarOpen && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold leading-tight whitespace-nowrap">
              TextileAI
            </h1>
            <p className="text-[10px] text-slate-400 whitespace-nowrap">
              Research Assistant
            </p>
          </div>
        )}
      </div>

      <Separator className="bg-slate-700 mx-2" />

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const btn = (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
              {isActive && sidebarOpen && (
                <Sparkles size={12} className="ml-auto text-emerald-400" />
              )}
            </button>
          );

          if (!sidebarOpen) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger>{btn}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }
          return btn;
        })}
      </nav>

      <Separator className="bg-slate-700 mx-2" />

      {/* Toggle */}
      <div className="p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          {sidebarOpen && <span className="ml-2 text-xs">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
