"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ChatCircle, ArrowLeft, Plus } from "@phosphor-icons/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  fetchChatContacts,
  fetchChatMessages,
  searchNewContacts,
  type ChatContact,
  type ChatMessage,
  type NewContactResult,
} from "@/api/chat";
import { useChatReducer } from "@/hooks/use-chat-reducer";
import {
  ChatHeader,
  MessageBubble,
  ChatInput,
  ContactListItem,
  NewChatContactItem,
  SearchInput,
} from "./chat";

export function ChatSidebar({ children }: { children: React.ReactNode }) {
  const t = useTranslations("chat");
  const [state, dispatch] = useChatReducer();
  const { contacts, activeChat, messages, newMessage, isOpen, view, searchQuery, newChatQuery, newChatResults } = state;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChatContacts().then((c) => dispatch({ type: "SET_CONTACTS", contacts: c }));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (view === "new") {
      searchNewContacts(newChatQuery).then((r) => dispatch({ type: "SET_NEW_CHAT_RESULTS", results: r }));
    }
  }, [view, newChatQuery]);

  const handleSend = () => {
    if (!newMessage.trim() || !activeChat) return;
    const msg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    dispatch({ type: "ADD_MESSAGE", message: msg });
  };

  const handleBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  const handleStartNewChat = (result: NewContactResult) => {
    const contact: ChatContact = {
      id: result.id,
      name: result.name,
      avatar: result.avatar,
      type: result.type,
      lastMessage: "",
      lastMessageTime: "Now",
      unread: 0,
    };
    dispatch({ type: "START_NEW_CHAT", contact });
  };

  const totalUnread = contacts.reduce((sum, c) => sum + c.unread, 0);

  const filteredContacts = searchQuery
    ? contacts.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          dispatch({ type: "SET_IS_OPEN", isOpen: true });
          fetchChatContacts().then((c) => dispatch({ type: "SET_CONTACTS", contacts: c }));
        } else {
          dispatch({ type: "CLOSE_SHEET" });
        }
      }}
    >
      <SheetTrigger asChild>
        <span className="relative">
          {children}
          {totalUnread > 0 && (
            <span className="absolute top-0.5 right-0.5 bg-coral text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none pointer-events-none">
              {totalUnread}
            </span>
          )}
        </span>
      </SheetTrigger>
      <SheetContent
        side="right"
        overlayClassName="bg-transparent"
        className="rounded-l-2xl border-l-0 shadow-[-8px_0_12px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col p-0"
        showCloseButton={view === "list"}
      >
        {view === "chat" && activeChat ? (
          <div className="flex flex-col h-full">
            <ChatHeader activeChat={activeChat} onBack={handleBack} />

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/50">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-sm text-gray-400">{t("noMessages")}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("sayHello")}
                  </p>
                </div>
              )}
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <ChatInput
              value={newMessage}
              onChange={(v) => dispatch({ type: "SET_NEW_MESSAGE", value: v })}
              onSend={handleSend}
            />
          </div>
        ) : view === "new" ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
              <button
                onClick={() => {
                  dispatch({ type: "SET_VIEW", view: "list" });
                  dispatch({ type: "SET_NEW_CHAT_QUERY", query: "" });
                }}
                className="p-1.5 rounded-full text-gray-500 hover:text-coral hover:bg-coral/5 transition-colors"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
              <p className="text-sm font-semibold text-gray-900">
                {t("newConversation")}
              </p>
            </div>

            <SearchInput
              value={newChatQuery}
              onChange={(v) => dispatch({ type: "SET_NEW_CHAT_QUERY", query: v })}
              placeholder={t("searchPlacesOrInstructors")}
            />

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
              {newChatResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-sm text-gray-500">{t("noResults")}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("tryDifferentSearch")}
                  </p>
                </div>
              ) : (
                newChatResults.map((result) => (
                  <NewChatContactItem
                    key={result.id}
                    result={result}
                    onClick={() => handleStartNewChat(result)}
                  />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 pb-0">
              <SheetTitle>{t("title")}</SheetTitle>
              <SheetDescription>
                {t("conversationsCount", { count: contacts.length })}
                {totalUnread > 0 && (
                  <span className="ml-1.5 text-coral font-medium">
                    &middot; {totalUnread} {t("unread")}
                  </span>
                )}
              </SheetDescription>
            </SheetHeader>

            <SearchInput
              value={searchQuery}
              onChange={(v) => dispatch({ type: "SET_SEARCH_QUERY", query: v })}
              placeholder={t("searchConversations")}
            />

            <div className="flex-1 overflow-y-auto px-4 pb-3 space-y-2">
              {contacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ChatCircle size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">
                    {t("noMessages")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("startConversation")}
                  </p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-sm text-gray-500">{t("noConversationsFound")}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t("tryDifferentSearch")}
                  </p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <ContactListItem
                    key={contact.id}
                    contact={contact}
                    onClick={() => {
                      fetchChatMessages(contact.id).then((msgs) =>
                        dispatch({ type: "OPEN_CHAT", chat: contact, messages: msgs })
                      );
                    }}
                  />
                ))
              )}
            </div>

            <div className="px-4 py-3 border-t border-gray-100 bg-white">
              <button
                onClick={() => dispatch({ type: "SET_VIEW", view: "new" })}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-coral hover:bg-coral-hover text-white text-sm font-medium transition-all active:scale-[0.98] shadow-sm shadow-coral/20"
              >
                <Plus size={16} weight="bold" />
                {t("newConversation")}
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
