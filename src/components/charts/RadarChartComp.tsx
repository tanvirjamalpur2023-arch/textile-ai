"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const radarData = [
  { subject: "Novelty", llr: 95, naturalDye: 75, ai: 85, nano: 70 },
  { subject: "Feasibility", llr: 90, naturalDye: 95, ai: 70, nano: 60 },
  { subject: "Demand", llr: 85, naturalDye: 80, ai: 90, nano: 75 },
  { subject: "Low Competition", llr: 90, naturalDye: 60, ai: 75, nano: 65 },
  { subject: "BSc Fit", llr: 92, naturalDye: 85, ai: 74, nano: 55 },
  { subject: "Industry Need", llr: 88, naturalDye: 70, ai: 85, nano: 80 },
];

export default function RadarChartComp() {
  return (
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
  );
}
