import dotenv from "dotenv";
dotenv.config(); // ✅ only once (top)

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";


/* ========= DB ========= */
connectDB();

/* ========= APP ========= */
const app = express();

/* ========= MIDDLEWARE ========= */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
/* ========= ROUTES ========= */
app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);

/* ========= TEST ========= */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ========= SERVER ========= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// import dotenv from "dotenv";
// dotenv.config(); // ✅ FIRST

// import express from "express";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";

// import connectDB from "./config/db.js";
// import complaintRoutes from "./routes/complaintRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";

// /* ========= ENV & DB ========= */
// dotenv.config();
// connectDB();

// /* ========= APP INIT ========= */
// const app = express();

// /* ========= MIDDLEWARE ========= */
// app.use(cors());
// app.use(express.json());

// /* ========= ROUTES ========= */
// app.use("/api/complaints", complaintRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/feedback", feedbackRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// /* ========= SERVER ========= */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
