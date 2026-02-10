import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  /* 🔁 AUTO REDIRECT IF ALREADY LOGGED IN */
  useEffect(() => {
    if (user) {
      navigate(
        user.role === "admin" ? "/admin/dashboard" : "/dashboard",
        { replace: true }
      );
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // 🔥 ONLY email + password
      await login({ email, password });
      // redirect handled by useEffect
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-md bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-semibold text-slate-100 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-slate-400 mb-6">
          Login to continue
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 text-slate-200"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 text-slate-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 font-semibold shadow-lg shadow-indigo-600/20 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");
//   const [adminCode, setAdminCode] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login, user } = useAuth();
//   const navigate = useNavigate();

//   /* 🔁 AUTO REDIRECT IF ALREADY LOGGED IN */
//   useEffect(() => {
//     if (user) {
//       navigate(
//         user.role === "admin" ? "/admin/dashboard" : "/dashboard",
//         { replace: true }
//       );
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (loading) return; // 🚫 double submit block

//     setLoading(true);
//     setError("");

//     try {
//       await login({
//         email,
//         password,
//         role,
//         adminCode,
//       });
//       // 🔥 redirect handled by useEffect
//     } catch (err) {
//       setError(err.message || "Login failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-slate-900 to-indigo-950 px-4">
//       <div className="w-full max-w-md bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-xl">
//         <h2 className="text-3xl font-semibold text-slate-100 text-center mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-center text-slate-400 mb-6">
//           Login to continue
//         </p>

//         {error && (
//           <p className="mb-4 text-sm text-red-400 text-center">
//             {error}
//           </p>
//         )}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 text-slate-200"
//           />

//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 text-slate-200"
//           >
//             <option value="student">Student</option>
//             <option value="admin">Admin</option>
//           </select>

//           {role === "admin" && (
//             <input
//               type="password"
//               placeholder="Admin Access Code"
//               value={adminCode}
//               onChange={(e) => setAdminCode(e.target.value)}
//               required
//               className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 text-slate-200"
//             />
//           )}

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 text-slate-200"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 font-semibold shadow-lg shadow-indigo-600/20 disabled:opacity-60"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-slate-400 mt-6">
//           Don’t have an account?{" "}
//           <Link
//             to="/"
//             className="text-indigo-400 font-semibold hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
