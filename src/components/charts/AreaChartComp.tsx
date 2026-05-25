"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const trendData = [
  { year: "2017", sustainable: 120, ai: 50, nano: 80, natural: 60 },
  { year: "2018", sustainable: 145, ai: 65, nano: 95, natural: 72 },
  { year: "2019", sustainable: 178, ai: 90, nano: 115, natural: 88 },
  { year: "2020", sustainable: 210, ai: 130, nano: 140, natural: 105 },
  { year: "2021", sustainable: 260, ai: 180, nano: 170, natural: 128 },
  { year: "2022", sustainable: 320, ai: 240, nano: 200, natural: 155 },
  { year: "2023", sustainable: 390, ai: 310, nano: 240, natural: 185 },
  { year: "2024", sustainable: 460, ai: 380, nano: 285, natural: 220 },
  { year: "2025", sustainable: 520, ai: 450, nano: 330, natural: 260 },
  { year: "2026", sustainable: 570, ai: 500, nano: 370, natural: 295 },
];

export default function AreaChartComp() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={trendData}>
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
        <Area type="monotone" dataKey="sustainable" name="Sustainable" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
        <Area type="monotone" dataKey="ai" name="AI/ML" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
        <Area type="monotone" dataKey="nano" name="Nano" stroke="#ec4899" fill="#ec4899" fillOpacity={0.1} />
        <Area type="monotone" dataKey="natural" name="Natural Dyes" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
