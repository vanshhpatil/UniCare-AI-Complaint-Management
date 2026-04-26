// import express from "express";
// import { signup, login } from "../controllers/authController.js";

// const router = express.Router();

// /* ================= AUTH ROUTES ================= */
// router.post("/signup", signup);
// router.post("/login", login);

// export default router;
import express from "express";
import { signup, login, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ================= AUTH ROUTES ================= */
router.post("/signup", signup);
router.post("/login", login);

/* ================= PROFILE ================= */
// 🔥 Update name / password / profile picture
router.put("/profile", protect, upload.single("profilePic"), updateProfile);

export default router;