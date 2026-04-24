import { useEffect } from "react";
import { useComplaints } from "../context/ComplaintContext";

export default function MyComplaints() {
  const { complaints, loading, fetchComplaints, resolveComplaint, isAdmin } =
    useComplaints();

  /* 🔄 Auto refresh every 10 sec */
  useEffect(() => {
    fetchComplaints("?status=Pending");

    const interval = setInterval(() => {
      fetchComplaints("?status=Pending");
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  /* 🎨 Styles */
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
          My Complaints
        </h1>
        <p className="text-gray-400">
          View all your pending complaints
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-indigo-400 animate-pulse">
          Loading complaints...
        </p>
      )}

      {/* EMPTY */}
      {!loading && complaints?.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center text-gray-400">
          No pending complaints 🚀
        </div>
      )}

      {/* CARDS */}
      <div className="grid gap-5">
        {complaints?.map((c) => (
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
                  statusStyles[c.status] || "bg-gray-500"
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
              <div className="flex gap-4 flex-wrap">
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

              <span className="text-gray-500">
                🕒 {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* ADMIN ACTION */}
            {isAdmin && c.status !== "Resolved" && (
              <button
                onClick={() => resolveComplaint(c._id)}
                className="mt-4 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm transition"
              >
                Mark Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
// import { useEffect } from "react";
// import { useComplaints } from "../context/ComplaintContext";

// export default function MyComplaints() {
//   const { complaints, loading, fetchComplaints, resolveComplaint, isAdmin } =
//     useComplaints();

//   /* 🔄 Auto refresh every 10 sec (real-time feel) */
//   useEffect(() => {
//   fetchComplaints("?status=Pending");

//   const interval = setInterval(() => {
//     fetchComplaints("?status=Pending");
//   }, 10000);

//   return () => clearInterval(interval);
// }, []);

//   if (loading) return <p className="text-white p-6">Loading...</p>;

//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-2xl font-bold mb-6">My Complaints</h1>

//       <div className="grid gap-4">
//         {complaints.map((c) => (
//           <div
//             key={c._id}
//             className="bg-white/[0.06] border border-white/[0.08] rounded-xl p-5 shadow-md"
//           >
//             {/* Title */}
//             <h2 className="text-lg font-semibold">{c.title}</h2>

//             {/* Description */}
//             <p className="text-sm text-gray-300 mt-1">{c.description}</p>

//             {/* Tags */}
//             <div className="flex flex-wrap gap-2 mt-3 text-sm">
//               <span className="px-2 py-1 bg-blue-500/20 rounded">
//                 {c.category}
//               </span>

//               <span
//                 className={`px-2 py-1 rounded ${
//                   c.priority === "High"
//                     ? "bg-red-500/20"
//                     : c.priority === "Medium"
//                     ? "bg-yellow-500/20"
//                     : "bg-green-500/20"
//                 }`}
//               >
//                 {c.priority}
//               </span>

//               <span
//                 className={`px-2 py-1 rounded ${
//                   c.status === "Resolved"
//                     ? "bg-green-500/20"
//                     : "bg-yellow-500/20"
//                 }`}
//               >
//                 {c.status}
//               </span>

//               {c.slaBreached && (
//                 <span className="px-2 py-1 bg-red-600/30 rounded">
//                   SLA Breached 🚨
//                 </span>
//               )}
//             </div>

//             {/* Dates */}
//             <div className="text-xs text-gray-400 mt-3">
//               Created: {new Date(c.createdAt).toLocaleString()}
//               <br />
//               Expected:{" "}
//               {c.expectedResolutionAt
//                 ? new Date(c.expectedResolutionAt).toLocaleString()
//                 : "N/A"}
//             </div>

//             {/* Admin Action */}
//             {isAdmin && c.status !== "Resolved" && (
//               <button
//                 onClick={() => resolveComplaint(c._id)}
//                 className="mt-3 bg-green-600 px-3 py-1 rounded"
//               >
//                 Mark Resolved
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }