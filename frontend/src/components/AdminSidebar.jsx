import { NavLink } from "react-router-dom";

export default function AdminSidebar({ onNavigate }) {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition";

  const active =
    "bg-indigo-500/15 text-indigo-300 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.4)]";

  const inactive =
    "text-slate-300 hover:bg-white/[0.06] hover:text-white";

  return (
    <aside className="
      h-full
      w-64
      bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950
      border-r border-white/[0.08]
      px-5 py-6
      flex flex-col
    ">
      {/* BRAND */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">UniCare Admin</h1>
        <p className="text-xs text-slate-400 mt-1">Control Panel</p>
      </div>

      <div className="border-b border-white/[0.08] mb-6" />

      {/* SECTION TITLE */}
      <p className="text-[11px] tracking-widest text-slate-500 mb-3">
        MANAGEMENT
      </p>

      {/* NAV */}
      <nav className="space-y-1 flex-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          📊 Dashboard
        </NavLink>

       

        <button
          onClick={() => onNavigate("complaints")}
          className={`${base} ${inactive} w-full text-left`}
        >
          📁 Complaints
        </button>

        <button
          onClick={() => onNavigate("reports")}
          className={`${base} ${inactive} w-full text-left`}
        >
          📤 Reports
        </button>

         <button
          onClick={() => onNavigate("analytics")}
          className={`${base} ${inactive} w-full text-left`}
        >
          📌My Profile
        </button>
      </nav>

      {/* FOOTER */}
      <div className="text-xs text-slate-500 mt-6">
        © 2026 UniCare
      </div>
    </aside>
  );
}
