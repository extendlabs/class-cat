import Image from "next/image";
import { ArrowLeft } from "@phosphor-icons/react";
import type { ChatContact } from "@/api/chat";

export function ChatHeader({
  activeChat,
  onBack,
}: {
  activeChat: ChatContact;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
      <button
        onClick={onBack}
        className="p-1.5 rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-colors"
      >
        <ArrowLeft size={18} weight="bold" />
      </button>
      <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 relative">
        <Image
          src={activeChat.avatar}
          alt={activeChat.name}
          fill
          sizes="44px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {activeChat.name}
        </p>
        <p className="text-[11px] text-gray-400 capitalize">
          {activeChat.type === "place" ? "Place" : "Instructor"}
        </p>
      </div>
    </div>
  );
}
