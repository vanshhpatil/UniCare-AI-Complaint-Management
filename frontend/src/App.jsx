import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";//import
import RaiseComplaint from "./pages/RaiseComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import MyComplaints from "./pages/MyComplaints";
import ComplaintHistory from "./pages/ComplaintHistory";
import FollowUpTasks from "./pages/FollowUpTasks";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminComplaints from "./pages/admin/AdminComplaints";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* STUDENT */}
      <Route
        path="/"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="raise-complaint" element={<RaiseComplaint />} />
        <Route path="my-complaints" element={<MyComplaints />} />
        <Route path="complaint-history" element={<ComplaintHistory />} />
        <Route path="tasks" element={<FollowUpTasks />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ADMIN (🔥 FIXED PROPERLY) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="profile" element={<Profile />} /> {/* 🔥 THIS WAS THE ISSUE */}
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}