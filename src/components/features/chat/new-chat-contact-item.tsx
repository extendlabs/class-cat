import Image from "next/image";
import { ChatCircle, Storefront, User } from "@phosphor-icons/react";
import type { NewContactResult } from "@/api/chat";

export function NewChatContactItem({
  result,
  onClick,
}: {
  result: NewContactResult;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:border-coral/20 transition-all text-left w-full group"
    >
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
        <Image
          src={result.avatar}
          alt={result.name}
          fill
          sizes="44px"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-gray-900 truncate block group-hover:text-coral transition-colors">
          {result.name}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          {result.type === "place" ? (
            <Storefront size={11} className="text-gray-400" />
          ) : (
            <User size={11} className="text-gray-400" />
          )}
          <span className="text-[11px] text-gray-400 capitalize">
            {result.type === "place" ? "Place" : "Instructor"}
          </span>
        </div>
      </div>
      <ChatCircle
        size={18}
        className="text-gray-300 group-hover:text-coral transition-colors flex-shrink-0"
      />
    </button>
  );
}
