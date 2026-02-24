import React, { memo } from "react";
import Progress from "./Progress";
import moment from "moment";
import AvatarGroup from "./AvatarGroup";
import { FaFileLines } from "react-icons/fa6";

const TaskCard = memo(
  ({
    title,
    description,
    priority,
    status,
    progress,
    createdAt,
    dueDate,
    assignedTo,
    attachmentCount,
    completedTodoCount,
    todoChecklist,
    onClick,
  }) => {
    const getStatusTagColor = () => {
      switch (status) {
        case "Pending":
          return "bg-yellow-500/20 text-yellow-400";
        case "In Progress":
          return "bg-blue-500/20 text-blue-400";
        case "Completed":
          return "bg-green-500/20 text-green-400";
        default:
          return "bg-yellow-500/20 text-yellow-400";
      }
    };

    const getPriorityTagColor = () => {
      switch (priority) {
        case "High":
          return "bg-red-500/20 text-red-400";
        case "Medium":
          return "bg-orange-500/20 text-orange-400";
        case "Low":
          return "bg-green-500/20 text-green-400";
        default:
          return "bg-green-500/20 text-green-400";
      }
    };

    return (
      <div
        onClick={onClick}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-lg cursor-pointer hover:bg-white/15 transition-all duration-200"
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusTagColor()}`}
          >
            {status}
          </span>

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityTagColor()}`}
          >
            {priority}
          </span>
        </div>

        <p className="text-lg font-semibold text-white line-clamp-2">{title}</p>

        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{description}</p>

        <p className="text-sm text-gray-300 mt-2">
          Task Done:
          <span className="ml-1 font-semibold text-white">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>

        <div className="mt-3">
          <Progress progress={progress} status={status} />
        </div>

        <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
          <div>
            <p>Start</p>
            <p className="text-gray-300 font-medium">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>

          <div>
            <p>Due</p>
            <p className="text-gray-300 font-medium">
              {moment(dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <AvatarGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-indigo-500/20 px-3 py-1 rounded-lg">
              <FaFileLines className="text-indigo-400 text-sm" />
              <span className="text-xs text-white">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default memo(TaskCard);
