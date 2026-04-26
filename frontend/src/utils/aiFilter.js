// export function aiSmartFilter(text) {
//   const lowerText = text.toLowerCase();

//   let category = "General";
//   let priority = "Low";

//   // 🔥 CATEGORY DETECTION (STRICT + SAFE)
//   if (lowerText.includes("water") || lowerText.includes("leak")) {
//     category = "Water";
//   } else if (
//     lowerText.includes("electric") ||
//     lowerText.includes("light") ||
//     lowerText.includes("power")
//   ) {
//     category = "Electricity";
//   } else if (
//     lowerText.includes("internet") ||
//     lowerText.includes("wifi") ||
//     lowerText.includes("network")
//   ) {
//     category = "Internet";
//   } else if (
//     lowerText.includes("hostel") ||
//     lowerText.includes("room")
//   ) {
//     category = "Hostel";
//   }

//   // 🔥 PRIORITY DETECTION (IMPROVED)
//   if (
//     lowerText.includes("urgent") ||
//     lowerText.includes("immediately") ||
//     lowerText.includes("emergency") ||
//     lowerText.includes("not working") ||
//     lowerText.includes("since") ||
//     lowerText.includes("days")
//   ) {
//     priority = "High";
//   } else if (
//     lowerText.includes("slow") ||
//     lowerText.includes("delay") ||
//     lowerText.includes("sometimes")
//   ) {
//     priority = "Medium";
//   }

//   return {
//     category: category.trim(), // 🔥 VERY IMPORTANT
//     priority,
//   };
// }
export function aiSmartFilter(text) {
  const lowerText = text.toLowerCase();

  let category = "General";
  let priority = "Low";

  /* ================= CATEGORY DETECTION ================= */

  const categoryKeywords = {
    Water: [
      "water", "leak", "pipeline", "tap", "bathroom", "drain",
      "seepage", "overflow", "tank", "flush"
    ],
    Electricity: [
      "electric", "light", "power", "current", "switch",
      "fan", "ac", "socket", "short circuit", "voltage"
    ],
    Internet: [
      "internet", "wifi", "network", "router",
      "slow speed", "no signal", "disconnect"
    ],
    Hostel: [
      "hostel", "room", "bed", "mess", "warden",
      "cleaning", "washroom", "maintenance"
    ],
    Security: [
      "security", "theft", "fight", "unsafe",
      "harassment", "threat", "danger","fear","not safe"
    ],
    Academic: [
      "exam", "assignment", "result", "marks",
      "faculty", "teacher", "attendance"
    ],
  };

  for (const key in categoryKeywords) {
    if (categoryKeywords[key].some(word => lowerText.includes(word))) {
      category = key;
      break;
    }
  }

  /* ================= PRIORITY DETECTION (WEIGHT BASED) ================= */

  let score = 0;

  const highPriorityWords = [
    "urgent", "immediately", "emergency", "asap",
    "critical", "not working", "completely down",
    "danger", "fire", "electric shock",
    "since many days", "no water", "no power"
  ];

  const mediumPriorityWords = [
    "slow", "delay", "sometimes",
    "not proper", "partial issue",
    "occasionally", "need repair"
  ];

  const lowPriorityWords = [
    "suggestion", "improvement",
    "request", "minor", "small issue"
  ];

  // Increase score
  highPriorityWords.forEach(word => {
    if (lowerText.includes(word)) score += 3;
  });

  mediumPriorityWords.forEach(word => {
    if (lowerText.includes(word)) score += 2;
  });

  lowPriorityWords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });

  // Extra condition: long pending complaint
  if (lowerText.includes("since") || lowerText.includes("days")) {
    score += 2;
  }

  // Final priority decision
  if (score >= 3) {
  priority = "High";
} else if (score >= 2) {
  priority = "Medium";
} else {
  priority = "Low";
}

  return {
    category: category.trim(),
    priority,
  };
}