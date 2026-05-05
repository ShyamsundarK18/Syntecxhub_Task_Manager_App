import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../../components/DashboardLayout";
import axiosInstance from "../../utils/axioInstance";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import RecentTasks from "../../components/RecentTasks";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const UserDashboard = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [dashboardData, setDashboardData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/tasks/user-dashboard-data");

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.log("Error fetching user dashboard data: ", error);
    }
  };

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="min-h-screen bg-gray-950 p-6 space-y-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Welcome! {currentUser?.name}
              </h2>
              <p className="text-indigo-100 mt-2 text-sm">
                Here’s what’s happening with your tasks today.
              </p>

              <p className="text-blue-100 mt-1">
                {moment().format("dddd Do MMMM YYYY")}
              </p>
            </div>
          </div>
        </div>

        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
              <p className="text-gray-400 text-sm">Total Tasks</p>
              <h3 className="text-3xl font-bold text-white mt-2">
                {dashboardData?.charts?.taskDistribution?.All || 0}
              </h3>
            </div>

            <div className="bg-yellow-500/10 backdrop-blur-lg border border-yellow-400/20 rounded-2xl p-6 shadow-lg">
              <p className="text-yellow-300 text-sm">Pending</p>
              <h3 className="text-3xl font-bold text-yellow-400 mt-2">
                {dashboardData?.charts?.taskDistribution?.Pending || 0}
              </h3>
            </div>

            <div className="bg-blue-500/10 backdrop-blur-lg border border-blue-400/20 rounded-2xl p-6 shadow-lg">
              <p className="text-blue-300 text-sm">In Progress</p>
              <h3 className="text-3xl font-bold text-blue-400 mt-2">
                {dashboardData?.charts?.taskDistribution?.InProgress || 0}
              </h3>
            </div>

            <div className="bg-green-500/10 backdrop-blur-lg border border-green-400/20 rounded-2xl p-6 shadow-lg">
              <p className="text-green-300 text-sm">Completed</p>
              <h3 className="text-3xl font-bold text-green-400 mt-2">
                {dashboardData?.charts?.taskDistribution?.Completed || 0}
              </h3>
            </div>
          </div>
        )}

        {/* Recent Task Section */}
        <RecentTasks tasks={dashboardData?.recentTasks} />
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
