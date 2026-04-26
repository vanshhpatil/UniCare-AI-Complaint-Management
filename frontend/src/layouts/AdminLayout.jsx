import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRef, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  const analyticsRef = useRef(null);
  const complaintsRef = useRef(null);
  const reportsRef = useRef(null);

  const { user, loading } = useAuth();

  // 🔥 NEW: sidebar toggle (mobile)
const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleNavigate = (section) => {
    const map = {
      analytics: analyticsRef,
      complaints: complaintsRef,
      reports: reportsRef,
    };

    map[section]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // 🔥 close sidebar on mobile after click
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-x-hidden">

      {/* 🔥 MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🔥 SIDEBAR */}
     <aside
  className={`
    fixed top-0 left-0 h-screen w-64 z-30
    transform transition-transform duration-300
    bg-slate-900
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>
  <AdminSidebar onNavigate={handleNavigate} />
</aside>

      {/* 🔥 RIGHT SIDE */}
      <div className="flex-1 flex flex-col md:ml-64 w-full">

        {/* 🔥 NAVBAR + HAMBURGER */}
        <div className="sticky top-0 z-10">


          {/* Hamburger (mobile only) */}
         {/* 🔥 NAVBAR */}
<div className="sticky top-0 z-10">
  <Navbar toggleSidebar={() => setSidebarOpen(true)} />
</div>
        </div>

        {/* 🔥 MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">
          <Outlet
            context={{
              analyticsRef,
              complaintsRef,
              reportsRef,
            }}
          />
        </main>
      </div>
    </div>
  );
}

// import { Outlet, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useRef, useState } from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import Navbar from "../components/Navbar";

// export default function AdminLayout() {
//   const analyticsRef = useRef(null);
//   const complaintsRef = useRef(null);
//   const reportsRef = useRef(null);

//   const { user, loading } = useAuth();

//   // 🔥 NEW: sidebar toggle (mobile)
// const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

//   if (loading) return <div>Loading...</div>;

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" replace />;
//   }

//   const handleNavigate = (section) => {
//     const map = {
//       analytics: analyticsRef,
//       complaints: complaintsRef,
//       reports: reportsRef,
//     };

//     map[section]?.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });

//     // 🔥 close sidebar on mobile after click
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white flex overflow-x-hidden">

//       {/* 🔥 MOBILE OVERLAY */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* 🔥 SIDEBAR */}
//      <aside
//   className={`
//     fixed top-0 left-0 h-screen w-64 z-30 flex-shrink-0
//     transform transition-transform duration-300
//     bg-slate-900
//     ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//     md:translate-x-0
//   `}
// ></aside>

//       {/* 🔥 RIGHT SIDE */}
//       <div className="flex-1 flex flex-col md:ml-64 w-full">

//         {/* 🔥 NAVBAR + HAMBURGER */}
//         <div className="sticky top-0 z-10">
//           <Navbar />

//           {/* Hamburger (mobile only) */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden fixed top-4 left-4 z-40 bg-indigo-600 p-2 rounded-md"
//           >
//             ☰
//           </button>
//         </div>

//         {/* 🔥 MAIN CONTENT */}
//         <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">
//           <Outlet
//             context={{
//               analyticsRef,
//               complaintsRef,
//               reportsRef,
//             }}
//           />
//         </main>
//       </div>
//     </div>
//   );
// }
