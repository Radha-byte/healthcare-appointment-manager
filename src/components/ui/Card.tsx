import { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 ${className}`}
      {...props}
    />
  );
}