const statusClasses: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-gray-100 text-gray-700",
  CANCELLED_DUE_TO_LEAVE: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-red-100 text-red-800",
};

export function Badge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        statusClasses[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}