"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ViewsChart({
  data,
}: {
  data: { date: string; views: number }[];
}) {
  return (
    <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
      <h2 className="text-sm font-medium mb-4">Views Over Time</h2>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* X Axis */}
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              stroke="currentColor"
            />

            {/* Y Axis */}
            <YAxis tick={{ fontSize: 10 }} stroke="currentColor" />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid #333",
                fontSize: "12px",
              }}
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
