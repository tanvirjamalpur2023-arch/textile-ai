"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Globe,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

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

export default function TrendAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp size={20} className="text-purple-500" />
          Trend Analysis
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          9-year textile research trend analysis (2017-2026)
        </p>
      </div>

      {/* Topic Growth */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity size={16} className="text-emerald-500" />
            Research Topic Growth (2017-2026)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topicTrends.map((t) => (
              <div key={t.topic} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{t.topic}</span>
                  <span className="font-bold text-emerald-600">
                    {t.growth} growth
                  </span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-end pr-2"
                    style={{
                      width: `${(t.growth2026 / 600) * 100}%`,
                    }}
                  >
                    <span className="text-[9px] font-bold text-white">
                      {t.growth2026}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Analysis */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe size={16} className="text-blue-500" />
              Country-wise Research Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {countryData.map((c) => (
                <div
                  key={c.country}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50"
                >
                  <span className="text-xs font-bold text-slate-700 w-24">
                    {c.country}
                  </span>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${c.pubs}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600 w-8 text-right">
                    {c.pubs}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Research Gaps */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 size={16} className="text-amber-500" />
              Critical Research Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {researchGaps.map((g) => (
                <div
                  key={g.gap}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50"
                >
                  <div className="flex-1">
                    <span className="text-xs font-medium text-slate-700">
                      {g.gap}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-2">
                      (~{g.papers} papers)
                    </span>
                  </div>
                  <Badge
                    className={`text-[10px] ${
                      g.severity === "Critical"
                        ? "bg-red-50 text-red-700"
                        : g.severity === "High"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {g.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
