import type { Conversation, Message } from "@/types/chat";
import { getCurrentUser, getCurrentUserId } from "./auth";

const CURRENT_USER_ID = "user-1";

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    type: "direct",
    status: "active",
    name: "Studio Jogi Kazimierz",
    participants: [
      { id: CURRENT_USER_ID, name: "Katarzyna Nowak", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", role: "consumer" },
      { id: "biz-1", name: "Studio Jogi Kazimierz", avatar: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&h=100&fit=crop", role: "business" },
    ],
    lastMessage: { text: "Zapraszamy na poranne zajęcia!", timestamp: "2026-02-28T10:30:00Z", senderId: "biz-1" },
    unreadCount: 2,
    activityId: "act-1",
    activityTitle: "Poranna Joga Vinyasa",
    createdAt: "2026-02-15T08:00:00Z",
  },
  {
    id: "conv-2",
    type: "group",
    status: "active",
    name: "Klub Szachowy Mistrzów — Grupa Wiosenna",
    participants: [
      { id: CURRENT_USER_ID, name: "Katarzyna Nowak", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", role: "consumer" },
      { id: "inst-6", name: "Aleksander Nowak", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", role: "instructor" },
      { id: "user-3", name: "Marek Kowalski", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", role: "consumer" },
      { id: "user-4", name: "Elena K.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face", role: "consumer" },
    ],
    lastMessage: { text: "Następny turniej próbny w piątek!", timestamp: "2026-02-28T14:00:00Z", senderId: "inst-6" },
    unreadCount: 1,
    activityId: "act-7",
    activityTitle: "Klub Szachowy Mistrzów",
    cohortId: "cohort-1",
    createdAt: "2026-01-10T09:00:00Z",
  },
  {
    id: "conv-3",
    type: "direct",
    status: "pending",
    name: "Centrum Szachowe Kraków",
    participants: [
      { id: "user-5", name: "Anna Zielińska", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", role: "consumer" },
      { id: "biz-2", name: "Centrum Szachowe Kraków", avatar: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=100&h=100&fit=crop", role: "business" },
    ],
    lastMessage: { text: "Chciałabym zapisać córkę do grupy szachowej.", timestamp: "2026-02-27T16:00:00Z", senderId: "user-5" },
    unreadCount: 1,
    activityId: "act-7",
    activityTitle: "Klub Szachowy Mistrzów",
    cohortId: "cohort-2",
    createdAt: "2026-02-27T16:00:00Z",
  },
  {
    id: "conv-4",
    type: "direct",
    status: "active",
    name: "Marco Rossi",
    participants: [
      { id: CURRENT_USER_ID, name: "Katarzyna Nowak", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", role: "consumer" },
      { id: "inst-1", name: "Marco Rossi", avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop&crop=face", role: "instructor" },
    ],
    lastMessage: { text: "Następne warsztaty w sobotę o 17:00", timestamp: "2026-02-26T14:32:00Z", senderId: "inst-1" },
    unreadCount: 0,
    activityId: "act-3",
    activityTitle: "Warsztaty Włoskiej Kuchni",
    createdAt: "2026-02-10T12:00:00Z",
  },
  {
    id: "conv-5",
    type: "group",
    status: "active",
    name: "Poranna Joga — Grupa Marcowa",
    participants: [
      { id: CURRENT_USER_ID, name: "Katarzyna Nowak", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", role: "consumer" },
      { id: "biz-1", name: "Studio Jogi Kazimierz", avatar: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&h=100&fit=crop", role: "business" },
      { id: "user-6", name: "Dawid Wiśniewski", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", role: "consumer" },
    ],
    lastMessage: { text: "Witamy w grupie! Pierwsze zajęcia 3 marca.", timestamp: "2026-02-25T09:00:00Z", senderId: "biz-1" },
    unreadCount: 0,
    activityId: "act-1",
    activityTitle: "Poranna Joga Vinyasa",
    cohortId: "cohort-3",
    createdAt: "2026-02-25T09:00:00Z",
  },
  {
    id: "conv-6",
    type: "direct",
    status: "pending",
    name: "Studio Jogi Kazimierz",
    participants: [
      { id: "user-7", name: "Jakub Pawlak", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", role: "consumer" },
      { id: "biz-1", name: "Studio Jogi Kazimierz", avatar: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&h=100&fit=crop", role: "business" },
    ],
    lastMessage: { text: "Dzień dobry! Chciałbym dołączyć do grupy jogi.", timestamp: "2026-02-28T08:00:00Z", senderId: "user-7" },
    unreadCount: 1,
    activityId: "act-1",
    activityTitle: "Poranna Joga Vinyasa",
    cohortId: "cohort-4",
    createdAt: "2026-02-28T08:00:00Z",
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "conv-1": [
    { id: "m1-1", conversationId: "conv-1", senderId: "biz-1", senderName: "Studio Jogi Kazimierz", type: "text", text: "Cześć! Dziękujemy za rezerwację porannej jogi.", timestamp: "2026-02-28T09:00:00Z" },
    { id: "m1-2", conversationId: "conv-1", senderId: CURRENT_USER_ID, senderName: "Katarzyna Nowak", type: "text", text: "Dzięki! Czy mogę zmienić godzinę na 8:00?", timestamp: "2026-02-28T09:15:00Z" },
    { id: "m1-3", conversationId: "conv-1", senderId: "biz-1", senderName: "Studio Jogi Kazimierz", type: "text", text: "Oczywiście, zmieniliśmy rezerwację. Do zobaczenia!", timestamp: "2026-02-28T09:22:00Z" },
    { id: "m1-4", conversationId: "conv-1", senderId: "biz-1", senderName: "Studio Jogi Kazimierz", type: "text", text: "Zapraszamy na poranne zajęcia!", timestamp: "2026-02-28T10:30:00Z" },
  ],
  "conv-2": [
    { id: "m2-0", conversationId: "conv-2", senderId: "system", senderName: "System", type: "system", text: "Katarzyna Nowak dołączyła do grupy.", timestamp: "2026-01-10T09:00:00Z" },
    { id: "m2-1", conversationId: "conv-2", senderId: "inst-6", senderName: "Aleksander Nowak", type: "text", text: "Witam wszystkich w grupie szachowej! 🎉", timestamp: "2026-01-10T09:05:00Z" },
    { id: "m2-2", conversationId: "conv-2", senderId: CURRENT_USER_ID, senderName: "Katarzyna Nowak", type: "text", text: "Cześć! Nie mogę się doczekać zajęć.", timestamp: "2026-01-10T09:30:00Z" },
    { id: "m2-3", conversationId: "conv-2", senderId: "user-3", senderName: "Marek Kowalski", type: "text", text: "Ja też! Szachy to moja pasja.", timestamp: "2026-01-10T10:00:00Z" },
    { id: "m2-4", conversationId: "conv-2", senderId: "inst-6", senderName: "Aleksander Nowak", type: "text", text: "Następny turniej próbny w piątek!", timestamp: "2026-02-28T14:00:00Z" },
  ],
  "conv-3": [
    { id: "m3-1", conversationId: "conv-3", senderId: "user-5", senderName: "Anna Zielińska", type: "text", text: "Chciałabym zapisać córkę do grupy szachowej.", timestamp: "2026-02-27T16:00:00Z" },
  ],
  "conv-4": [
    { id: "m4-1", conversationId: "conv-4", senderId: CURRENT_USER_ID, senderName: "Katarzyna Nowak", type: "text", text: "Cześć Marco! Kiedy będą następne warsztaty?", timestamp: "2026-02-26T14:00:00Z" },
    { id: "m4-2", conversationId: "conv-4", senderId: "inst-1", senderName: "Marco Rossi", type: "text", text: "Ciao! Planujemy warsztaty z focaccią.", timestamp: "2026-02-26T14:30:00Z" },
    { id: "m4-3", conversationId: "conv-4", senderId: "inst-1", senderName: "Marco Rossi", type: "text", text: "Następne warsztaty w sobotę o 17:00", timestamp: "2026-02-26T14:32:00Z" },
  ],
  "conv-5": [
    { id: "m5-0", conversationId: "conv-5", senderId: "system", senderName: "System", type: "system", text: "Katarzyna Nowak dołączyła do grupy.", timestamp: "2026-02-25T09:00:00Z" },
    { id: "m5-1", conversationId: "conv-5", senderId: "biz-1", senderName: "Studio Jogi Kazimierz", type: "text", text: "Witamy w grupie! Pierwsze zajęcia 3 marca.", timestamp: "2026-02-25T09:00:00Z" },
  ],
  "conv-6": [
    { id: "m6-1", conversationId: "conv-6", senderId: "user-7", senderName: "Jakub Pawlak", type: "text", text: "Dzień dobry! Chciałbym dołączyć do grupy jogi.", timestamp: "2026-02-28T08:00:00Z" },
  ],
};

// In-memory state for mutations
const conversations = [...MOCK_CONVERSATIONS];
const messages: Record<string, Message[]> = { ...MOCK_MESSAGES };

export async function fetchConversations(): Promise<Conversation[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const userId = getCurrentUserId();
  return conversations
    .filter((c) => c.participants.some((p) => p.id === userId))
    .sort((a, b) => {
      const aTime = a.lastMessage?.timestamp ?? a.createdAt;
      const bTime = b.lastMessage?.timestamp ?? b.createdAt;
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
}

export async function fetchConversation(id: string): Promise<Conversation | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return conversations.find((c) => c.id === id) ?? null;
}

export async function fetchMessages(conversationId: string): Promise<Message[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return messages[conversationId] ?? [];
}

export async function sendMessage(conversationId: string, text: string): Promise<Message> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const currentUser = getCurrentUser();
  const msg: Message = {
    id: `msg-${Date.now()}`,
    conversationId,
    senderId: currentUser?.id ?? "user-1",
    senderName: currentUser?.name ?? "User",
    type: "text",
    text,
    timestamp: new Date().toISOString(),
  };
  if (!messages[conversationId]) messages[conversationId] = [];
  messages[conversationId].push(msg);

  const conv = conversations.find((c) => c.id === conversationId);
  if (conv) {
    conv.lastMessage = { text, timestamp: msg.timestamp, senderId: msg.senderId };
  }
  return msg;
}

export async function getUnreadCount(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const userId = getCurrentUserId();
  return conversations
    .filter((c) => c.participants.some((p) => p.id === userId))
    .reduce((sum, c) => sum + c.unreadCount, 0);
}

export function addParticipantToConversation(conversationId: string, participant: Conversation["participants"][0]) {
  const conv = conversations.find((c) => c.id === conversationId);
  if (conv && !conv.participants.find((p) => p.id === participant.id)) {
    conv.participants.push(participant);
  }
}

export function createDirectConversation(data: {
  userId: string;
  userName: string;
  userAvatar: string;
  businessId: string;
  businessName: string;
  businessAvatar: string;
  activityId: string;
  activityTitle: string;
  cohortId: string;
}): Conversation {
  const conv: Conversation = {
    id: `conv-${Date.now()}`,
    type: "direct",
    status: "pending",
    name: data.businessName,
    participants: [
      { id: data.userId, name: data.userName, avatar: data.userAvatar, role: "consumer" },
      { id: data.businessId, name: data.businessName, avatar: data.businessAvatar, role: "business" },
    ],
    lastMessage: null,
    unreadCount: 0,
    activityId: data.activityId,
    activityTitle: data.activityTitle,
    cohortId: data.cohortId,
    createdAt: new Date().toISOString(),
  };
  conversations.push(conv);
  messages[conv.id] = [];
  return conv;
}
