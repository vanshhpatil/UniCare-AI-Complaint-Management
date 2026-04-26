// import { createContext, useContext, useEffect, useState } from "react";
// import { ADMIN_ACCESS_CODE } from "../config/admin";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // 🔁 Auto login on refresh
//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     if (stored) {
//       setUser(JSON.parse(stored));
//     }
//   }, []);

//   /* ================= SIGNUP ================= */
//   const signup = ({ name, email, password, role, adminCode }) => {
//     if (role === "admin" && adminCode !== ADMIN_ACCESS_CODE) {
//       throw new Error("Invalid Admin Access Code");
//     }

//     const newUser = {
//       name,
//       email,
//       password, // ✅ STORE PASSWORD
//       role,
//     };

//     localStorage.setItem("user", JSON.stringify(newUser));
//     setUser(newUser); // ✅ AUTO LOGIN
//   };

//   /* ================= LOGIN ================= */
//   const login = ({ email, password, role, adminCode }) => {
//     const stored = JSON.parse(localStorage.getItem("user"));

//     if (!stored) {
//       throw new Error("No account found. Please sign up.");
//     }

//     if (stored.email !== email || stored.password !== password) {
//       throw new Error("Invalid email or password");
//     }

//     if (role === "admin" && adminCode !== ADMIN_ACCESS_CODE) {
//       throw new Error("Invalid Admin Access Code");
//     }

//     setUser(stored);
//   };

//   /* ================= LOGOUT ================= */
//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= AUTO LOGIN ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  /* ================= SIGNUP ================= */
  const signup = async (formData) => {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    setUser(data.user);
    setToken(data.token);
  };

  /* ================= LOGIN ================= */
  const login = async (formData) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    setUser(data.user);
    setToken(data.token);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup,
        login,
        logout,
        loading,
        isAdmin: user?.role === "admin",
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
