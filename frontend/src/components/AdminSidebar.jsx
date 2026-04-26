import { NavLink } from "react-router-dom";

export default function AdminSidebar({ onNavigate }) {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200";

  const active =
    "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-md";

  const inactive =
    "text-slate-300 hover:bg-white/[0.06] hover:text-white";

  return (
    <div className="h-full flex flex-col justify-between">

      {/* 🔥 TOP SECTION */}
      <div className="p-5">

        {/* BRAND */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            UniCare Admin
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Control Panel
          </p>
        </div>

        {/* DIVIDER */}
        <div className="border-b border-white/[0.08] mb-6" />

        {/* SECTION TITLE */}
        <p className="text-[11px] tracking-widest text-slate-500 mb-3">
          MANAGEMENT
        </p>

        {/* NAV */}
        <nav className="space-y-2">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            📊 <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/complaints"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            📁 <span>Complaints</span>
          </NavLink>

          <button
            onClick={() => onNavigate("reports")}
            className={`${base} ${inactive} w-full text-left`}
          >
            📤 <span>Reports</span>
          </button>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            📌 <span>My Profile</span>
          </NavLink>

        </nav>
      </div>

      {/* 🔥 FOOTER */}
      <div className="p-5 border-t border-white/[0.06]">
        <p className="text-xs text-slate-500">
          © 2026 UniCare
        </p>
      </div>

    </div>
  );
}
// import { NavLink } from "react-router-dom";

// export default function AdminSidebar({ onNavigate }) {
//   return (
//   <div className="text-white">
//     TEST SIDEBAR
//   </div>
// );
//   const base =
//     "flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition";

//   const active =
//     "bg-indigo-500/15 text-indigo-300 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.4)]";

//   const inactive =
//     "text-slate-300 hover:bg-white/[0.06] hover:text-white";

//   return (
//     <div
//       className="
//         h-full w-full
//         overflow-y-auto
//         bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950
//         px-4 sm:px-5 py-5 sm:py-6
//         flex flex-col
//       "
//     >
//       <div className="text-white">
//     TEST SIDEBAR
//   </div>
//       {/* BRAND */}
//       <div className="mb-5 sm:mb-6">
//         <h1 className="text-xl sm:text-2xl font-bold text-white">
//           UniCare Admin
//         </h1>
//         <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
//           Control Panel
//         </p>
//       </div>

//       <div className="border-b border-white/[0.08] mb-5 sm:mb-6" />

//       {/* SECTION TITLE */}
//       <p className="text-[10px] sm:text-[11px] tracking-widest text-slate-500 mb-2 sm:mb-3">
//         MANAGEMENT
//       </p>

//       {/* NAV */}
//       <nav className="space-y-1 flex-1 text-sm">

//         <NavLink
//           to="/admin/dashboard"
//           className={({ isActive }) =>
//             `${base} ${isActive ? active : inactive}`
//           }
//         >
//           📊 <span className="truncate">Dashboard</span>
//         </NavLink>

//         <NavLink
//           to="/admin/complaints"
//           className={({ isActive }) =>
//             `${base} ${isActive ? active : inactive}`
//           }
//         >
//           📁 <span className="truncate">Complaints</span>
//         </NavLink>

//         <button
//           onClick={() => onNavigate("reports")}
//           className={`${base} ${inactive} w-full text-left`}
//         >
//           📤 <span className="truncate">Reports</span>
//         </button>

//         <NavLink
//           to="/admin/profile"
//           className={({ isActive }) =>
//             `${base} ${isActive ? active : inactive}`
//           }
//         >
//           📌 <span className="truncate">My Profile</span>
//         </NavLink>

//       </nav>

//       {/* FOOTER */}
//       <div className="text-[10px] sm:text-xs text-slate-500 mt-6">
//         © 2026 UniCare
//       </div>
//     </div>
//   );
// }