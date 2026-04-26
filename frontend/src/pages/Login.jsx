// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await login(email, password);
//     if (success) navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

//       {/* 🔥 BACKGROUND GLOW BLOBS */}
//       <div className="absolute w-[300px] h-[300px] bg-indigo-500/20 blur-3xl rounded-full top-[-50px] left-[-50px]" />
//       <div className="absolute w-[300px] h-[300px] bg-purple-500/20 blur-3xl rounded-full bottom-[-50px] right-[-50px]" />

//       {/* 🔥 MAIN CONTAINER */}
//       <div className="w-full max-w-md px-4">

//         {/* 🔥 LOGO */}
//         <div className="text-center mb-6">
//           <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide">
//             Uni<span className="text-indigo-400">Care</span>
//           </h1>
//           <p className="text-slate-400 mt-2 text-sm">
//             Smart Complaint Management
//           </p>
//         </div>

//         {/* 🔥 CARD */}
//         <form
//           onSubmit={handleSubmit}
//           className="
//             bg-white/[0.06]
//             backdrop-blur-xl
//             border border-white/[0.1]
//             p-6 sm:p-8
//             rounded-2xl
//             shadow-xl
//             space-y-5
//           "
//         >
//           <h2 className="text-2xl font-semibold text-white text-center">
//             Welcome Back
//           </h2>

//           {/* EMAIL */}
//           <input
//             type="email"
//             placeholder="Email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="
//               w-full
//               px-4 py-3
//               rounded-lg
//               bg-white/[0.05]
//               border border-white/[0.08]
//               text-white
//               outline-none
//               focus:border-indigo-400
//               focus:ring-2 focus:ring-indigo-500/30
//               transition
//             "
//             required
//           />

//           {/* PASSWORD */}
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="
//               w-full
//               px-4 py-3
//               rounded-lg
//               bg-white/[0.05]
//               border border-white/[0.08]
//               text-white
//               outline-none
//               focus:border-indigo-400
//               focus:ring-2 focus:ring-indigo-500/30
//               transition
//             "
//             required
//           />

//           {/* BUTTON */}
//           <button
//             type="submit"
//             className="
//               w-full
//               py-3
//               rounded-lg
//               bg-gradient-to-r from-indigo-500 to-purple-500
//               text-white
//               font-medium
//               hover:scale-[1.02]
//               active:scale-[0.98]
//               transition
//               shadow-lg shadow-indigo-500/20
//             "
//           >
//             Login
//           </button>

//           {/* FOOTER */}
//           <p className="text-sm text-slate-400 text-center">
//             Don’t have an account?{" "}
//             <span
//               onClick={() => navigate("/signup")}
//               className="text-indigo-400 cursor-pointer hover:underline"
//             >
//               Sign up
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
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
