"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Message, Participant } from "@/types/chat";

const CURRENT_USER_ID = "user-1";

export function MessageBubble({
  message,
  isGroup,
  participants,
}: {
  message: Message;
  isGroup: boolean;
  participants: Participant[];
}) {
  if (message.type === "system") {
    return (
      <div className="flex justify-center py-2">
        <span className="text-[11px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {message.text}
        </span>
      </div>
    );
  }

  const isOwn = message.senderId === CURRENT_USER_ID;
  const sender = participants.find((p) => p.id === message.senderId);
  const time = new Date(message.timestamp).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex gap-2", isOwn ? "justify-end" : "justify-start")}>
      {!isOwn && isGroup && (
        <Avatar className="w-7 h-7 mt-1 flex-shrink-0">
          <AvatarImage src={sender?.avatar} alt={message.senderName} />
          <AvatarFallback className="text-[10px] bg-coral/10 text-coral">
            {message.senderName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[75%]")}>
        {!isOwn && isGroup && (
          <p className="text-[10px] font-semibold text-gray-500 mb-0.5 ml-1">
            {message.senderName}
          </p>
        )}
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
            isOwn
              ? "bg-coral text-white rounded-br-md"
              : "bg-white text-gray-800 border border-gray-100 shadow-[var(--shadow-soft)] rounded-bl-md"
          )}
        >
          <p>{message.text}</p>
          <p
            className={cn(
              "text-[10px] mt-1",
              isOwn ? "text-white/70" : "text-gray-400"
            )}
          >
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}
