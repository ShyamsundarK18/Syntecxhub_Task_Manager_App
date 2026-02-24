import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axioInstance";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import { FaFileLines } from "react-icons/fa6";
import TaskCard from "../../components/TaskCard";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  console.log(tabs);

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

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.log("Error fetching tasks: ", error);
    }
  };

  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/export/tasks", {
        responseType: "blob",
      });

      // create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "tasks_details.xlsx");
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading task-details report: ", error);
      toast.error("Error downloading task-details report. Please try again!");
    }
  };

  useEffect(() => {
    getAllTasks(filterStatus);

    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu={"Manage Task"}>
      <div className="min-h-screen bg-gray-950 px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center justify-between gap-4 w-full md:w-auto ">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Task Management
            </h2>{" "}
            <button
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:opacity-90 active:scale-95"
              onClick={handleDownloadReport}
              type="button"
            >
              Download Report
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />

            {/* <button
              className="hidden md:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:opacity-90 active:scale-95"
              onClick={handleDownloadReport}
              type="button"
            >
              <span>Download</span>
            </button> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTasks?.map((item, index) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => handleClick(item)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
