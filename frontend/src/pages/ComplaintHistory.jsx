import { useEffect } from "react";
import { useComplaints } from "../context/ComplaintContext";

export default function ComplaintHistory() {
  const { complaints, fetchComplaints, loading } = useComplaints();

  useEffect(() => {
    fetchComplaints(); // ALL complaints
  }, []);

  const statusStyles = {
    Pending: "bg-yellow-500 text-black",
    Resolved: "bg-green-500 text-black",
    "In Progress": "bg-blue-500 text-white",
  };

  const priorityStyles = {
    High: "text-red-400",
    Medium: "text-yellow-400",
    Low: "text-green-400",
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white">
          Complaint History
        </h1>
        <p className="text-gray-400">
          Track all your complaints and their status
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-indigo-400 animate-pulse">
          Loading complaints...
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && complaints.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center text-gray-400">
          No complaints found 📭
        </div>
      )}

      {/* CARDS */}
      <div className="grid gap-5">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-slate-800 border border-slate-700 p-5 rounded-2xl transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20"
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {c.title}
                </h2>
                <p className="text-gray-400 text-sm">
                  📂 {c.category}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  statusStyles[c.status]
                }`}
              >
                {c.status}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-300 mb-4 leading-relaxed">
              {c.description}
            </p>

            {/* META */}
            <div className="flex flex-wrap justify-between items-center text-sm">
              <div className="flex gap-4">
                <span className={priorityStyles[c.priority]}>
                  ⚡ {c.priority}
                </span>

                <span className="text-indigo-400">
                  📂 {c.category}
                </span>
              </div>

              <span className="text-gray-500">
                🕒 {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}