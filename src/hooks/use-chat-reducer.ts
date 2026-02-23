import { useReducer } from "react";
import type { ChatContact, ChatMessage, NewContactResult } from "@/api/chat";

export type View = "list" | "chat" | "new";

export type ChatState = {
  contacts: ChatContact[];
  activeChat: ChatContact | null;
  messages: ChatMessage[];
  newMessage: string;
  isOpen: boolean;
  view: View;
  searchQuery: string;
  newChatQuery: string;
  newChatResults: NewContactResult[];
};

export type ChatAction =
  | { type: "SET_CONTACTS"; contacts: ChatContact[] }
  | { type: "SET_ACTIVE_CHAT"; chat: ChatContact | null }
  | { type: "SET_MESSAGES"; messages: ChatMessage[] }
  | { type: "ADD_MESSAGE"; message: ChatMessage }
  | { type: "SET_NEW_MESSAGE"; value: string }
  | { type: "SET_IS_OPEN"; isOpen: boolean }
  | { type: "SET_VIEW"; view: View }
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_NEW_CHAT_QUERY"; query: string }
  | { type: "SET_NEW_CHAT_RESULTS"; results: NewContactResult[] }
  | { type: "OPEN_CHAT"; chat: ChatContact; messages: ChatMessage[] }
  | { type: "GO_BACK" }
  | { type: "CLOSE_SHEET" }
  | { type: "START_NEW_CHAT"; contact: ChatContact };

const initialChatState: ChatState = {
  contacts: [],
  activeChat: null,
  messages: [],
  newMessage: "",
  isOpen: false,
  view: "list",
  searchQuery: "",
  newChatQuery: "",
  newChatResults: [],
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.contacts };
    case "SET_ACTIVE_CHAT":
      return { ...state, activeChat: action.chat };
    case "SET_MESSAGES":
      return { ...state, messages: action.messages };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.message], newMessage: "" };
    case "SET_NEW_MESSAGE":
      return { ...state, newMessage: action.value };
    case "SET_IS_OPEN":
      return { ...state, isOpen: action.isOpen };
    case "SET_VIEW":
      return { ...state, view: action.view };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query };
    case "SET_NEW_CHAT_QUERY":
      return { ...state, newChatQuery: action.query };
    case "SET_NEW_CHAT_RESULTS":
      return { ...state, newChatResults: action.results };
    case "OPEN_CHAT":
      return { ...state, activeChat: action.chat, messages: action.messages, view: "chat" };
    case "GO_BACK":
      return { ...state, activeChat: null, messages: [], view: "list" };
    case "CLOSE_SHEET":
      return { ...state, isOpen: false, activeChat: null, messages: [], view: "list", searchQuery: "", newChatQuery: "" };
    case "START_NEW_CHAT":
      return { ...state, activeChat: action.contact, messages: [], view: "chat", newChatQuery: "" };
  }
}

export function useChatReducer() {
  return useReducer(chatReducer, initialChatState);
}
