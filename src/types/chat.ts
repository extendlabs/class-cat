export type ConversationType = "direct" | "group";

export type ConversationStatus = "active" | "pending" | "archived";

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: "consumer" | "business" | "instructor";
}

export interface MessagePreview {
  text: string;
  timestamp: string;
  senderId: string;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  status: ConversationStatus;
  name: string;
  participants: Participant[];
  lastMessage: MessagePreview | null;
  unreadCount: number;
  activityId?: string;
  activityTitle?: string;
  cohortId?: string;
  createdAt: string;
}

export type MessageType = "text" | "system";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  type: MessageType;
  text: string;
  timestamp: string;
}

export type NotificationType =
  | "enrollment_accepted"
  | "enrollment_rejected"
  | "new_enrollment_request"
  | "new_message"
  | "cohort_update";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  timestamp: string;
  linkTo?: string;
  userId?: string;
}
