import Feedback from "../models/Feedback.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;
    const user = req.user;

    if (!message || !rating) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const feedback = await Feedback.create({
      user: user.id,
      email: user.email,
      name: user.name,
      message,
      rating,
    });

    const stars = "⭐".repeat(rating);

    const html = `
      <h2>New Feedback Received 🚀</h2>
      <p><strong>User:</strong> ${user.name} (${user.email})</p>
      <p><strong>Rating:</strong> ${stars}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail({
      subject: "UniCare Feedback",
      html,
    });

    res.status(201).json({ msg: "Feedback submitted" });
  } catch (err) {
    res.status(500).json({ msg: "Error submitting feedback" });
  }
};