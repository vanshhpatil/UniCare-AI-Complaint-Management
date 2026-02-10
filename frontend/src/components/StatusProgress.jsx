export default function StatusProgress({ status }) {
  const steps = ["Pending", "In Progress", "Resolved"];

  return (
    <div className="flex items-center gap-2 mt-3">
      {steps.map((step, index) => {
        const active =
          steps.indexOf(status) >= index;

        return (
          <div
            key={step}
            className={`w-4 h-4 rounded-full ${
              active ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        );
      })}
    </div>
  );
}
