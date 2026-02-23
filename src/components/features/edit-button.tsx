"use client";

import { PencilSimple } from "@phosphor-icons/react";

export function EditButton({
  onClick,
  className = "",
  size = "md",
}: {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        size === "sm" ? "w-7 h-7" : "w-8 h-8"
      } bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-coral hover:text-white transition-all duration-200 border border-gray-100 hover:border-coral text-gray-400 hover:scale-110 active:scale-95 ${className}`}
    >
      <PencilSimple size={size === "sm" ? 12 : 14} weight="bold" />
    </button>
  );
}
