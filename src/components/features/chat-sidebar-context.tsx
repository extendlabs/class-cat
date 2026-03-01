"use client";

import { createContext, useContext, useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { ChatSidebar } from "./chat-sidebar";

type ChatSidebarView =
  | { mode: "list" }
  | { mode: "thread"; conversationId: string };

interface ChatSidebarContextValue {
  open: boolean;
  view: ChatSidebarView;
  openToList: () => void;
  openToConversation: (id: string) => void;
  goBackToList: () => void;
  setOpen: (open: boolean) => void;
}

const ChatSidebarContext = createContext<ChatSidebarContextValue | null>(null);

export function useChatSidebar() {
  const ctx = useContext(ChatSidebarContext);
  if (!ctx) throw new Error("useChatSidebar must be used within ChatSidebarProvider");
  return ctx;
}

export function ChatSidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpenState] = useState(false);
  const [view, setView] = useState<ChatSidebarView>({ mode: "list" });

  const setOpen = useCallback((val: boolean) => {
    setOpenState(val);
    if (!val) setView({ mode: "list" });
  }, []);

  const openToList = useCallback(() => {
    setView({ mode: "list" });
    setOpenState(true);
  }, []);

  const openToConversation = useCallback((id: string) => {
    setView({ mode: "thread", conversationId: id });
    setOpenState(true);
  }, []);

  const goBackToList = useCallback(() => {
    setView({ mode: "list" });
  }, []);

  return (
    <ChatSidebarContext.Provider
      value={{ open, view, openToList, openToConversation, goBackToList, setOpen }}
    >
      {children}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          overlayClassName="bg-transparent"
          className="sm:max-w-[420px] w-full rounded-l-2xl border-l-0 shadow-[-8px_0_12px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col p-0"
        >
          <ChatSidebar />
        </SheetContent>
      </Sheet>
    </ChatSidebarContext.Provider>
  );
}
