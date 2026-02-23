import Image from "next/image";
import { Storefront, User } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import type { ChatContact } from "@/api/chat";

export function ContactListItem({
  contact,
  onClick,
}: {
  contact: ChatContact;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:border-coral/20 transition-all text-left w-full group"
    >
      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 relative">
        <Image
          src={contact.avatar}
          alt={contact.name}
          fill
          sizes="44px"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-coral transition-colors">
            {contact.name}
          </span>
          <span className="text-[10px] text-gray-400 flex-shrink-0">
            {contact.lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            {contact.type === "place" ? (
              <Storefront
                size={11}
                className="text-gray-400 flex-shrink-0"
              />
            ) : (
              <User
                size={11}
                className="text-gray-400 flex-shrink-0"
              />
            )}
            <p className="text-xs text-gray-500 truncate">
              {contact.lastMessage}
            </p>
          </div>
          {contact.unread > 0 && (
            <Badge className="bg-coral text-white text-[10px] h-4.5 min-w-4.5 px-1.5 rounded-full font-bold border-0">
              {contact.unread}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
