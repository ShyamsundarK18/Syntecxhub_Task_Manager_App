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

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/export/users", {
        responseType: "blob",
      });

      // create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading user-details report: ", error);
      toast.error("Error downloading user-details report. Please try again!");
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

          <button
            type="button"
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl shadow-lg hover:opacity-90 transition duration-200"
            onClick={handleDownloadReport}
          >
            <FaFileAlt className="text-lg" />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
