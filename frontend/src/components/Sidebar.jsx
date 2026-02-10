// import { NavLink } from "react-router-dom";

// export default function Sidebar() {
//   const baseLink =
//     "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition";
//   const activeLink = "bg-white/[0.12] text-white";
//   const inactiveLink =
//     "text-slate-300 hover:bg-white/[0.08] hover:text-white";

//   return (
//     <aside className="w-64 min-h-screen bg-white/[0.04] backdrop-blur-2xl border-r border-white/[0.08] p-5 relative">
//       <div className="mb-10">
//         <h1 className="text-2xl font-bold text-slate-100">UniCare</h1>
//         <p className="text-xs text-slate-400">Complaint Management</p>
//       </div>

//       <nav className="space-y-2">
//         <NavLink to="/dashboard" className={({isActive}) =>
//           `${baseLink} ${isActive ? activeLink : inactiveLink}`}>📊 Dashboard</NavLink>

//         <NavLink to="/my-complaints" className={({isActive}) =>
//           `${baseLink} ${isActive ? activeLink : inactiveLink}`}>📁 My Complaints</NavLink>

//         <NavLink to="/complaint-history" className={({isActive}) =>
//           `${baseLink} ${isActive ? activeLink : inactiveLink}`}>🕒 Complaint History</NavLink>

//         <NavLink to="/tasks" className={({isActive}) =>
//           `${baseLink} ${isActive ? activeLink : inactiveLink}`}>📝 Follow-up Tasks</NavLink>

//         <NavLink to="/feedback" className={({isActive}) =>
//           `${baseLink} ${isActive ? activeLink : inactiveLink}`}>⭐ Feedback</NavLink>

//         <NavLink to="/profile" className={({isActive}) =>
//           `${baseLink} ${isActive ? activeLink : inactiveLink}`}>⚙️ Profile Settings</NavLink>
//       </nav>

//       <div className="absolute bottom-6 left-5 right-5 text-xs text-slate-500">
//         © 2026 UniCare-Vanshh
//       </div>
//     </aside>
//   );
// }
import { NavLink } from "react-router-dom";

export default function Sidebar({ open, close }) {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition";
  const active = "bg-white/[0.12] text-white";
  const inactive =
    "text-slate-300 hover:bg-white/[0.08] hover:text-white";

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40
        h-screen w-64
        bg-white/[0.04] backdrop-blur-2xl
        border-r border-white/[0.08]
        p-5
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-100">UniCare</h1>
        <p className="text-xs text-slate-400">Complaint Management</p>
      </div>

      <nav className="space-y-2">
        {[
          ["/dashboard", "📊 Dashboard"],
          ["/my-complaints", "📁 My Complaints"],
          ["/complaint-history", "🕒 Complaint History"],
          ["/tasks", "📝 Follow-up Tasks"],
          ["/feedback", "⭐ Feedback"],
          ["/profile", "⚙️ Profile Settings"],
        ].map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            onClick={close}
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-5 text-xs text-slate-500">
        © 2026 UniCare
      </div>
    </aside>
  );
}
