// import React, { useEffect, useState } from "react";
// import axiosInstance from "../utils/axioInstance";
// import { useDispatch, useSelector } from "react-redux";
// import { signOutSuccess } from "../redux/slice/userSlice";
// import { useNavigate } from "react-router-dom";
// import { SIDE_MENU_DATA, USER_SIDE_MENU_DATA } from "../utils/data";

// const SideMenu = ({ activeMenu }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [SideMenuData, setSideMenuData] = useState([]);
//   const { currentUser } = useSelector((state) => state.user);

//   const handleClick = (route) => {
//     console.log(route);

//     if (route === "logout") {
//       handleLogut();
//       return;
//     }

//     navigate(route);
//   };

//   const handleLogut = async () => {
//     try {
//       const response = await axiosInstance.post("/auth/sign-out");

//       if (response.data) {
//         dispatch(signOutSuccess());

//         navigate("/login");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       setSideMenuData(
//         currentUser?.role === "admin" ? SIDE_MENU_DATA : USER_SIDE_MENU_DATA,
//       );
//     }

//     return () => {};
//   }, [currentUser]);

//   return (
//     <div className="w-64 p-6 h-full flex flex-col lg:border-r lg:border-gray-200">
//       <div className="flex flex-col items-center mb-8">
//         <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden mb-4 border-2 border-blue-200">
//           <img
//             src={currentUser?.profileImageUrl || null}
//             alt="Profile Image"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {currentUser?.role === "admin" && (
//           <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
//             Admin
//           </div>
//         )}

//         <h5 className="text-lg font-semibold text-gray-800">
//           {currentUser?.name || ""}
//         </h5>

//         <p className="text-sm text-gray-500">{currentUser?.email || ""}</p>
//       </div>

//       <div className="flex-1 overscroll-y-auto">
//         {SideMenuData.map((item, index) => (
//           <button
//             key={`menu_${index}`}
//             className={`w-full flex items-center gap-4 text-[15px] ${
//               activeMenu === item.label
//                 ? "text-blue-500 bg-linear-to-r from-blue-50/40 to-blue-100/50"
//                 : ""
//             } py-3 px-6 mb-3 cursor-pointer`}
//             onClick={() => handleClick(item.path)}
//           >
//             <item.icon className="text-2xl" />
//             {item.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SideMenu;

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axioInstance";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, USER_SIDE_MENU_DATA } from "../utils/data";

const SideMenu = ({ activeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [SideMenuData, setSideMenuData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/sign-out");
      if (response.data) {
        dispatch(signOutSuccess());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setSideMenuData(
        currentUser?.role === "admin" ? SIDE_MENU_DATA : USER_SIDE_MENU_DATA,
      );
    }
  }, [currentUser]);

  return (
    <div className="w-64 h-full flex flex-col text-gray-300 p-5 mt-5">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full bg-white/10 overflow-hidden mb-4 border border-white/20">
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
              {currentUser?.name?.charAt(0)}
            </div>
          )}
        </div>

        {currentUser?.role === "admin" && (
          <div className="bg-indigo-500/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full mb-2 border border-indigo-500/30">
            Admin
          </div>
        )}

        <h5 className="text-lg font-semibold text-white">
          {currentUser?.name || ""}
        </h5>

        <p className="text-sm text-gray-400 text-center">
          {currentUser?.email || ""}
        </p>
      </div>

      {/* Menu Items */}
      <div className="flex-1 space-y-2">
        {SideMenuData.map((item, index) => {
          const isActive = activeMenu === item.label;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="text-xl" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
