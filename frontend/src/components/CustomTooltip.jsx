import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/90 backdrop-blur-md p-3 shadow-xl rounded-xl border border-white/10">
        <p className="text-xs font-semibold text-indigo-400 mb-1">
          {payload[0].name}
        </p>

        <p className="text-sm text-gray-300">
          Count:{" "}
          <span className="text-sm font-bold text-white">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
