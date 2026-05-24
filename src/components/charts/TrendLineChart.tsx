"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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

export default function TrendLineChart() {
  return (
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
  );
}
