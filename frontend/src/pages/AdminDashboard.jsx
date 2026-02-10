import { useState } from "react";
import { useComplaints } from "../context/ComplaintContext";
import { useOutletContext } from "react-router-dom";
// ===== EXPORT UTILS =====
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import { saveAs } from "file-saver";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const { complaints, resolveComplaint } = useComplaints();
const { analyticsRef, complaintsRef, reportsRef } = useOutletContext();
/* ================= EXPORT STATE ================= */
// ================= EXPORT STATE =================
const [exportType, setExportType] = useState("pdf");

// ================= EXPORT PDF =================
const handleExportPDF = async () => {
  const element = document.getElementById("admin-dashboard-export");

  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#020617", // slate-950
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("UniCare_Admin_Report.pdf");
};

// ================= EXPORT CSV =================
const handleExportCSV = () => {
  const headers = ["Title", "Category", "Priority", "Status"];
  const rows = filteredComplaints.map(c => [
    c.title,
    c.category,
    c.priority,
    c.status,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map(e => e.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "UniCare_Complaints.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  /* ================= FILTERS ================= */
  const [filter, setFilter] = useState({
    category: "All",
    priority: "All",
    status: "All",
  });

  const filteredComplaints = complaints.filter((c) => {
    return (
      (filter.category === "All" || c.category === filter.category) &&
      (filter.priority === "All" || c.priority === filter.priority) &&
      (filter.status === "All" || c.status === filter.status)
    );
  });
const NeonLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="
          bg-slate-900/95
          border border-indigo-500/60
          rounded-xl px-4 py-3
          backdrop-blur-xl
          text-indigo-300 text-sm
          shadow-[0_0_25px_rgba(99,102,241,0.7)]
          animate-fade-in
        "
      >
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="font-semibold text-indigo-300">
          Complaints: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

  /* ================= PAGINATION ================= */
  const [page, setPage] = useState(1);
  const perPage = 5;

  const paginatedData = filteredComplaints.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const totalPages = Math.ceil(filteredComplaints.length / perPage);

  /* ================= KPIs ================= */
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const pending = complaints.filter(c => c.status === "Pending").length;

  /* ================= PIE + BAR DATA ================= */
  const priorityData = [
    { name: "High", value: complaints.filter(c => c.priority === "High").length },
    { name: "Medium", value: complaints.filter(c => c.priority === "Medium").length },
    { name: "Low", value: complaints.filter(c => c.priority === "Low").length },
  ];

  const PRIORITY_COLORS = {
    High: "#ef4444",
    Medium: "#f59e0b",
    Low: "#10b981",
  };

  const statusData = [
    { name: "Resolved", count: resolved },
    { name: "Pending", count: pending },
  ];

  /* ================= MONTHLY TREND ================= */
  const monthlyMap = {};

  complaints.forEach((c) => {
    if (!c.createdAt) return;
    const date = new Date(c.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    monthlyMap[key] = (monthlyMap[key] || 0) + 1;
  });

  const monthlyData = Object.entries(monthlyMap)
    .map(([key, count]) => {
      const [year, month] = key.split("-");
      return {
        month: new Date(year, month).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        complaints: count,
      };
    })
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <div
  id="admin-dashboard-export"
  className="space-y-10"
>


      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-4xl font-semibold text-white">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 mt-1">
          Manage and resolve student complaints
        </p>
      </div>

      {/* ================= KPI ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Complaints", value: total },
          { label: "Resolved", value: resolved, color: "text-emerald-400" },
          { label: "Pending", value: pending, color: "text-amber-400" },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6"
          >
            <p className="text-slate-400">{kpi.label}</p>
            <p className={`text-4xl font-bold mt-2 ${kpi.color || ""}`}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* ================= PIE + BAR ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Priority Pie */}
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Complaints by Priority
          </h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={priorityData} dataKey="value" innerRadius={60} outerRadius={90}>
                  {priorityData.map(p => (
                    <Cell key={p.name} fill={PRIORITY_COLORS[p.name]} />
                  ))}
                </Pie>
                 <Tooltip content={<NeonLineTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Resolution Status
          </h2>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                
                <Bar dataKey="count" fill="#6366f1" radius={[6,6,0,0]}  activeBar={{
   stroke: "#8b5cf6",     // neon border
    strokeWidth: 3,
    fill: "#818cf8",
  }} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ================= MONTHLY LINE CHART ================= */}
      <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Complaints Trend
        </h2>

        {monthlyData.length === 0 ? (
          <p className="text-slate-400">No data available</p>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>

                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" />
                <YAxis stroke="rgba(255,255,255,0.4)" />
               <Tooltip content={<NeonLineTooltip />} />


                <Line
                  type="monotone"
                  dataKey="complaints"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  filter="url(#glow)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      
  {/* AI INSIGHT CARD */}
  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-5">
    <p className="text-sm text-indigo-300 mb-1">🤖 AI Insight</p>
    <h3 className="text-lg font-semibold text-white">
      Most frequent issue this month
    </h3>
    <p className="text-slate-300 mt-2">
      Hostel complaints are highest among all categories
    </p>
  </div>



      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap gap-4">
        {["category","priority","status"].map((key) => (
         <select
  onChange={(e) => setFilter({ ...filter, [key]: e.target.value })}
  className="
    bg-white/[0.06] text-slate-200
    border border-white/[0.15]
    rounded-xl px-4 py-2
    backdrop-blur-xl
    focus:outline-none
    focus:ring-2 focus:ring-indigo-500
  "
>
  <option value="All" className="bg-slate-900 text-white">
    All {key}
  </option>

  {key === "category" &&
    ["Hostel","Water","Electricity","Internet","General"].map(v => (
      <option key={v} value={v} className="bg-slate-900 text-white">
        {v}
      </option>
  ))}

  {key === "priority" &&
    ["High","Medium","Low"].map(v => (
      <option key={v} value={v} className="bg-slate-900 text-white">
        {v}
      </option>
  ))}

  {key === "status" &&
    ["Pending","Resolved"].map(v => (
      <option key={v} value={v} className="bg-slate-900 text-white">
        {v}
      </option>
  ))}
</select>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          All Complaints
        </h2>

        <table className="w-full text-sm">
          <thead className="text-slate-400 border-b border-white/[0.08]">
            <tr>
              <th className="py-2 text-left">Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((c) => (
              <tr key={c._id} className="border-b border-white/[0.05]">
                <td className="py-3">{c.title}</td>
                <td>{c.category}</td>
                <td>{c.priority}</td>
                <td>{c.status}</td>
                <td>
                  {c.status === "Pending" && (
                    <button
                      onClick={() => resolveComplaint(c._id)}
                      className="bg-emerald-500 px-3 py-1 rounded-md text-xs"
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-indigo-600" : "bg-white/[0.1]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
   {/* ================= REPORTS ================= */}
     {/* ================= REPORTS ================= */}
<section ref={reportsRef}>
  <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6">
    <h2 className="text-xl font-semibold mb-4">Reports & Export</h2>

    <div className="flex gap-4">
      {/* PDF BUTTON */}
      <button
        onClick={() => {
          setExportType("pdf");
          handleExportPDF();
        }}
        className={`
          px-5 py-2 rounded-lg font-semibold transition-all
          ${
            exportType === "pdf"
              ? "bg-indigo-600 shadow-[0_0_25px_rgba(99,102,241,0.6)]"
              : "bg-white/[0.1] hover:bg-white/[0.2]"
          }
        `}
      >
        Export PDF
      </button>

      {/* CSV BUTTON */}
      <button
        onClick={() => {
          setExportType("csv");
          handleExportCSV();
        }}
        className={`
          px-5 py-2 rounded-lg font-semibold transition-all
          ${
            exportType === "csv"
              ? "bg-indigo-600 shadow-[0_0_25px_rgba(99,102,241,0.6)]"
              : "bg-white/[0.1] hover:bg-white/[0.2]"
          }
        `}
      >
        Export CSV
      </button>
    </div>
  </div>
</section>
{/* FOOTER */}
<div className="text-xs text-slate-500 mt-6 text-center">
  Crafted with <span className="text-red-400">❤️</span> by{" "}
  <span className="text-slate-300 font-medium">Vanshh</span>
</div>


    </div>
  );
}
