import Complaint from "../models/Complaint.js";

/* ================= ADMIN ANALYTICS ================= */
export const getAdminAnalytics = async (req, res) => {
  try {
    const complaints = await Complaint.find();

    const total = complaints.length;

    const resolved = complaints.filter(c => c.status === "Resolved");
    const pending = complaints.filter(c => c.status === "Pending");

    /* Avg Resolution Time (hours) */
    const avgResolutionTime =
      resolved.reduce((acc, c) => {
        const diff =
          (new Date(c.resolvedAt) - new Date(c.createdAt)) / 36e5;
        return acc + diff;
      }, 0) / (resolved.length || 1);

    /* Most problematic category */
    const categoryCount = {};
    complaints.forEach(c => {
      categoryCount[c.category] = (categoryCount[c.category] || 0) + 1;
    });

    const mostProblematicCategory = Object.entries(categoryCount).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];

    res.json({
      total,
      resolved: resolved.length,
      pending: pending.length,
      avgResolutionTime: avgResolutionTime.toFixed(1),
      mostProblematicCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
