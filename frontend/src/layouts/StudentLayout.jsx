import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function StudentLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="h-screen bg-slate-950 text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">

        {/* NAVBAR FIXED */}
        <Navbar toggleSidebar={() => setSidebarOpen(true)} />

        {/* PAGE CONTENT SCROLL */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
