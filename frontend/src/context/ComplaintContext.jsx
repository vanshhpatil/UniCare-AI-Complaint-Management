// import { createContext, useContext, useEffect, useState } from "react";

// const ComplaintContext = createContext();

// const API_URL = "http://localhost:5000/api/complaints";

// export const ComplaintProvider = ({ children }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);

//   /* ================= FETCH ALL COMPLAINTS ================= */
//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       setComplaints(data);
//     } catch (err) {
//       console.error("Failed to fetch complaints", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= ADD COMPLAINT ================= */
//   const addComplaint = async (complaint) => {
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(complaint),
//       });

//       const newComplaint = await res.json();
//       setComplaints((prev) => [newComplaint, ...prev]);
//     } catch (err) {
//       console.error("Failed to add complaint", err);
//     }
//   };

//   /* ================= RESOLVE COMPLAINT ================= */
//   const resolveComplaint = async (id) => {
//     try {
//       const res = await fetch(`${API_URL}/${id}/resolve`, {
//         method: "PATCH",
//       });

//       const updated = await res.json();

//       setComplaints((prev) =>
//         prev.map((c) => (c._id === updated._id ? updated : c))
//       );
//     } catch (err) {
//       console.error("Failed to resolve complaint", err);
//     }
//   };

//   /* ================= ON LOAD ================= */
//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   return (
//     <ComplaintContext.Provider
//       value={{
//         complaints,
//         loading,
//         addComplaint,
//         resolveComplaint,
//         fetchComplaints,
//       }}
//     >
//       {children}
//     </ComplaintContext.Provider>
//   );
// };

// export const useComplaints = () => useContext(ComplaintContext);
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ComplaintContext = createContext();

const API_URL = "http://localhost:5000/api/complaints";

export const ComplaintProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH COMPLAINTS ================= */
  const fetchComplaints = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD COMPLAINT ================= */
  const addComplaint = async (complaint) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(complaint),
      });

      const newComplaint = await res.json();
      setComplaints((prev) => [newComplaint, ...prev]);
    } catch (err) {
      console.error("Failed to add complaint", err);
    }
  };

  /* ================= RESOLVE COMPLAINT (ADMIN) ================= */
  const resolveComplaint = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/resolve`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updated = await res.json();

      setComplaints((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
    } catch (err) {
      console.error("Failed to resolve complaint", err);
    }
  };

  /* ================= AUTO LOAD ================= */
  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user]);

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        loading,
        fetchComplaints,
        addComplaint,
        resolveComplaint,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintContext);
