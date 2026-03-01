"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, UsersThree, Check, X } from "@phosphor-icons/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Conversation } from "@/types/chat";

export function ChatThreadHeader({
  conversation,
  isBusinessView,
  onAccept,
  onReject,
  onBack,
}: {
  conversation: Conversation;
  isBusinessView?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onBack: () => void;
}) {
  const t = useTranslations("messages");
  const isGroup = conversation.type === "group";
  const isPending = conversation.status === "pending";
  const participantCount = conversation.participants.length;

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
      <button
        onClick={onBack}
        className="p-1.5 rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-colors"
      >
        <ArrowLeft size={18} weight="bold" />
      </button>

      {isGroup ? (
        <div className="w-9 h-9 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
          <UsersThree size={18} weight="fill" className="text-coral" />
        </div>
      ) : (
        <Avatar className="w-9 h-9 flex-shrink-0">
          <AvatarImage
            src={conversation.participants[1]?.avatar ?? conversation.participants[0]?.avatar}
            alt={conversation.name}
          />
          <AvatarFallback className="text-xs bg-coral/10 text-coral">
            {conversation.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold text-gray-900 truncate">
          {conversation.name}
        </h2>
        {isGroup && (
          <p className="text-[10px] text-gray-400">
            {t("participantCount", { count: participantCount })}
          </p>
        )}
        {isPending && !isGroup && (
          <p className="text-[10px] text-amber-600 font-medium">
            {t("pendingEnrollment")}
          </p>
        )}
      </div>

      {isBusinessView && isPending && (
        <div className="flex items-center gap-1.5">
          <button
            onClick={onAccept}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium transition-colors"
          >
            <Check size={14} weight="bold" />
            {t("accept")}
          </button>
          <button
            onClick={onReject}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors"
          >
            <X size={14} weight="bold" />
            {t("reject")}
          </button>
        </div>
      )}
    </div>
  );
}
