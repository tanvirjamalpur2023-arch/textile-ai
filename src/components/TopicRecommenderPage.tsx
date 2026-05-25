"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lightbulb,
  TrendingUp,
  Globe,
  BookOpen,
  FlaskConical,
  ChevronRight,
  Sparkles,
  Star,
  Loader2,
  Zap,
} from "lucide-react";

interface Topic {
  id: number;
  name: string;
  why: string;
  globalStatus: string;
  countries: string[];
  universities: string[];
  journals: { name: string; if: number }[];
  methods: string[];
  novelty: number;
  feasibility: number;
  demand: number;
  competition: number;
  bscScore: number;
}

const topics: Topic[] = [
  {
    id: 1,
    name: "Low Liquor Ratio Salt-Free Dyeing with Bio-Mordants",
    why: "BIGGEST publication gap — only 2-3 experimental papers exist (2024-2026), ZERO papers combine LLR + bio-mordants + salt-free approach. Perfect BSc thesis opportunity with score 9.2/10.",
    globalStatus: "Emerging — very few research groups working on this combination",
    countries: ["China", "India", "Bangladesh"],
    universities: ["Wuhan Textile University", "Jiangnan University", "BUET"],
    journals: [
      { name: "J. Cleaner Production", if: 11.1 },
      { name: "Dyes and Pigments", if: 4.2 },
      { name: "Sustainability", if: 3.9 },
    ],
    methods: ["Cationization (CHPTAC/Chitosan)", "LLR dyeing (1:3-1:10)", "Bio-mordant application", "K/S & fastness testing"],
    novelty: 9.5,
    feasibility: 9.0,
    demand: 8.5,
    competition: 2.0,
    bscScore: 9.2,
  },
  {
    id: 2,
    name: "Dual Bio-Mordant Natural Dyeing from Agricultural Waste",
    why: "Growing demand for sustainable alternatives. Recent 2024 paper introduced dual bio-mordants (walnut husk + pomegranate peel) — still virtually no follow-up studies. Score: 8.5/10.",
    globalStatus: "Growing — many reviews but few experimental studies on dual bio-mordants",
    countries: ["India", "Iran", "Turkey", "Bangladesh"],
    universities: ["University of Minho", "Aalto University", "Zhejiang Sci-Tech"],
    journals: [
      { name: "J. Natural Fibers", if: 3.1 },
      { name: "Sustainability", if: 3.9 },
      { name: "Textile Research J.", if: 1.9 },
    ],
    methods: ["Plant extraction", "Dual mordanting", "Dyeing optimization", "Fastness evaluation"],
    novelty: 7.5,
    feasibility: 9.5,
    demand: 8.0,
    competition: 5.0,
    bscScore: 8.5,
  },
  {
    id: 3,
    name: "Chitosan Graft Cationization for Salt-Free Reactive Dyeing",
    why: "Mature field with new innovations (dimethyl itaconate crosslinker, bath reuse). Well-established protocols make it ideal for BSc with reliable results. Score: 8.2/10.",
    globalStatus: "Well-established with recent innovations driving new publications",
    countries: ["China", "Pakistan", "India", "UK"],
    universities: ["Donghua University", "NTU Faisalabad", "RSC Advances groups"],
    journals: [
      { name: "RSC Advances", if: 4.1 },
      { name: "Cellulose", if: 4.9 },
      { name: "Dyes and Pigments", if: 4.2 },
    ],
    methods: ["Chitosan grafting", "CHPTAC cationization", "Bath reuse optimization", "Dye fixation measurement"],
    novelty: 8.0,
    feasibility: 8.5,
    demand: 9.0,
    competition: 6.5,
    bscScore: 8.2,
  },
  {
    id: 4,
    name: "AI-Optimized Dye Recipe Prediction Using Machine Learning",
    why: "Fastest growing textile research area (5.8x growth). Zero chemical cost — only Python + data needed. High novelty but requires ML skills. Score: 7.4/10.",
    globalStatus: "Rapidly growing — limited to groups with AI expertise",
    countries: ["China", "USA", "Germany", "South Korea"],
    universities: ["NC State University", "Donghua University", "TU Dresden"],
    journals: [
      { name: "Dyes and Pigments", if: 4.2 },
      { name: "Textile Research J.", if: 1.9 },
      { name: "Sci. Reports", if: 4.6 },
    ],
    methods: ["Dataset collection", "ML model training (scikit-learn)", "Recipe prediction", "Experimental validation"],
    novelty: 8.5,
    feasibility: 7.0,
    demand: 9.0,
    competition: 4.0,
    bscScore: 7.4,
  },
  {
    id: 5,
    name: "Plant Extract Finishing for Antibacterial + UV Protection",
    why: "Simplest BSc experiment (Tulsi, Neem, Mimusops elengi). Dual functional finishing from single plant extract. Very low cost and quick results. Score: 7.5/10.",
    globalStatus: "Well-published but novel plant sources remain unexplored",
    countries: ["India", "Ethiopia", "Bangladesh", "Egypt"],
    universities: ["Various Indian universities", "Addis Ababa University"],
    journals: [
      { name: "J. Industrial Textiles", if: 2.5 },
      { name: "Sustainability", if: 3.9 },
      { name: "J. Natural Fibers", if: 3.1 },
    ],
    methods: ["Plant extract preparation", "Pad-dry-cure application", "Antibacterial testing", "UPF measurement"],
    novelty: 6.5,
    feasibility: 9.5,
    demand: 7.5,
    competition: 7.0,
    bscScore: 7.5,
  },
];

export default function TopicRecommenderPage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [aiFocus, setAiFocus] = useState("");
  const [aiRecommendations, setAiRecommendations] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIRecommend = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          focus: aiFocus || "Sustainable textile wet processing, dyeing, finishing",
          level: "BSc",
        }),
      });
      const data = await res.json();
      setAiRecommendations(data.recommendations);
    } catch {
      setAiRecommendations("Error generating recommendations. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Lightbulb size={20} className="text-amber-500" />
          Topic Recommender
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          AI-powered research topic suggestions based on publication gaps, novelty, and BSc feasibility
        </p>
      </div>

      {/* AI Custom Recommender */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-4">
          <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-amber-500" />
            AI Custom Topic Generator
          </h3>
          <div className="flex gap-3">
            <Input
              value={aiFocus}
              onChange={(e) => setAiFocus(e.target.value)}
              placeholder="Enter your research focus area..."
              className="flex-1 bg-white"
            />
            <Button
              onClick={handleAIRecommend}
              disabled={isGenerating}
              className="gap-2 bg-amber-600 hover:bg-amber-700"
            >
              {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {isGenerating ? "Generating..." : "Get AI Suggestions"}
            </Button>
          </div>
          {aiRecommendations && (
            <div className="mt-4 bg-white border border-amber-200 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed max-h-96 overflow-y-auto custom-scrollbar">
                {aiRecommendations}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pre-analyzed Topics */}
      <div>
        <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Star size={14} className="text-emerald-500" />
          Pre-Analyzed Research Topics (Ranked by BSc Score)
        </h3>
      </div>

      {!selectedTopic ? (
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <Card
              key={topic.id}
              className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedTopic(topic)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-emerald-600">#{index + 1}</span>
                      {topic.id <= 2 && (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                          <Star size={10} className="mr-1" /> TOP PICK
                        </Badge>
                      )}
                      <h3 className="text-sm font-bold text-slate-800">{topic.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{topic.why}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Sparkles size={12} className="text-amber-500" />
                        <span className="text-xs text-slate-600">Novelty: <span className="font-bold">{topic.novelty}/10</span></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FlaskConical size={12} className="text-blue-500" />
                        <span className="text-xs text-slate-600">BSc Score: <span className="font-bold text-emerald-600">{topic.bscScore}/10</span></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} className="text-emerald-500" />
                        <span className="text-xs text-slate-600">Low Competition ({10 - topic.competition}/10)</span>
                      </div>
                    </div>
                    {/* Score bars */}
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {[
                        { label: "Novelty", value: topic.novelty, color: "bg-amber-500" },
                        { label: "Feasibility", value: topic.feasibility, color: "bg-blue-500" },
                        { label: "Demand", value: topic.demand, color: "bg-emerald-500" },
                        { label: "BSc Fit", value: topic.bscScore, color: "bg-purple-500" },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="flex justify-between text-[10px] mb-0.5">
                            <span className="text-slate-500">{s.label}</span>
                            <span className="font-bold">{s.value}</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.value * 10}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 flex-shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => setSelectedTopic(null)} className="mb-2">
            ← Back to all topics
          </Button>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Zap size={20} className="text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{selectedTopic.name}</CardTitle>
                  <p className="text-sm text-emerald-600 font-bold">BSc Score: {selectedTopic.bscScore}/10</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">Why This Topic?</h4>
                <p className="text-sm text-slate-600">{selectedTopic.why}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-1">Global Research Status</h4>
                <p className="text-sm text-slate-600">{selectedTopic.globalStatus}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                    <Globe size={14} /> Active Countries
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTopic.countries.map((c) => (
                      <Badge key={c} variant="secondary">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                    <BookOpen size={14} /> Target Journals
                  </h4>
                  <div className="space-y-1">
                    {selectedTopic.journals.map((j) => (
                      <div key={j.name} className="flex items-center justify-between text-xs">
                        <span className="text-slate-700">{j.name}</span>
                        <Badge className="bg-blue-50 text-blue-700 text-[10px]">IF {j.if}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                  <FlaskConical size={14} /> Experimental Methods
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedTopic.methods.map((m) => (
                    <div key={m} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                      <ChevronRight size={12} className="text-emerald-500" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Score bars */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {[
                  { label: "Novelty", value: selectedTopic.novelty, color: "bg-amber-500" },
                  { label: "Feasibility", value: selectedTopic.feasibility, color: "bg-blue-500" },
                  { label: "Demand", value: selectedTopic.demand, color: "bg-emerald-500" },
                  { label: "Low Competition", value: 10 - selectedTopic.competition, color: "bg-purple-500" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{s.label}</span>
                      <span className="font-bold">{s.value}/10</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.value * 10}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Universities */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-2">Leading Research Groups</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTopic.universities.map((u) => (
                    <Badge key={u} variant="outline" className="text-xs">{u}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
