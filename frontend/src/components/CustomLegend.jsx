import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {payload?.map((entry, index) => (
        <div className="flex items-center gap-2" key={`legend-${index}`}>
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>

          <span className="text-sm text-gray-300 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
