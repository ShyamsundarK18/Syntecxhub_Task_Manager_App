import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axioInstance";
import DashboardLayout from "../../components/DashboardLayout";
import { FaFileAlt } from "react-icons/fa";
import UserCard from "../../components/UserCard";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users");

      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      toast.success("User removed successfully!");
      setAllUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      toast.error("Failed to remove user");
      console.log("Error removing user: ", error);
    }
  };

  useEffect(() => {
    getAllUsers();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className="min-h-screen bg-gray-950 px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Team Members
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Manage and monitor your team performance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard
              key={user._id}
              userInfo={user}
              onRemove={handleRemoveUser}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
