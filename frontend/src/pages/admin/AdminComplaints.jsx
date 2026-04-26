import { useEffect } from "react";
import { useComplaints } from "../../context/ComplaintContext";

export default function AdminComplaints() {
  const { complaints, fetchComplaints, loading, resolveComplaint } =
    useComplaints();

  useEffect(() => {
    fetchComplaints();
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
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-5 sm:mb-6">
        All Complaints (Admin)
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-indigo-400 animate-pulse text-sm sm:text-base">
          Loading complaints...
        </p>
      )}

      {/* EMPTY */}
      {!loading && complaints?.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 p-5 sm:p-6 rounded-xl text-center text-gray-400 text-sm sm:text-base">
          No complaints found 📭
        </div>
      )}

      {/* CARDS */}
      <div className="grid gap-4 sm:gap-5">
        {complaints?.map((c) => (
          <div
            key={c._id}
            className="bg-slate-800 border border-slate-700 p-4 sm:p-5 rounded-2xl hover:scale-[1.02] transition"
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
                  statusStyles[c.status]
                }`}
              >
                {c.status}
              </span>
            </div>

            {/* DESC */}
            <p className="text-gray-300 text-sm sm:text-base mb-3 leading-relaxed">
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
              </div>

              <span className="text-gray-500 text-xs sm:text-sm">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* ACTION */}
            {c.status !== "Resolved" && (
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
// import { useEffect } from "react";
// import { useComplaints } from "../../context/ComplaintContext";

// export default function AdminComplaints() {
//   const { complaints, fetchComplaints, loading, resolveComplaint } =
//     useComplaints();

//   useEffect(() => {
//     fetchComplaints(); // 🔥 ALL complaints (admin)
//   }, []);

//   const statusStyles = {
//     Pending: "bg-yellow-500 text-black",
//     Resolved: "bg-green-500 text-black",
//     "In Progress": "bg-blue-500 text-white",
//   };

//   const priorityStyles = {
//     High: "text-red-400",
//     Medium: "text-yellow-400",
//     Low: "text-green-400",
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-semibold text-white mb-6">
//         All Complaints (Admin)
//       </h1>

//       {loading && (
//         <p className="text-indigo-400 animate-pulse">
//           Loading complaints...
//         </p>
//       )}

//       {!loading && complaints?.length === 0 && (
//         <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl text-center text-gray-400">
//           No complaints found 📭
//         </div>
//       )}

//       <div className="grid gap-5">
//         {complaints?.map((c) => (
//           <div
//             key={c._id}
//             className="bg-slate-800 border border-slate-700 p-5 rounded-2xl hover:scale-[1.02] transition"
//           >
//             {/* TOP */}
//             <div className="flex justify-between mb-3">
//               <div>
//                 <h2 className="text-lg font-semibold text-white">
//                   {c.title}
//                 </h2>
//                 <p className="text-gray-400 text-sm">
//                   📂 {c.category}
//                 </p>
//               </div>

//               <span
//                 className={`px-3 py-1 text-xs rounded-full ${
//                   statusStyles[c.status]
//                 }`}
//               >
//                 {c.status}
//               </span>
//             </div>

//             {/* DESC */}
//             <p className="text-gray-300 mb-3">{c.description}</p>

//             {/* META */}
//             <div className="flex justify-between text-sm">
//               <div className="flex gap-4">
//                 <span className={priorityStyles[c.priority]}>
//                   ⚡ {c.priority}
//                 </span>
//                 <span className="text-indigo-400">
//                   📂 {c.category}
//                 </span>
//               </div>

//               <span className="text-gray-500">
//                 {new Date(c.createdAt).toLocaleDateString()}
//               </span>
//             </div>

//             {/* ADMIN ACTION */}
//             {c.status !== "Resolved" && (
//               <button
//                 onClick={() => resolveComplaint(c._id)}
//                 className="mt-4 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm"
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