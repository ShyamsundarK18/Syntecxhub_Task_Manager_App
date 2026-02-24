import React from "react";
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

const CustomBarChart = ({ data }) => {
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#22C55E"; // softer green
      case "Medium":
        return "#F59E0B"; // softer amber
      case "High":
        return "#EF4444"; // softer red
      default:
        return "#6366F1";
    }
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-md p-3 shadow-xl rounded-xl border border-white/10">
          <p className="text-xs font-semibold text-indigo-400 mb-1">
            {payload[0].payload.priority}
          </p>

          <p className="text-sm text-gray-300">
            Count:{" "}
            <span className="text-sm font-bold text-white">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid stroke="#374151" strokeDasharray="3 3" />

        <XAxis
          dataKey="priority"
          tick={{ fill: "#D1D5DB", fontSize: 12 }}
          axisLine={{ stroke: "#4B5563" }}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: "#D1D5DB", fontSize: 12 }}
          axisLine={{ stroke: "#4B5563" }}
          tickLine={false}
        />

        <Tooltip content={<CustomToolTip />} cursor={{ fill: "transparent" }} />

        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {data?.map((entry, index) => (
            <Cell key={index} fill={getBarColor(entry)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
