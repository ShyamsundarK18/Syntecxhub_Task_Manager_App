import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  const getBaseStyles = (label) => {
    if (label === "Pending")
      return "bg-yellow-500/10 text-yellow-300 border border-yellow-400/20";

    if (label === "In Progress")
      return "bg-blue-500/10 text-blue-300 border border-blue-400/20";

    if (label === "Completed")
      return "bg-green-500/10 text-green-300 border border-green-400/20";

    return "bg-white/10 text-gray-300 border border-white/20"; // All
  };

  const getActiveStyles = (label) => {
    if (label === "Pending")
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-400/40";

    if (label === "In Progress")
      return "bg-blue-500/20 text-blue-400 border border-blue-400/40";

    if (label === "Completed")
      return "bg-green-500/20 text-green-400 border border-green-400/40";

    return "bg-white/20 text-white border border-white/30";
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(tab.label)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${
              activeTab === tab.label
                ? getActiveStyles(tab.label)
                : getBaseStyles(tab.label)
            }
          `}
          type="button"
        >
          {tab.label}
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
              ${
                activeTab === tab.label
                  ? "bg-white text-gray-900"
                  : "bg-black/20 text-white"
              }
            `}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskStatusTabs;
