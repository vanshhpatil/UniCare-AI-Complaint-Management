import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="
        w-full
        flex items-center justify-between
        px-4 sm:px-6 md:px-8
        py-3
        border-b border-white/[0.08]
        bg-slate-950/80 backdrop-blur
        relative
      "
    >
      {/* 🔥 LEFT SIDE */}
      <div className="flex items-center gap-3 min-w-0">

        {/* ✅ MOBILE HAMBURGER */}
        {toggleSidebar && (
  <button
    onClick={toggleSidebar}
    className="
      md:hidden
      bg-indigo-600
      hover:bg-indigo-500
      p-2.5
      rounded-lg
      text-white
      transition
      flex items-center justify-center
      shadow-md
    "
  >
    ☰
  </button>
)}

        {/* ✅ WELCOME TEXT */}
        <div className="text-sm sm:text-base text-slate-300 truncate">
          Welcome,{" "}
          <span className="text-white font-medium">
            {user?.name}
          </span>
        </div>

      </div>

      {/* 🔥 RIGHT SIDE */}
      <div className="flex items-center gap-2 sm:gap-4">

        <button
          onClick={handleLogout}
          className="
            bg-red-500
            px-3 sm:px-4
            py-1.5 sm:py-2
            rounded-md
            text-xs sm:text-sm
            text-white
            hover:bg-red-400
            transition
          "
        >
          Logout
        </button>

      </div>
    </div>
  );
}
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Navbar({ toggleSidebar }) {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();              
//     navigate("/login");   
//   };

//   return (
//     <div className="
//       w-full
//       flex items-center justify-between
//       px-4 sm:px-6 md:px-8
//       py-3
//       border-b border-white/[0.08]
//       bg-slate-950/80 backdrop-blur
//     ">

//       {/* LEFT SIDE (WELCOME) */}
//       <div className="text-sm sm:text-base text-slate-300 truncate">
//         Welcome, <span className="text-white font-medium">{user?.name}</span>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex items-center gap-2 sm:gap-4">

//         {/* LOGOUT */}
//         <button
//           onClick={handleLogout}
//           className="
//             bg-red-500
//             px-3 sm:px-4
//             py-1.5 sm:py-2
//             rounded-md
//             text-xs sm:text-sm
//             text-white
//             hover:bg-red-400
//             transition
//           "
//         >
//           Logout
//         </button>

//       </div>
//     </div>
//   );
// }