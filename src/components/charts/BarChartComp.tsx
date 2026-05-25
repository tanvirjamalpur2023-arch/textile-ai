"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const countryData = [
  { country: "China", papers: 380 },
  { country: "India", papers: 120 },
  { country: "USA", papers: 90 },
  { country: "S. Korea", papers: 70 },
  { country: "UK", papers: 50 },
  { country: "Turkey", papers: 40 },
  { country: "Australia", papers: 30 },
  { country: "Pakistan", papers: 30 },
];

export default function BarChartComp() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={countryData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis type="number" tick={{ fontSize: 10 }} stroke="#94a3b8" />
        <YAxis dataKey="country" type="category" tick={{ fontSize: 10 }} stroke="#94a3b8" width={60} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="papers" fill="#10b981" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
