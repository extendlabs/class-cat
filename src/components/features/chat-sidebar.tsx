"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatCircle, MagnifyingGlass, UsersThree } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  fetchConversations,
  fetchConversation,
  fetchMessages,
  sendMessage,
  getUnreadCount,
} from "@/api/conversations";
import { fetchEnrollmentRequests, acceptEnrollment, rejectEnrollment } from "@/api/enrollments";
import { useAuth } from "@/hooks/use-auth";
import { useChatSidebar } from "./chat-sidebar-context";
import { ConversationListItem, MessageBubble, ChatInput, ChatThreadHeader } from "@/components/features/messages";
import type { Conversation, Message } from "@/types/chat";

type Tab = "all" | "groups";

function ListView() {
  const t = useTranslations("messages");
  const { openToConversation } = useChatSidebar();
  const [tab, setTab] = useState<Tab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
  });

  const filtered = conversations.filter((c: Conversation) => {
    if (tab === "groups" && c.type !== "group") return false;
    if (searchQuery) {
      return c.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-4 pb-3">
        <SheetTitle>{t("title")}</SheetTitle>
        <SheetDescription>
          {t("conversationsCount", { count: conversations.length })}
          {unreadCount > 0 && (
            <span className="ml-1.5 text-coral font-medium">
              &middot; {unreadCount} {t("unread")}
            </span>
          )}
        </SheetDescription>
      </SheetHeader>

      {/* Tabs */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          {(["all", "groups"] as Tab[]).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                tab === tabKey
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tabKey === "groups" && <UsersThree size={14} />}
              {t(tabKey === "all" ? "tabAll" : "tabGroups")}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <MagnifyingGlass
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchConversations")}
            className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-coral/30 focus:ring-2 focus:ring-coral/10 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {isLoading ? (
          <div className="space-y-2 px-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ChatCircle size={24} className="text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-500">
              {searchQuery ? t("noConversationsFound") : t("noMessages")}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {searchQuery ? t("tryDifferentSearch") : t("noMessagesHint")}
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {filtered.map((conversation: Conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                onClick={() => openToConversation(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ThreadView({ conversationId }: { conversationId: string }) {
  const t = useTranslations("messages");
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { goBackToList } = useChatSidebar();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversation, isLoading: convLoading } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => fetchConversation(conversationId),
  });

  const { data: msgs = [], isLoading: msgsLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
  });

  const { data: enrollmentRequests = [] } = useQuery({
    queryKey: ["enrollment-requests"],
    queryFn: () => fetchEnrollmentRequests(),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const sendMutation = useMutation({
    mutationFn: (text: string) => sendMessage(conversationId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });

  const acceptMutation = useMutation({
    mutationFn: (requestId: string) => acceptEnrollment(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversation", conversationId] });
      queryClient.invalidateQueries({ queryKey: ["enrollment-requests"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (requestId: string) => rejectEnrollment(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversation", conversationId] });
      queryClient.invalidateQueries({ queryKey: ["enrollment-requests"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const isBusinessView = !!user?.businessId;
  const pendingRequest = enrollmentRequests.find(
    (r) => r.conversationId === conversationId && r.status === "pending"
  );

  const handleAccept = () => {
    if (pendingRequest) acceptMutation.mutate(pendingRequest.id);
  };

  const handleReject = () => {
    if (pendingRequest) rejectMutation.mutate(pendingRequest.id);
  };

  const isLoading = convLoading || msgsLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 space-y-3">
          <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-14 bg-gray-100 rounded-2xl animate-pulse ${i % 2 === 0 ? "w-3/4" : "w-2/3 ml-auto"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ChatCircle size={48} className="text-gray-200 mb-4" />
        <p className="text-gray-500">{t("conversationNotFound")}</p>
      </div>
    );
  }

  const isGroup = conversation.type === "group";

  return (
    <div className="flex flex-col h-full">
      <ChatThreadHeader
        conversation={conversation}
        isBusinessView={isBusinessView && !!pendingRequest}
        onAccept={handleAccept}
        onReject={handleReject}
        onBack={goBackToList}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50">
        {msgs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-gray-400">{t("noMessages")}</p>
            <p className="text-xs text-gray-400 mt-1">{t("startTyping")}</p>
          </div>
        ) : (
          msgs.map((msg: Message) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isGroup={isGroup}
              participants={conversation.participants}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={(text) => sendMutation.mutate(text)}
        disabled={sendMutation.isPending}
      />
    </div>
  );
}

export function ChatSidebar() {
  const { view } = useChatSidebar();

  if (view.mode === "thread") {
    return <ThreadView conversationId={view.conversationId} />;
  }

  return <ListView />;
}
