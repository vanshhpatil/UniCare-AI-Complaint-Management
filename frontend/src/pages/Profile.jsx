import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";
export default function Profile() {
  const { user, token, setUser } = useAuth();

  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================= LOAD USER DATA ================= */
  useEffect(() => {
  if (user) {
    setName(user.name || "");

    if (user.profilePic) {
      setPreview(
        `${import.meta.env.VITE_API_URL.replace('/api/auth','')}/${user.profilePic}`
      );
    }
  }
}, [user]);

  /* ================= IMAGE HANDLER ================= */
  const handleImage = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    const objectUrl = URL.createObjectURL(selected);
    setPreview(objectUrl);

    // cleanup (important)
    return () => URL.revokeObjectURL(objectUrl);
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (showPasswordFields) {
        if (!currentPassword) {
          return alert("Enter current password");
        }
        if (newPassword.length < 6) {
          return alert("Password must be at least 6 characters");
        }
        if (newPassword !== confirmPassword) {
          return alert("Passwords do not match");
        }
      }

      const formData = new FormData();
      formData.append("name", name);

      if (file) formData.append("profilePic", file);

      if (showPasswordFields) {
        formData.append("currentPassword", currentPassword);
        formData.append("newPassword", newPassword);
      }

      const res = await fetch(`${API}/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message);
      }

      /* 🔥 IMPORTANT FIX */
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      // reset password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordFields(false);

      alert("Profile updated ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-hidden">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      <div className="bg-slate-800 w-full max-w-xl mx-auto p-4 sm:p-6 rounded-2xl border border-slate-700">

        {/* PROFILE PIC */}
       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500">
            <img
              src={preview || "/default-avatar.png"}
              className="w-full h-full object-cover"
            />
          </div>

          <input type="file" onChange={handleImage} />
        </div>

        {/* NAME */}
        <div className="mb-4">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 p-2 rounded"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label>Email</label>
          <input
            value={user?.email}
            disabled
            className="w-full bg-slate-900 p-2 rounded opacity-60"
          />
        </div>

        {/* ROLE */}
        <div className="mb-4">
          <label>Role</label>
          <input
            value={user?.role}
            disabled
            className="w-full bg-slate-900 p-2 rounded opacity-60"
          />
        </div>

        {/* PASSWORD TOGGLE */}
        <button
          onClick={() => setShowPasswordFields(!showPasswordFields)}
          className="mb-4 text-indigo-400"
        >
          🔒 Change Password
        </button>

        {/* PASSWORD FIELDS */}
        {showPasswordFields && (
          <>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-slate-900 p-2 rounded mb-3"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-900 p-2 rounded mb-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-900 p-2 rounded mb-3"
            />
          </>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleUpdate}
          className="w-full bg-indigo-600 py-3 rounded mt-4"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
           {/* FOOTER */}
      <div className="text-[10px] sm:text-xs text-gray-500 mt-8 text-center">
        Crafted with ❤️ by <span className="text-white">Vanshh</span>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// export default function Profile() {

// const { user, token, setUser } = useAuth(); // 👈 ADD THIS
//   const [name, setName] = useState(user?.name || "");
//   const [preview, setPreview] = useState(user?.profilePic || "");
//   const [file, setFile] = useState(null);

//   // 🔥 password states
//   const [showPasswordFields, setShowPasswordFields] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [loading, setLoading] = useState(false);

//   const handleImage = (e) => {
//     const selected = e.target.files[0];
//     setFile(selected);
//     if (selected) setPreview(URL.createObjectURL(selected));
//   };

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);

//       // 🔒 VALIDATION
//       if (showPasswordFields) {
//         if (!currentPassword) {
//           return alert("Enter current password");
//         }
//         if (newPassword !== confirmPassword) {
//           return alert("Passwords do not match");
//         }
//       }

//       const formData = new FormData();
//       formData.append("name", name);

//       if (file) formData.append("profilePic", file);

//       if (showPasswordFields) {
//         formData.append("currentPassword", currentPassword);
//         formData.append("newPassword", newPassword);
//       }

//       const res = await fetch("http://localhost:5000/api/auth/profile", {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

// if (!res.ok) {
//   return alert(data.message);
// }

// // ✅ UPDATE BOTH
// setUser(data.user); // 🔥 NAVBAR FIX
// localStorage.setItem("user", JSON.stringify(data.user));
// alert("Profile updated ✅");
//     } catch (err) {
//       console.error(err);
//       alert("Update failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 text-white max-w-3xl mx-auto">
//       <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

//       <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">

//         {/* PROFILE PIC */}
//         <div className="flex items-center gap-6 mb-6">
//           <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500">
//             {preview ? (
//              <img
//   src={
//     preview
//       ? preview.startsWith("blob:")
//         ? preview
//         : `http://localhost:5000/${preview}`
//       : "/default-avatar.png"
//   }
// />
//             ) : (
//               <div className="flex items-center justify-center h-full">👤</div>
//             )}
//           </div>

//           <input type="file" onChange={handleImage} />
//         </div>

//         {/* NAME */}
//         <div className="mb-4">
//           <label>Name</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full bg-slate-900 p-2 rounded"
//           />
//         </div>

//         {/* EMAIL */}
//         <div className="mb-4">
//           <label>Email</label>
//           <input
//             value={user?.email}
//             disabled
//             className="w-full bg-slate-900 p-2 rounded opacity-60"
//           />
//         </div>

//         {/* ROLE */}
//         <div className="mb-4">
//           <label>Role</label>
//           <input
//             value={user?.role}
//             disabled
//             className="w-full bg-slate-900 p-2 rounded opacity-60"
//           />
//         </div>

//         {/* CHANGE PASSWORD BUTTON */}
//         <button
//           onClick={() => setShowPasswordFields(!showPasswordFields)}
//           className="mb-4 text-indigo-400"
//         >
//           🔒 Change Password
//         </button>

//         {/* PASSWORD SECTION */}
//         {showPasswordFields && (
//           <>
//             <input
//               type="password"
//               placeholder="Current Password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               className="w-full bg-slate-900 p-2 rounded mb-3"
//             />

//             <input
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full bg-slate-900 p-2 rounded mb-3"
//             />

//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full bg-slate-900 p-2 rounded mb-3"
//             />
//           </>
//         )}

//         {/* SUBMIT */}
//         <button
//           onClick={handleUpdate}
//           className="w-full bg-indigo-600 py-3 rounded mt-4"
//         >
//           {loading ? "Updating..." : "Update Profile"}
//         </button>
//       </div>
//     </div>
//   );
// }