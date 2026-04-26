
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children, role }) {
//   const { user, loading } = useAuth();

//   // ⏳ Wait till auth state loads
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // 🔐 Not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // 🔒 Role-based protection
//   if (role && user.role !== role) {
//     return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
//   }

//   return children;
// }
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return children;
}