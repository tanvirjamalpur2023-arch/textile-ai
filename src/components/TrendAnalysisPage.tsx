"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Globe,
  BarChart3,
  Activity,
  AlertTriangle,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const countryData = [
  { country: "China", pubs: 38, top50: 24, strength: "Volume leadership; smart textiles, dyeing, nano" },
  { country: "India", pubs: 12, top50: 4, strength: "Natural fibers, enzymatic processing, wastewater" },
  { country: "USA", pubs: 9, top50: 1, strength: "Smart/wearable textiles, AI, military/protective" },
  { country: "South Korea", pubs: 7, top50: 2, strength: "Technical textiles, smart fabrics, nanofiber" },
  { country: "UK", pubs: 5, top50: 1, strength: "Sustainable fashion, circular economy" },
  { country: "Turkey", pubs: 4, top50: 2, strength: "Cotton processing, textile chemistry" },
  { country: "Australia", pubs: 3, top50: 2, strength: "Protective textiles, wool research" },
  { country: "Pakistan", pubs: 3, top50: 1, strength: "Wet processing, spinning" },
];

const topicTrends = [
  { topic: "AI/Industry 4.0", growth2017: 100, growth2026: 580, growth: "5.8x" },
  { topic: "Circular Economy", growth2017: 100, growth2026: 510, growth: "5.1x" },
  { topic: "Smart Textiles", growth2017: 100, growth2026: 470, growth: "4.7x" },
  { topic: "Sustainable Processing", growth2017: 100, growth2026: 460, growth: "4.6x" },
  { topic: "Nano Finishing", growth2017: 100, growth2026: 400, growth: "4.0x" },
  { topic: "Waterless Dyeing", growth2017: 100, growth2026: 380, growth: "3.8x" },
];

const researchGaps = [
  { gap: "Cellulosic scCO2 dyeing", severity: "Critical", papers: "~3" },
  { gap: "LLR + Bio-mordant combination", severity: "Critical", papers: "0" },
  { gap: "Nano-finishing wash durability", severity: "High", papers: "~5" },
  { gap: "PFAS-free oil repellency", severity: "High", papers: "~4" },
  { gap: "Digital twin for wet processing", severity: "Critical", papers: "0" },
  { gap: "Natural dye industrial scale-up", severity: "Medium", papers: "~8" },
  { gap: "AI integration for SMEs", severity: "Medium", papers: "~6" },
];

// Line chart data - multi-year trend
const yearlyData = [
  { year: "2017", ai: 50, circular: 40, smart: 60, sustainable: 120, nano: 80, waterless: 30 },
  { year: "2018", ai: 65, circular: 55, smart: 75, sustainable: 145, nano: 95, waterless: 38 },
  { year: "2019", ai: 90, circular: 75, smart: 95, sustainable: 178, nano: 115, waterless: 50 },
  { year: "2020", ai: 130, circular: 110, smart: 130, sustainable: 210, nano: 140, waterless: 68 },
  { year: "2021", ai: 180, circular: 155, smart: 175, sustainable: 260, nano: 170, waterless: 90 },
  { year: "2022", ai: 240, circular: 210, smart: 230, sustainable: 320, nano: 200, waterless: 120 },
  { year: "2023", ai: 310, circular: 280, smart: 290, sustainable: 390, nano: 240, waterless: 155 },
  { year: "2024", ai: 380, circular: 350, smart: 350, sustainable: 460, nano: 285, waterless: 195 },
  { year: "2025", ai: 450, circular: 420, smart: 410, sustainable: 520, nano: 330, waterless: 240 },
  { year: "2026", ai: 500, circular: 470, smart: 460, sustainable: 570, nano: 370, waterless: 280 },
];

// Radar chart data - research opportunity
const radarData = [
  { subject: "Novelty", llr: 95, naturalDye: 75, ai: 85, nano: 70 },
  { subject: "Feasibility", llr: 90, naturalDye: 95, ai: 70, nano: 60 },
  { subject: "Demand", llr: 85, naturalDye: 80, ai: 90, nano: 75 },
  { subject: "Low Competition", llr: 90, naturalDye: 60, ai: 75, nano: 65 },
  { subject: "BSc Fit", llr: 92, naturalDye: 85, ai: 74, nano: 55 },
  { subject: "Industry Need", llr: 88, naturalDye: 70, ai: 85, nano: 80 },
];

const barData = [
  { name: "China", value: 380, fill: "#ef4444" },
  { name: "India", value: 120, fill: "#f59e0b" },
  { name: "USA", value: 90, fill: "#3b82f6" },
  { name: "S. Korea", value: 70, fill: "#6366f1" },
  { name: "UK", value: 50, fill: "#10b981" },
  { name: "Turkey", value: 40, fill: "#ec4899" },
  { name: "Australia", value: 30, fill: "#14b8a6" },
  { name: "Pakistan", value: 30, fill: "#f97316" },
];

export default function TrendAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp size={20} className="text-purple-500" />
          Trend Analysis
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          9-year textile research trend analysis (2017-2026) with AI-powered insights
        </p>
      </div>

      {/* Main Trend Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity size={16} className="text-emerald-500" />
            Research Topic Growth Trends (2017-2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line type="monotone" dataKey="sustainable" name="Sustainable" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ai" name="AI/Industry 4.0" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="nano" name="Nano Finishing" stroke="#ec4899" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="smart" name="Smart Textiles" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="circular" name="Circular Economy" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="waterless" name="Waterless Dyeing" stroke="#14b8a6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Bar Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe size={16} className="text-blue-500" />
              Country-wise Research Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} stroke="#94a3b8" width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" name="Publications" radius={[0, 4, 4, 0]}>
                    {barData.map((entry, index) => (
                      <rect key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-2">
              {countryData.map((c) => (
                <div key={c.country} className="flex items-center justify-between text-xs px-1">
                  <span className="text-slate-700 font-medium">{c.country}</span>
                  <span className="text-slate-500">{c.strength}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Research Opportunity Radar */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 size={16} className="text-amber-500" />
              Research Opportunity Radar (Top 3 Topics)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar name="LLR+Bio-Mordant" dataKey="llr" stroke="#10b981" fill="#10b981" fillOpacity={0.15} />
                  <Radar name="Natural Dyes" dataKey="naturalDye" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                  <Radar name="AI/ML" dataKey="ai" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mt-2">
              <p className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                <Zap size={12} /> AI Insight: LLR+Bio-Mordant topic dominates in Novelty, Low Competition, and BSc Fit — making it the #1 recommendation for BSc students.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Gaps */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            Critical Research Gaps — Your Publication Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {researchGaps.map((g) => (
              <div
                key={g.gap}
                className={`p-4 rounded-lg border ${
                  g.severity === "Critical"
                    ? "bg-red-50 border-red-200"
                    : g.severity === "High"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    className={`text-[10px] ${
                      g.severity === "Critical"
                        ? "bg-red-100 text-red-700"
                        : g.severity === "High"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {g.severity}
                  </Badge>
                  <span className="text-[10px] text-slate-500">{g.papers} papers</span>
                </div>
                <p className="text-sm font-medium text-slate-800">{g.gap}</p>
                {g.severity === "Critical" && (
                  <p className="text-[10px] text-red-600 mt-1">
                    Virtually no published research — prime opportunity for novel publication
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Topic Growth Summary (2017-2026)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topicTrends.map((t) => (
              <div key={t.topic} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{t.topic}</span>
                  <span className="font-bold text-emerald-600">{t.growth} growth</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(t.growth2026 / 600) * 100}%` }}
                  >
                    <span className="text-[9px] font-bold text-white">{t.growth2026}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
