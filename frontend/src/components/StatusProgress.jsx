// export default function StatusProgress({ status }) {
//   const steps = ["Pending", "In Progress", "Resolved"];

//   return (
//     <div className="flex items-center gap-2 mt-3">
//       {steps.map((step, index) => {
//         const active =
//           steps.indexOf(status) >= index;

//         return (
//           <div
//             key={step}
//             className={`w-4 h-4 rounded-full ${
//               active ? "bg-green-500" : "bg-gray-400"
//             }`}
//           />
//         );
//       })}
//     </div>
//   );
// }
export default function StatusProgress({ status }) {
  const steps = ["Pending", "In Progress", "Resolved"];

  return (
    <div className="flex items-center gap-2 mt-3">
      {steps.map((step, index) => {
        const active = steps.indexOf(status) >= index;

        return (
          <div key={step} className="relative group">
            
            {/* Dot */}
            <div
              className={`w-4 h-4 rounded-full cursor-pointer ${
                active ? "bg-green-500" : "bg-gray-400"
              }`}
            />

            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 
                            opacity-0 group-hover:opacity-100
                            transition duration-200
                            bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
              {step}
            </div>

          </div>
        );
      })}
    </div>
  );
}
