export default function Message({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
        text-white text-sm font-semibold
        p-4 rounded-lg
      `}
    >
      <p>{message}</p>
    </div>
  );
}
