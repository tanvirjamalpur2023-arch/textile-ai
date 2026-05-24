"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  BookOpen,
  Lightbulb,
  FileText,
  Globe,
  Bot,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

const stats = [
  {
    label: "Papers Analyzed",
    value: "1,247",
    change: "+89 this week",
    icon: <BookOpen size={18} />,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    label: "Research Gaps Found",
    value: "34",
    change: "+7 new",
    icon: <Lightbulb size={18} />,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    label: "Publication Targets",
    value: "18",
    change: "5 high-impact",
    icon: <FileText size={18} />,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    label: "Active Countries",
    value: "42",
    change: "+3 new",
    icon: <Globe size={18} />,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
];

const trendingTopics = [
  { name: "AI-Optimized Dyeing", growth: "+156%", hot: true },
  { name: "Salt-Free Cationization", growth: "+89%", hot: true },
  { name: "Bio-Mordant Natural Dyes", growth: "+73%", hot: false },
  { name: "PFAS-Free DWR Finishing", growth: "+67%", hot: false },
  { name: "LLR Sustainable Dyeing", growth: "+62%", hot: false },
  { name: "Smart Self-Powered Textiles", growth: "+58%", hot: false },
  { name: "Enzyme Cocktail Processing", growth: "+51%", hot: false },
  { name: "Plasma Surface Treatment", growth: "+45%", hot: false },
];

const recentPapers = [
  {
    title: "Salt-Free Dyeing via Graft Polymerization with Chitosan Using Dimethyl Itaconate",
    journal: "RSC Advances",
    year: 2025,
    tag: "Salt-Free",
  },
  {
    title: "Cleaner Cationization of Cotton Fabrics by Reusing Modification Bath",
    journal: "J. Cleaner Production",
    year: 2024,
    tag: "Sustainable",
  },
  {
    title: "Low Liquor Ratio Dyeing: Reducing Water and Energy in Cotton Dyeing",
    journal: "Discover Chemistry",
    year: 2026,
    tag: "LLR Dyeing",
  },
  {
    title: "Bacterial Self-Pigmenting Cellulose Textiles for Sustainable Coloration",
    journal: "Nature Biotechnology",
    year: 2024,
    tag: "Innovation",
  },
  {
    title: "AI-Assisted Dyeing Optimization of Polyimide Fibers",
    journal: "Dyes and Pigments",
    year: 2025,
    tag: "AI/ML",
  },
];

export default function DashboardPage() {
  const { setCurrentPage } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles size={24} />
              Welcome to TextileAI Research Assistant
            </h1>
            <p className="text-emerald-100 mt-1 text-sm">
              Your AI-powered copilot for textile research and publication
            </p>
          </div>
          <Bot size={48} className="text-emerald-200 opacity-60" />
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setCurrentPage("topic-recommender")}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
          >
            Find Research Topic
          </button>
          <button
            onClick={() => setCurrentPage("ai-copilot")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
          >
            Ask AI Copilot
          </button>
          <button
            onClick={() => setCurrentPage("paper-writer")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
          >
            Write Paper
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg ${s.bg} ${s.color} flex items-center justify-center`}
              >
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="text-xs text-emerald-600 font-medium">
                  {s.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Topics */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" />
              Trending Research Topics (2024-2026)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {trendingTopics.map((t, i) => (
              <div
                key={t.name}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-5">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    {t.name}
                  </span>
                  {t.hot && (
                    <Badge
                      variant="secondary"
                      className="bg-red-50 text-red-600 text-[10px] px-1.5"
                    >
                      HOT
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-bold text-emerald-600">
                  {t.growth}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Papers */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen size={16} className="text-blue-500" />
              Latest Key Papers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentPapers.map((p) => (
              <div
                key={p.title}
                className="py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <p className="text-sm font-medium text-slate-700 line-clamp-2">
                  {p.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500">{p.journal}</span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs text-slate-500">{p.year}</span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 bg-emerald-50 text-emerald-700"
                  >
                    {p.tag}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Research Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Search Papers",
                icon: <Search size={20} />,
                page: "research-monitor" as const,
              },
              {
                label: "Find Gaps",
                icon: <Lightbulb size={20} />,
                page: "topic-recommender" as const,
              },
              {
                label: "Write Abstract",
                icon: <PenTool size={20} />,
                page: "paper-writer" as const,
              },
              {
                label: "Choose Journal",
                icon: <BookOpen size={20} />,
                page: "publication-guide" as const,
              },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => setCurrentPage(a.page)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
              >
                <span className="text-slate-500 group-hover:text-emerald-600 transition-colors">
                  {a.icon}
                </span>
                <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-700">
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Search({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PenTool({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}
