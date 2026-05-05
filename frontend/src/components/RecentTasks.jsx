import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecentTasks = ({ tasks }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Recent Tasks</h3>

        <button
          onClick={() => navigate("/admin/tasks")}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20"
        >
          See More →
        </button>
      </div>

      <div className="p-6">
        {tasks?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Task Name
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Priority
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Created On
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {task.title}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : task.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          task.priority === "High"
                            ? "bg-red-500/20 text-red-400"
                            : task.priority === "Medium"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {moment(task.createdAt).format("MMM Do, YYYY")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            No recent tasks found
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
