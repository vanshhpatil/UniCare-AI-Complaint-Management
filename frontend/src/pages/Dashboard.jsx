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
    return <p className="text-slate-400 p-4">Loading dashboard...</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          Track your complaints and stay updated ✨
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/raise-complaint")}
        className="
          w-full sm:w-auto
          mb-6 sm:mb-8
          bg-indigo-600 hover:bg-indigo-500
          px-5 sm:px-6 py-2.5 sm:py-3
          rounded-xl font-semibold
          text-sm sm:text-base
          shadow-lg shadow-indigo-500/20
          transition
        "
      >
        + Raise Complaint
      </button>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {[
          { label: "Total", value: total },
          { label: "Resolved", value: resolved, color: "text-green-400" },
          { label: "Pending", value: pending, color: "text-yellow-400" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-slate-800 border border-slate-700 p-4 sm:p-6 rounded-2xl hover:scale-[1.02] transition shadow-md"
          >
            <p className="text-gray-400 text-sm">{card.label}</p>
            <p className={`text-3xl sm:text-4xl font-bold mt-2 ${card.color || ""}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-slate-800 border border-slate-700 p-4 sm:p-6 rounded-2xl mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl text-white mb-4">
          Complaints by Category
        </h2>

        {total === 0 ? (
          <p className="text-gray-400 text-sm">No complaints yet</p>
        ) : (
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis allowDecimals={false} stroke="#aaa" />

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

                <Bar
                  dataKey="complaints"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                  activeBar={{
                    fill: "#818cf8",
                    stroke: "#a78bfa",
                    strokeWidth: 2,
                  }}
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
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-5">
          My Active Tickets
        </h2>

        {activeComplaints.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No active complaints 🎉
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-5">
            {activeComplaints.map((c) => (
              <div
                key={c._id}
                className="bg-slate-800 border border-slate-700 p-4 sm:p-5 rounded-2xl transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20"
              >
                {/* TOP */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                  
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                      {c.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      📂 {c.category}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full w-fit ${
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

                {/* DESC */}
                <p className="text-gray-300 text-sm sm:text-base mb-3">
                  {c.description}
                </p>

                {/* STATUS */}
                <StatusProgress status={c.status} />

                {/* DATE */}
                <p className="text-gray-500 text-xs sm:text-sm mt-3">
                  🕒 {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="text-[10px] sm:text-xs text-gray-500 mt-8 text-center">
        Crafted with ❤️ by <span className="text-white">Vanshh</span>
      </div>
    </div>
  );
}
