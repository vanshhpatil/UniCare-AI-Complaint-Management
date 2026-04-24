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
