console.log("🔥 complaintRoutes loaded");

import express from "express";
import {
  createComplaint,
  getComplaints,
  resolveComplaint,
  getAdminAnalytics,
} from "../controllers/complaintController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= CREATE COMPLAINT ================= */
/* Student / Admin */
router.post("/", protect, createComplaint);

/* ================= GET ALL COMPLAINTS ================= */
/* Admin: all | Student: own (handled in controller later) */
router.get("/", protect, getComplaints);

/* ================= RESOLVE COMPLAINT ================= */
/* Admin only */
router.patch("/:id/resolve", protect, adminOnly, resolveComplaint);

/* ================= ADMIN ANALYTICS ================= */
/* Admin only */
router.get("/admin/analytics", protect, adminOnly, getAdminAnalytics);

export default router;

// console.log("🔥 complaintRoutes loaded");

// import express from "express";
// import {
//   createComplaint,
//   getComplaints,
//   resolveComplaint,
//   getAdminAnalytics,
// } from "../controllers/complaintController.js";

// const router = express.Router();

// /* ================= CREATE COMPLAINT ================= */
// router.post("/", createComplaint);

// /* ================= ADMIN ANALYTICS ================= */
// /*
//   GET /api/complaints/admin/analytics
// */
// router.get("/admin/analytics", getAdminAnalytics);

// /* ================= GET ALL COMPLAINTS (FILTERS) ================= */
// /*
//   GET /api/complaints
//   ?status=Pending
//   ?priority=High
//   ?category=Water
// */
// router.get("/", getComplaints);

// /* ================= RESOLVE COMPLAINT ================= */
// /*
//   PATCH /api/complaints/:id/resolve
// */
// router.patch("/:id/resolve", resolveComplaint);

// export default router;
