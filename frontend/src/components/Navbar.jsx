import { useAuth } from "../context/AuthContext";

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white/[0.04] backdrop-blur-2xl border-b border-white/[0.08] flex items-center justify-between px-6">
      
      <div className="text-slate-200 text-sm">
        Welcome, <span className="font-semibold">{user?.name || user?.email}</span>
      </div>

      <button
        onClick={logout}
        className="bg-red-500/90 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold"
      >
        Logout
      </button>
    </header>
  );
}
// import { useAuth } from "../context/AuthContext";

// export default function Navbar({ toggleSidebar }) {
//   const { user, logout } = useAuth();

//   return (
//     <header
//       className="
//         h-16
//         bg-white/[0.04]
//         backdrop-blur-2xl
//         border-b border-white/[0.08]
//         flex items-center justify-between
//         px-6
//         sticky top-0 z-30
//       "
//     >
//       {/* LEFT */}
//       <div className="flex items-center gap-4">
//         {/* ☰ Hamburger (mobile + desktop both) */}
//         <button
//           onClick={toggleSidebar}
//           className="
//             text-2xl
//             hover:text-indigo-400
//             transition
//           "
//           aria-label="Toggle Sidebar"
//         >
//           ☰
//         </button>

//         <div className="text-sm text-slate-300">
//           Welcome,{" "}
//           <span className="font-semibold text-white">
//             {user?.name || "Admin"}
//           </span>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <button
//         onClick={logout}
//         className="
//           bg-red-500/90
//           hover:bg-red-500
//           px-4 py-2
//           rounded-lg
//           text-sm font-semibold
//         "
//       >
//         Logout
//       </button>
//     </header>
//   );
// }
