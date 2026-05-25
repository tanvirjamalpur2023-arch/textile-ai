"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const topicDistribution = [
  { name: "Sustainable", value: 35, color: "#10b981" },
  { name: "AI/ML", value: 20, color: "#6366f1" },
  { name: "Natural Dyes", value: 15, color: "#f59e0b" },
  { name: "Nano", value: 12, color: "#ec4899" },
  { name: "Smart Textiles", value: 10, color: "#3b82f6" },
  { name: "Others", value: 8, color: "#94a3b8" },
];

export default function PieChartComp() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={topicDistribution}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {topicDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
