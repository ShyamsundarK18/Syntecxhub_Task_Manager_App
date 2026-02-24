import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axioInstance";
import DashboardLayout from "../../components/DashboardLayout";
import moment from "moment";
import AvatarGroup from "../../components/AvatarGroup";
import { FaExternalLinkAlt } from "react-icons/fa";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30";
      case "Completed":
        return "text-lime-400 bg-lime-500/10 border border-lime-500/30";
      default:
        return "text-violet-400 bg-violet-500/10 border border-violet-500/30";
    }
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`);
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.log("Error fetching task details: ", error);
    }
  };

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;

      try {
        const response = await axiosInstance.put(`/tasks/${id}/todo`, {
          todoChecklist,
        });

        if (response.status === 200) {
          setTask(response.data?.task || task);
        }
      } catch (error) {
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    }
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsById();
    }
  }, [id]);

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className="min-h-screen bg-gray-950 p-6">
        {task && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  {task?.title}
                </h2>

                <div
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold w-fit ${getStatusTagColor(
                    task?.status,
                  )}`}
                >
                  {task?.status}
                  <span className="ml-2 w-2 h-2 rounded-full bg-current opacity-80"></span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <InfoBox label="Description" value={task?.description} />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <InfoBox label="Priority" value={task?.priority} />

                <InfoBox
                  label="Due Date"
                  value={
                    task?.dueDate
                      ? moment(task?.dueDate).format("Do MMM YYYY")
                      : "N/A"
                  }
                />

                <div>
                  <label className="text-xs font-medium text-gray-400">
                    Assigned To
                  </label>{" "}
                  &nbsp; <br />
                  {task?.assignedTo?.length > 0 && (
                    <span className="text-sm text-gray-300">
                      {task.assignedTo.map((item) => item?.name).join(", ")}
                    </span>
                  )}
                  <div className="mt-1">
                    <AvatarGroup
                      avatars={
                        task?.assignedTo?.map(
                          (item) => item?.profileImageUrl,
                        ) || []
                      }
                      maxVisible={5}
                    />
                  </div>
                </div>
              </div>

              {/* Todo Checklist */}
              <div className="mt-8">
                <label className="text-xs font-medium text-gray-400">
                  Todo Checklist
                </label>

                <div className="mt-3 space-y-2">
                  {task?.todoChecklist?.map((item, index) => (
                    <TodoCheckList
                      key={`todo_${index}`}
                      text={item.text}
                      isChecked={item?.completed}
                      onChange={() => updateTodoChecklist(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Attachments */}
              {task?.attachments?.length > 0 && (
                <div className="mt-8">
                  <label className="text-xs font-medium text-gray-400">
                    Attachments
                  </label>

                  <div className="mt-3 space-y-2">
                    {task?.attachments?.map((link, index) => (
                      <Attachment
                        key={`link_${index}`}
                        link={link}
                        index={index}
                        onClick={() => handleLinkClick(link)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TaskDetails;

/* ---------------- Components ---------------- */

const InfoBox = ({ label, value }) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-400">{label}</label>
      <p className="text-sm font-medium text-gray-200 mt-1">{value || "N/A"}</p>
    </div>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 bg-white/10 border border-white/30 rounded cursor-pointer accent-indigo-500"
      />

      <p
        className={`text-sm ${
          isChecked ? "text-gray-500 line-through" : "text-gray-200"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

const Attachment = ({ link, index, onClick }) => {
  return (
    <div
      className="flex justify-between items-center bg-white/5 border border-white/10 px-4 py-3 rounded-xl cursor-pointer hover:bg-white/10 transition"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 flex-1">
        <span className="text-xs text-gray-500 font-semibold">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>

        <p className="text-xs text-gray-200 break-all">{link}</p>
      </div>

      <FaExternalLinkAlt className="text-gray-400 text-sm" />
    </div>
  );
};
