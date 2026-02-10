import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { aiSmartFilter } from "../utils/aiFilter";
import { useComplaints } from "../context/ComplaintContext";
import { useAuth } from "../context/AuthContext";

export default function RaiseComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { addComplaint } = useComplaints();
  const { user } = useAuth();
  const navigate = useNavigate();

  const aiResult = aiSmartFilter(description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await addComplaint({
      title,
      description,
      category: aiResult.category || "General",
      priority: aiResult.priority || "Low",
      createdBy: user?.email,
    });

    setSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-slate-100 mb-2">
          Raise a Complaint
        </h1>
        <p className="text-slate-400 mb-6">
          Describe your issue and our system will auto-classify it
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Complaint title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 focus:outline-none"
          />

          <textarea
            placeholder="Describe your issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
            className="w-full bg-transparent border border-white/[0.15] rounded-xl px-4 py-3 focus:outline-none"
          />

          {/* AI Preview */}
          <div className="flex gap-4">
            <input
              disabled
              value={aiResult.category || "General"}
              className="w-1/2 bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3"
            />
            <input
              disabled
              value={aiResult.priority || "Low"}
              className="w-1/2 bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600/90 hover:bg-indigo-500 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-600/20 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
}
