import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function FollowUp({ complaintId, onUpdate }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const { token } = useAuth();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("message", message);
    if (image) formData.append("image", image);

    await fetch(
      `http://localhost:5000/api/complaints/${complaintId}/followup`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    setMessage("");
    setImage(null);
    onUpdate();
  };

  return (
    <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl mt-4">
      <textarea
        placeholder="Add follow-up..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full bg-slate-900 p-3 rounded-lg text-white"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mt-2 text-sm text-gray-400"
      />

      <button
        onClick={handleSubmit}
        className="mt-3 bg-indigo-600 px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </div>
  );
} 
