export function aiSmartFilter(text) {
  const lowerText = text.toLowerCase();

  let category = "General";
  let priority = "Low";

  // 🔥 CATEGORY DETECTION (STRICT + SAFE)
  if (lowerText.includes("water") || lowerText.includes("leak")) {
    category = "Water";
  } else if (
    lowerText.includes("electric") ||
    lowerText.includes("light") ||
    lowerText.includes("power")
  ) {
    category = "Electricity";
  } else if (
    lowerText.includes("internet") ||
    lowerText.includes("wifi") ||
    lowerText.includes("network")
  ) {
    category = "Internet";
  } else if (
    lowerText.includes("hostel") ||
    lowerText.includes("room")
  ) {
    category = "Hostel";
  }

  // 🔥 PRIORITY DETECTION (IMPROVED)
  if (
    lowerText.includes("urgent") ||
    lowerText.includes("immediately") ||
    lowerText.includes("emergency") ||
    lowerText.includes("not working") ||
    lowerText.includes("since") ||
    lowerText.includes("days")
  ) {
    priority = "High";
  } else if (
    lowerText.includes("slow") ||
    lowerText.includes("delay") ||
    lowerText.includes("sometimes")
  ) {
    priority = "Medium";
  }

  return {
    category: category.trim(), // 🔥 VERY IMPORTANT
    priority,
  };
}
