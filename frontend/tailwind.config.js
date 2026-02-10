export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out",
      },
    },
  },
  plugins: [],
  extend: {
  colors: {
    bg: "#0b1020",
    panel: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.08)",
    primary: "#6366f1",
    accent: "#818cf8",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
}

};
