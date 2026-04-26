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
      await login({ email, password });
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0b1020] overflow-hidden">

      {/* 🔮 Glow blobs */}
      <div className="absolute w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl top-[-50px] left-[-50px]"></div>
      <div className="absolute w-80 h-80 bg-purple-600/20 rounded-full blur-3xl bottom-[-50px] right-[-50px]"></div>

      {/* ✨ Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:22px_22px]"></div>

      {/* 🔥 Logo */}
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(99,102,241,0.7)] z-10">
        UniCare
      </h1>

      {/* 🧊 Card */}
      <div className="w-full max-w-md bg-white/[0.05] backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)] z-10">

        <h2 className="text-2xl font-semibold text-slate-100 text-center mb-1">
          Welcome Back
        </h2>

        <p className="text-center text-slate-400 mb-6">
          Login to continue
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/[0.04] border border-white/[0.12] rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500/40 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/[0.04] border border-white/[0.12] rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-indigo-500/40 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold shadow-lg shadow-indigo-600/30 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/" className="text-indigo-400 hover:underline">
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
//     if (loading) return;

//     setLoading(true);
//     setError("");

//     try {
//       // 🔥 ONLY email + password
//       await login({ email, password });
//       // redirect handled by useEffect
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
