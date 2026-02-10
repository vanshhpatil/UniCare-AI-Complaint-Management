import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Hostel", "Water", "Electricity", "Internet", "General"],
      default: "General",
      index: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
      index: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
      index: true,
    },

    createdBy: {
      type: String, // email / userId
      trim: true,
      index: true,
    },

    /* ================= SLA FIELDS ================= */

    expectedResolutionAt: {
      type: Date, // auto calculated on creation
    },

    resolvedAt: {
      type: Date, // when admin resolves complaint
    },

    slaBreached: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

/* ================= SLA AUTO CALCULATION ================= */
complaintSchema.pre("save", function (next) {
  if (!this.expectedResolutionAt) {
    const created = this.createdAt || new Date();

    let hours = 72; // default Low
    if (this.priority === "High") hours = 24;
    if (this.priority === "Medium") hours = 48;

    this.expectedResolutionAt = new Date(
      created.getTime() + hours * 60 * 60 * 1000
    );
  }

  // SLA breach check
  if (
    this.status !== "Resolved" &&
    this.expectedResolutionAt &&
    new Date() > this.expectedResolutionAt
  ) {
    this.slaBreached = true;
  }

  next();
});

export default mongoose.model("Complaint", complaintSchema);
