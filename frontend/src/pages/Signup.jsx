import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [adminCode, setAdminCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // ✅ Basic frontend validation
  if (!email.includes("@")) {
    setError("Please enter a valid email");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    // 🔥 VERY IMPORTANT: await
    await signup({
      name,
      email,
      password,
      role,
      adminCode,
    });

    // ✅ Redirect AFTER signup success
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    setError(err.message || "Signup failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-md bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-xl">

        <h2 className="text-3xl font-semibold text-slate-100 text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-slate-400 mb-6">
          Sign up to get started
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 focus:outline-none text-slate-200"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 focus:outline-none text-slate-200"
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 text-slate-200"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          {/* Admin Code */}
          {role === "admin" && (
            <input
              type="password"
              placeholder="Admin Access Code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              required
              className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 focus:outline-none text-slate-200"
            />
          )}

          {/* Year */}
          {role === "student" && (
            <input
              type="number"
              placeholder="Current Year (1–5)"
              value={year}
              min="1"
              max="5"
              required
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 focus:outline-none text-slate-200"
            />
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 focus:outline-none text-slate-200"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 focus:outline-none text-slate-200"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 font-semibold shadow-lg shadow-indigo-600/20"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
