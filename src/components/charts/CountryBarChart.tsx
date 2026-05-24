"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

export default function CountryBarChart() {
  return (
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
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
