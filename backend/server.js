// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import complaintRoutes from "./routes/complaintRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// app.use("/api/admin", adminRoutes);

// dotenv.config();
// connectDB();

// const app = express();

// /* ========= MIDDLEWARE (ORDER MAT BADALNA) ========= */
// app.use(cors());
// app.use(express.json());

// /* ========= ROUTES ========= */
// app.use("/api/complaints", complaintRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// /* ========= SERVER ========= */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import connectDB from "./config/db.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

/* ========= ENV & DB ========= */
dotenv.config();
connectDB();

/* ========= APP INIT ========= */
const app = express();

/* ========= MIDDLEWARE ========= */
app.use(cors());
app.use(express.json());

/* ========= ROUTES ========= */
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ========= SERVER ========= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
