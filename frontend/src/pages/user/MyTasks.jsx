import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axioInstance";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import { FaFileLines } from "react-icons/fa6";
import TaskCard from "../../components/TaskCard";
import toast from "react-hot-toast";

const MyTask = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([
    { label: "All", count: 0 },
    { label: "Pending", count: 0 },
    { label: "In Progress", count: 0 },
    { label: "Completed", count: 0 },
  ]);
  const [filterStatus, setFilterStatus] = useState("All");

  // console.log(tabs)

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks", {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      if (response?.data) {
        setAllTasks(
          response.data?.tasks?.length > 0 ? response.data.tasks : [],
        );
      }

      const statusSummary = response.data?.statusSummary || {};

      setTabs([
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ]);
    } catch (error) {
      console.log("Error fetching tasks: ", error);
    }
  };

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks(filterStatus);

    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className="min-h-screen bg-gray-950 px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              My Tasks
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Track and manage your assigned tasks
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {allTasks?.length > 0 ? (
            allTasks?.map((item) => (
              <div
                key={item._id}
                className="hover:scale-105 transition-transform duration-300"
              >
                <TaskCard
                  title={item.title}
                  description={item.description}
                  priority={item.priority}
                  status={item.status}
                  progress={item.progress}
                  createdAt={item.createdAt}
                  dueDate={item.dueDate}
                  assignedTo={item.assignedTo?.map(
                    (item) => item.profileImageUrl,
                  )}
                  attachmentCount={item.attachments?.length || 0}
                  completedTodoCount={item.completedCount || 0}
                  todoChecklist={item.todoChecklist || []}
                  onClick={() => handleClick(item._id)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20 shadow-lg">
                <FaFileLines className="text-4xl text-indigo-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg font-medium">
                  No tasks found
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  You don’t have any tasks assigned yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyTask;
