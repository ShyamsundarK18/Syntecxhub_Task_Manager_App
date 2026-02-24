import React from "react";
import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart margin={{ top: 10, right: 20, left: 20, bottom: 40 }}>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          outerRadius={100}
          innerRadius={75}
          paddingAngle={3}
          dataKey="count"
          nameKey="status"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />

        <Legend
          verticalAlign="bottom"
          align="center"
          content={<CustomLegend />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
