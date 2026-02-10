
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  const { user } = useAuth();

  const analyticsRef = useRef(null);
  const complaintsRef = useRef(null);
  const reportsRef = useRef(null);

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
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* FIXED SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 z-30">
        <AdminSidebar onNavigate={handleNavigate} />
      </aside>

      {/* RIGHT SIDE */}
      <div className="ml-64 flex-1 flex flex-col">

        {/* MOVABLE NAVBAR */}
        <Navbar />

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
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
