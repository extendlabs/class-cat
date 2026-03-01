"use client";

import { UsersThree } from "@phosphor-icons/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types/chat";

export function ConversationListItem({
  conversation,
  onClick,
}: {
  conversation: Conversation;
  onClick: () => void;
}) {
  const isGroup = conversation.type === "group";
  const isPending = conversation.status === "pending";
  const preview = conversation.lastMessage;

  const timeLabel = preview
    ? formatRelativeTime(preview.timestamp)
    : "";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-left group"
    >
      {isGroup ? (
        <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
          <UsersThree size={20} weight="fill" className="text-coral" />
        </div>
      ) : (
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage
            src={conversation.participants[1]?.avatar ?? conversation.participants[0]?.avatar}
            alt={conversation.name}
          />
          <AvatarFallback className="text-sm bg-coral/10 text-coral">
            {conversation.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            "text-sm font-semibold text-gray-900 truncate",
            conversation.unreadCount > 0 && "text-gray-900"
          )}>
            {conversation.name}
          </span>
          <span className="text-[10px] text-gray-400 flex-shrink-0">
            {timeLabel}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className={cn(
            "text-xs truncate",
            conversation.unreadCount > 0 ? "text-gray-700 font-medium" : "text-gray-400"
          )}>
            {preview?.text ?? "No messages yet"}
          </p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isPending && (
              <span className="text-[9px] font-bold uppercase tracking-wide text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                Pending
              </span>
            )}
            {conversation.unreadCount > 0 && (
              <span className="bg-coral text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function formatRelativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(timestamp).toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}
