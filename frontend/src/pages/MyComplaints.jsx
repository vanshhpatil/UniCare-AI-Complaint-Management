import { useEffect } from "react";
import { useComplaints } from "../context/ComplaintContext";

export default function MyComplaints() {
  const { complaints, loading, fetchComplaints, resolveComplaint, isAdmin } =
    useComplaints();

  useEffect(() => {
    fetchComplaints("?status=Pending");

    const interval = setInterval(() => {
      fetchComplaints("?status=Pending");
    }, 10000);

    return () => clearInterval(interval);
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
    <div className="p-4 sm:p-6">
      
      {/* HEADER */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
          My Complaints
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          View all your pending complaints
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-indigo-400 animate-pulse text-sm sm:text-base">
          Loading complaints...
        </p>
      )}

      {/* EMPTY */}
      {!loading && complaints?.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 p-5 sm:p-6 rounded-xl text-center text-gray-400 text-sm sm:text-base">
          No pending complaints 🚀
        </div>
      )}

      {/* CARDS */}
      <div className="grid gap-4 sm:gap-5">
        {complaints?.map((c) => (
          <div
            key={c._id}
            className="bg-slate-800 border border-slate-700 p-4 sm:p-5 rounded-2xl transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20"
          >
            {/* TOP */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
              
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                  {c.title}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">
                  📂 {c.category}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full w-fit ${
                  statusStyles[c.status] || "bg-gray-500"
                }`}
              >
                {c.status}
              </span>
            </div>

            {/* DESC */}
            <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
              {c.description}
            </p>

            {/* META */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <span className={priorityStyles[c.priority]}>
                  ⚡ {c.priority}
                </span>

                <span className="text-indigo-400">
                  📂 {c.category}
                </span>

                {c.slaBreached && (
                  <span className="text-red-400">
                    🚨 SLA Breached
                  </span>
                )}
              </div>

              <span className="text-gray-500 text-xs sm:text-sm">
                🕒 {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* ACTION */}
            {isAdmin && c.status !== "Resolved" && (
              <button
                onClick={() => resolveComplaint(c._id)}
                className="mt-4 w-full sm:w-auto bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm transition"
              >
                Mark Resolved
              </button>
            )}
          </div>
        ))}
      </div>
           {/* FOOTER */}
      <div className="text-[10px] sm:text-xs text-gray-500 mt-8 text-center">
        Crafted with ❤️ by <span className="text-white">Vanshh</span>
      </div>
    </div>
  );
}