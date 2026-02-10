// import Complaint from "../models/Complaint.js";

// /* ================= CREATE COMPLAINT ================= */
// export const createComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.create(req.body);
//     res.status(201).json(complaint);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// /* ================= GET ALL COMPLAINTS (WITH FILTERS) ================= */
// /*
//   Query params supported:
//   ?status=Pending
//   ?priority=High
//   ?category=Water
// */
// export const getComplaints = async (req, res) => {
//   try {
//     const { status, priority, category } = req.query;

//     const filter = {};
//     if (status) filter.status = status;
//     if (priority) filter.priority = priority;
//     if (category) filter.category = category;

//     const complaints = await Complaint.find(filter).sort({
//       createdAt: -1,
//     });

//     res.status(200).json(complaints);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= RESOLVE COMPLAINT ================= */
// export const resolveComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.findById(req.params.id);

//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }

//     complaint.status = "Resolved";
//     complaint.resolvedAt = new Date();
//     complaint.slaBreached =
//       complaint.expectedResolutionAt &&
//       complaint.resolvedAt > complaint.expectedResolutionAt;

//     await complaint.save();

//     res.status(200).json(complaint);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ================= ADMIN ANALYTICS ================= */
// export const getAdminAnalytics = async (req, res) => {
//   try {
//     const total = await Complaint.countDocuments();
//     const resolved = await Complaint.countDocuments({ status: "Resolved" });
//     const pending = await Complaint.countDocuments({ status: "Pending" });
//     const slaBreached = await Complaint.countDocuments({ slaBreached: true });

//     /* ===== Most problematic category ===== */
//     const topCategory = await Complaint.aggregate([
//       { $group: { _id: "$category", count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//       { $limit: 1 },
//     ]);

//     /* ===== Avg resolution time (hours) ===== */
//     const avgResolution = await Complaint.aggregate([
//       { $match: { status: "Resolved", resolvedAt: { $exists: true } } },
//       {
//         $project: {
//           diffHours: {
//             $divide: [
//               { $subtract: ["$resolvedAt", "$createdAt"] },
//               1000 * 60 * 60,
//             ],
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           avgHours: { $avg: "$diffHours" },
//         },
//       },
//     ]);

//     /* ===== Monthly trend ===== */
//     const monthlyTrend = await Complaint.aggregate([
//       {
//         $group: {
//           _id: {
//             year: { $year: "$createdAt" },
//             month: { $month: "$createdAt" },
//           },
//           count: { $sum: 1 },
//         },
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1 } },
//     ]);

//     res.status(200).json({
//       total,
//       resolved,
//       pending,
//       slaBreached,
//       mostProblematicCategory: topCategory[0]?._id || "N/A",
//       avgResolutionHours: avgResolution[0]?.avgHours?.toFixed(2) || 0,
//       monthlyTrend,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import Complaint from "../models/Complaint.js";

/* ================= CREATE COMPLAINT ================= */
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority, createdBy } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      createdBy,
    });

    // SLA auto-calculated in model (pre-save hook)
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ================= GET ALL COMPLAINTS (FILTERS) ================= */
/*
  ?status=Pending
  ?priority=High
  ?category=Water
*/
export const getComplaints = async (req, res) => {
  try {
    const { status, priority, category } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const complaints = await Complaint.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= RESOLVE COMPLAINT ================= */
export const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "Resolved";
    complaint.resolvedAt = new Date();

    // SLA breach check at resolve time
    complaint.slaBreached =
      complaint.expectedResolutionAt &&
      complaint.resolvedAt > complaint.expectedResolutionAt;

    await complaint.save();

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ADMIN ANALYTICS ================= */
export const getAdminAnalytics = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const slaBreached = await Complaint.countDocuments({ slaBreached: true });

    /* ===== Most problematic category ===== */
    const topCategory = await Complaint.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    /* ===== Average resolution time (hours) ===== */
    const avgResolution = await Complaint.aggregate([
      { $match: { status: "Resolved", resolvedAt: { $exists: true } } },
      {
        $project: {
          diffHours: {
            $divide: [
              { $subtract: ["$resolvedAt", "$createdAt"] },
              1000 * 60 * 60,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          avgHours: { $avg: "$diffHours" },
        },
      },
    ]);

    /* ===== Monthly complaints trend ===== */
    const monthlyTrend = await Complaint.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      total,
      resolved,
      pending,
      slaBreached,
      mostProblematicCategory: topCategory[0]?._id || "N/A",
      avgResolutionHours: avgResolution[0]?.avgHours
        ? avgResolution[0].avgHours.toFixed(2)
        : 0,
      monthlyTrend,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
