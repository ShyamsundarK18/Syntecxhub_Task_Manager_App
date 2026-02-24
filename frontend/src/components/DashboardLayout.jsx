// import React from "react";
// import { useSelector } from "react-redux";
// import Navbar from "./Navbar";
// import SideMenu from "./SideMenu";

// const DashboardLayout = ({ children, activeMenu }) => {
//   const { currentUser } = useSelector((state) => state.user);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar activeMenu={activeMenu} />

//       {currentUser && (
//         <div className="flex flex-1">
//           <div className="max-[1080px]:hidden">
//             <SideMenu activeMenu={activeMenu} />
//           </div>

//           <div className="grow mx-5">{children}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardLayout;

import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navbar */}
      <Navbar activeMenu={activeMenu} />

      {currentUser && (
        <div className="flex flex-1">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block border-r border-white/10 bg-gray-950">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
