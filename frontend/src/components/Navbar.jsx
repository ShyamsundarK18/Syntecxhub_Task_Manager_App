// import React, { useState } from "react";
// import { MdClose, MdMenu } from "react-icons/md";
// import SideMenu from "./SideMenu";

// const Navbar = ({ activeMenu }) => {
//   const [openSideMenu, setOpenSideMenu] = useState(false);

//   return (
//     <div className="bg-white shadow-sm sticky top-0 z-10 p-4 flex items-center justify-between">
//       <div className="flex items-center space-x-4">
//         <button
//           className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors lg:hidden"
//           onClick={() => setOpenSideMenu(!openSideMenu)}
//         >
//           {openSideMenu ? (
//             <MdClose className="text-2xl" />
//           ) : (
//             <MdMenu className="text-2xl" />
//           )}
//         </button>
//       </div>

//       <h2 className="text-xl font-semibold text-gray-800">Expense Tracker</h2>

//       {openSideMenu && (
//         <div className="fixed inset-0 z-40 flex lg:hidden">
//           <div className="relative z-50 w-72 h-full bg-white shadow-xl">
//             <button
//               className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
//               onClick={() => setOpenSideMenu(false)}
//             >
//               <MdClose className="text-2xl" />
//             </button>

//             <div className="pt-16">
//               <SideMenu activeMenu={activeMenu} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { MdClose, MdMenu } from "react-icons/md";
// import SideMenu from "./SideMenu";

// const Navbar = ({ activeMenu }) => {
//   const [openSideMenu, setOpenSideMenu] = useState(false);

//   return (
//     <>
//       {/* Top Navbar */}
//       <div className="bg-white/2 backdrop-blur-3xl border-b border-white/20 sticky top-0 z-40 px-6 py-5 flex items-center justify-between">
//         {/* Mobile Menu Button */}
//         <button
//           className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition lg:hidden"
//           onClick={() => setOpenSideMenu(!openSideMenu)}
//         >
//           {openSideMenu ? (
//             <MdClose className="text-2xl" />
//           ) : (
//             <MdMenu className="text-2xl" />
//           )}
//         </button>

//         {/* App Title */}
//         <h2 className="text-xl font-bold text-white tracking-wide">
//           Expense Tracker
//         </h2>

//         {/* Right spacer */}
//         {/* <div className="w-8 lg:hidden" /> */}
//       </div>

//       {/* Mobile Sidebar Drawer */}
//       {openSideMenu && (
//         <div className="fixed inset-0 z-50 flex lg:hidden">
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setOpenSideMenu(false)}
//           />

//           {/* Drawer */}
//           <div className="relative w-72 h-full bg-gray-950 border-r border-white/10 shadow-2xl p-6">
//             <SideMenu activeMenu={activeMenu} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white/5 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-40 px-6 py-[30px] flex items-center justify-between">
        {/* LEFT: Mobile Menu Button */}
        <button
          className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition lg:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <MdClose className="text-2xl" />
          ) : (
            <MdMenu className="text-2xl" />
          )}
        </button>

        {/* RIGHT: Page Title */}
        <h2 className="text-lg absolute left-1/2 font-semibold text-white tracking-wide ml-auto">
          {activeMenu || "Dashboard"}
        </h2>
      </div>

      {/* Mobile Sidebar Drawer */}
      {openSideMenu && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenSideMenu(false)}
          />

          {/* Drawer */}
          <div className="relative w-72 h-full bg-gray-950 border-r border-white/10 shadow-2xl p-6">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
