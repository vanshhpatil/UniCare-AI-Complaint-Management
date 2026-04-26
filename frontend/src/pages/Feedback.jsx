import { useState } from "react";
import axios from "axios";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        { message, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feedback submitted 🚀");
      setRating(0);
      setMessage("");
    } catch (err) {
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-white">
          Feedback
        </h1>
        <p className="text-gray-400">
          Help us improve UniCare 🚀
        </p>
      </div>

      {/* CARD */}
      <div className="max-w-xl bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-md transition hover:shadow-indigo-500/20">

        {/* ⭐ Rating */}
        <div className="flex justify-center mb-6 gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-3xl cursor-pointer transition transform ${
                (hover || rating) >= star
                  ? "text-yellow-400 scale-110"
                  : "text-gray-600"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* MESSAGE */}
        <textarea
          placeholder="Write your feedback..."
          className="w-full bg-slate-900 border border-slate-700 text-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg transition 
                     hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 
                     active:scale-95"
        >
          Submit Feedback
        </button>
      </div>
      
    </div>
    
  );
};

export default Feedback;