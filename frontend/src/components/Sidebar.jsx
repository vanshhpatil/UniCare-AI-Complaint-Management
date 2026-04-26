import { NavLink } from "react-router-dom";

export default function Sidebar({ open, close }) {
  const base =
    "flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition";

  const active = "bg-white/[0.12] text-white";

  const inactive =
    "text-slate-300 hover:bg-white/[0.08] hover:text-white";

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40
        h-full w-64
        bg-white/[0.04] backdrop-blur-2xl
        border-r border-white/[0.08]
        px-4 sm:px-5 py-5 sm:py-6
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        overflow-y-auto
      `}
    >
      {/* BRAND */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
          UniCare
        </h1>
        <p className="text-[10px] sm:text-xs text-slate-400">
          Complaint Management
        </p>
      </div>

      {/* NAV */}
      <nav className="space-y-1 sm:space-y-2 text-sm">
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
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="mt-10 text-[10px] sm:text-xs text-slate-500">
        © 2026 UniCare
      </div>
    </aside>
  );
}