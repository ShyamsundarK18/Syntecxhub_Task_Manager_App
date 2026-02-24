import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-lg transition-all duration-200 hover:bg-white/15">
      <div className="flex items-center gap-3">
        <img
          src={userInfo?.profileImageUrl}
          alt={userInfo?.name}
          className="h-12 w-12 rounded-full object-cover border border-white/20"
        />

        <div>
          <p className="text-lg font-semibold text-white">{userInfo?.name}</p>
          <p className="text-sm text-gray-400">{userInfo?.email}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="pending"
        />

        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="in-progress"
        />

        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400";
      case "completed":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  };

  return (
    <div
      className={`flex flex-1 text-xs font-medium ${getStatusTagColor()} px-3 py-1 rounded-lg items-center gap-1`}
    >
      <span className="text-[12px] font-semibold">{count}</span>{" "}
      <span>{label}</span>
    </div>
  );
};
