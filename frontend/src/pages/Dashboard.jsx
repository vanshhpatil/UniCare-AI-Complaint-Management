// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useComplaints } from "../context/ComplaintContext";
// import StatusProgress from "../components/StatusProgress";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function Dashboard() {
//   const { user } = useAuth();
//   const { complaints, loading } = useComplaints();
//   const navigate = useNavigate();

//   /* ================= STUDENT FILTER ================= */
//   const myComplaints = complaints.filter(
//     (c) => c.createdBy === user?.email
//   );

//   /* ================= STATS ================= */
//   const total = myComplaints.length;
//   const resolved = myComplaints.filter(
//     (c) => c.status === "Resolved"
//   ).length;
//   const pending = myComplaints.filter(
//     (c) => c.status === "Pending"
//   ).length;

//   const activeComplaints = myComplaints.filter(
//     (c) => c.status === "Pending"
//   );

//   /* ================= CHART DATA ================= */
//   const getCount = (cat) =>
//     myComplaints.filter(
//       (c) =>
//         c.category &&
//         c.category.toLowerCase() === cat.toLowerCase()
//     ).length;

//   const chartData = [
//     { name: "Hostel", complaints: getCount("Hostel") },
//     { name: "Water", complaints: getCount("Water") },
//     { name: "Electricity", complaints: getCount("Electricity") },
//     { name: "Internet", complaints: getCount("Internet") },
//   ];

//   if (loading) {
//     return <p className="text-slate-400">Loading dashboard...</p>;
//   }

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <div className="mb-10">
//         <h1 className="text-4xl font-semibold text-slate-100">
//           Dashboard
//         </h1>
//         <div className="mb-10">
//   <p className="text-slate-400 mt-1">
//     Track your complaints, raise new issues, and stay updated ✨
//   </p>
// </div>

//       </div>

//       {/* ================= ACTION ================= */}
//       <button
//         onClick={() => navigate("/raise-complaint")}
//         className="mb-10 bg-indigo-600/90 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-600/20"
//       >
//         + Raise Complaint
//       </button>

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         {[
//           { label: "Total Complaints", value: total },
//           { label: "Resolved", value: resolved, color: "text-emerald-400" },
//           { label: "Pending", value: pending, color: "text-amber-400" },
//         ].map((card, i) => (
//           <div
//             key={i}
//             className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 shadow-xl"
//           >
//             <p className="text-slate-400">{card.label}</p>
//             <p className={`text-4xl font-bold mt-2 ${card.color || ""}`}>
//               {card.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* ================= CHART ================= */}
//       <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 shadow-xl mb-12">
//         <h2 className="text-xl font-semibold text-slate-200 mb-4">
//           Complaints by Category
//         </h2>

//         {total === 0 ? (
//           <p className="text-slate-400">No complaints yet</p>
//         ) : (
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//   <BarChart data={chartData}>
//     <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
//     <YAxis
//       stroke="rgba(255,255,255,0.3)"
//       allowDecimals={false}
//       tickCount={6}
//       domain={[0, 'dataMax + 1']}
//     />
    
//     <Bar
//   dataKey="complaints"
//   fill="#6366f1"
//   radius={[6, 6, 0, 0]}
//   activeBar={{
//     stroke: "#8b5cf6",     // neon border
//     strokeWidth: 3,
//     fill: "#818cf8",       // slightly brighter on hover
//   }}
// />

//   </BarChart>
// </ResponsiveContainer>

//           </div>
//         )}
//       </div>

//       {/* ================= ACTIVE TICKETS ================= */}
//       <div>
//         <h2 className="text-2xl font-semibold text-slate-200 mb-5">
//           My Active Tickets
//         </h2>

//         {activeComplaints.length === 0 ? (
//           <p className="text-slate-400">No active complaints 🎉</p>
//         ) : (
//           <div className="space-y-5">
//             {activeComplaints.map((c) => (
//               <div
//                 key={c._id}
//                 className="bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 shadow-xl"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold text-slate-100">
//                     {c.title}
//                   </h3>

//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       c.priority === "High"
//                         ? "bg-red-500/90"
//                         : c.priority === "Medium"
//                         ? "bg-amber-400/90 text-black"
//                         : "bg-emerald-500/90"
//                     }`}
//                   >
//                     {c.priority}
//                   </span>
//                 </div>

//                 <p className="text-sm text-slate-400 mt-1">
//                   Category: {c.category}
//                 </p>

//                 <StatusProgress status={c.status} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="text-xs text-slate-500 mt-6 text-center">
//   Crafted with <span className="text-red-400">❤️</span> by{" "}
//   <span className="text-slate-300 font-medium">Vanshh</span>
// </div>
//     </>
//   );
// }
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useComplaints } from "../context/ComplaintContext";
import StatusProgress from "../components/StatusProgress";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
   Tooltip, 
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const { complaints, loading } = useComplaints();
  const navigate = useNavigate();

  const myComplaints = complaints.filter(
    (c) => c.createdBy === user?.email
  );

  const total = myComplaints.length;
  const resolved = myComplaints.filter((c) => c.status === "Resolved").length;
  const pending = myComplaints.filter((c) => c.status === "Pending").length;

  const activeComplaints = myComplaints.filter(
    (c) => c.status === "Pending"
  );

  const getCount = (cat) =>
    myComplaints.filter(
      (c) =>
        c.category &&
        c.category.toLowerCase() === cat.toLowerCase()
    ).length;

  const chartData = [
    { name: "Hostel", complaints: getCount("Hostel") },
    { name: "Water", complaints: getCount("Water") },
    { name: "Electricity", complaints: getCount("Electricity") },
    { name: "Internet", complaints: getCount("Internet") },
  ];

  if (loading) {
    return <p className="text-slate-400">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Track your complaints and stay updated ✨
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/raise-complaint")}
        className="mb-8 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition"
      >
        + Raise Complaint
      </button>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total", value: total },
          { label: "Resolved", value: resolved, color: "text-green-400" },
          { label: "Pending", value: pending, color: "text-yellow-400" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:scale-[1.02] transition shadow-md"
          >
            <p className="text-gray-400">{card.label}</p>
            <p className={`text-4xl font-bold mt-2 ${card.color || ""}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl mb-10">
        <h2 className="text-xl text-white mb-4">Complaints by Category</h2>

        {total === 0 ? (
          <p className="text-gray-400">No complaints yet</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
  <BarChart data={chartData}>
    
    {/* X Axis */}
    <XAxis dataKey="name" stroke="#aaa" />

    {/* Y Axis */}
    <YAxis allowDecimals={false} stroke="#aaa" />

    {/* 🔥 TOOLTIP (hover pe count show karega) */}
    <Tooltip
      cursor={{ fill: "rgba(99,102,241,0.2)" }}
      contentStyle={{
        backgroundColor: "#1e293b",
        border: "none",
        borderRadius: "10px",
        color: "#fff",
      }}
      formatter={(value) => [`${value} complaints`, "Count"]}
    />

    {/* 🔥 BAR */}
    <Bar
      dataKey="complaints"
      fill="#6366f1"
      radius={[8, 8, 0, 0]}

      // 🔥 hover highlight
      activeBar={{
        fill: "#818cf8",
        stroke: "#a78bfa",
        strokeWidth: 2,
      }}

      // 🔥 number on top of bar
      label={{
        position: "top",
        fill: "#c7d2fe",
        fontSize: 12,
      }}
    />
  </BarChart>
</ResponsiveContainer>
          </div>
        )}
      </div>

      {/* ACTIVE TICKETS */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-5">
          My Active Tickets
        </h2>

        {activeComplaints.length === 0 ? (
          <p className="text-gray-400">No active complaints 🎉</p>
        ) : (
          <div className="grid gap-5">
            {activeComplaints.map((c) => (
              <div
                key={c._id}
                className="bg-slate-800 border border-slate-700 p-5 rounded-2xl transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20"
              >
                {/* TOP */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {c.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      📂 {c.category}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      c.priority === "High"
                        ? "bg-red-500 text-black"
                        : c.priority === "Medium"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500 text-black"
                    }`}
                  >
                    {c.priority}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-300 mb-3">{c.description}</p>

                {/* STATUS BAR */}
                <StatusProgress status={c.status} />

                {/* DATE */}
                <p className="text-gray-500 text-sm mt-3">
                  🕒 {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="text-xs text-gray-500 mt-8 text-center">
        Crafted with ❤️ by <span className="text-white">Vanshh</span>
      </div>
    </div>
  );
}