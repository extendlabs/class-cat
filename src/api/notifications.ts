import type { Notification } from "@/types/chat";
import { getCurrentUserId } from "./auth";

const MOCK_NOTIFICATIONS: Notification[] = [
  // ── Katarzyna (user-1, business owner) ──
  {
    id: "notif-1",
    type: "enrollment_accepted",
    title: "Enrollment Accepted",
    body: "Your enrollment for Klub Szachowy Mistrzów — Grupa Wiosenna has been accepted!",
    read: false,
    timestamp: "2026-02-28T15:00:00Z",
    linkTo: "/profile/messages/conv-2",
    userId: "user-1",
  },
  {
    id: "notif-2",
    type: "new_message",
    title: "New Message",
    body: "Aleksander Nowak sent a message in Klub Szachowy Mistrzów group.",
    read: false,
    timestamp: "2026-02-28T14:00:00Z",
    linkTo: "/profile/messages/conv-2",
    userId: "user-1",
  },
  {
    id: "notif-3",
    type: "new_enrollment_request",
    title: "New Enrollment Request",
    body: "Anna Zielińska applied for Klub Szachowy Mistrzów — Grupa Letnia.",
    read: true,
    timestamp: "2026-02-27T16:00:00Z",
    linkTo: "/profile/business/requests",
    userId: "user-1",
  },
  {
    id: "notif-4",
    type: "cohort_update",
    title: "Cohort Update",
    body: "Poranna Joga — Grupa Marcowa starts on March 3rd.",
    read: true,
    timestamp: "2026-02-25T09:00:00Z",
    linkTo: "/profile/messages/conv-5",
    userId: "user-1",
  },
  {
    id: "notif-5",
    type: "new_enrollment_request",
    title: "New Enrollment Request",
    body: "Jakub Pawlak applied for Poranna Joga Vinyasa — Joga Kwietniowa.",
    read: false,
    timestamp: "2026-02-28T08:00:00Z",
    linkTo: "/profile/business/requests",
    userId: "user-1",
  },
  // ── Jan (user-consumer-1, pure consumer) ──
  {
    id: "notif-c1",
    type: "cohort_update",
    title: "Booking Confirmed",
    body: "Your booking for Klub Gier Planszowych on March 8th is confirmed!",
    read: false,
    timestamp: "2026-02-28T12:00:00Z",
    userId: "user-consumer-1",
  },
  {
    id: "notif-c2",
    type: "new_message",
    title: "Welcome to ClassCat!",
    body: "Browse activities near you and find your next class.",
    read: true,
    timestamp: "2026-01-10T10:00:00Z",
    userId: "user-consumer-1",
  },
  // ── Aleksander (user-instructor-1, instructor) ──
  {
    id: "notif-i1",
    type: "new_enrollment_request",
    title: "New Student",
    body: "A new student enrolled in your chess class.",
    read: false,
    timestamp: "2026-02-28T11:00:00Z",
    userId: "user-instructor-1",
  },
  // ── Marta (user-dual-1, dual role) ──
  {
    id: "notif-d1",
    type: "cohort_update",
    title: "Schedule Update",
    body: "Your yoga class on March 5th has been confirmed.",
    read: false,
    timestamp: "2026-02-28T09:00:00Z",
    userId: "user-dual-1",
  },
];

const notifications = [...MOCK_NOTIFICATIONS];

export async function fetchNotifications(): Promise<Notification[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const userId = getCurrentUserId();
  return notifications
    .filter((n) => n.userId === userId)
    .sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
}

export async function markNotificationRead(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const notif = notifications.find((n) => n.id === id);
  if (notif) notif.read = true;
}

export async function markAllNotificationsRead(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  notifications.forEach((n) => (n.read = true));
}

export async function getUnreadNotificationCount(): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const userId = getCurrentUserId();
  return notifications.filter((n) => n.userId === userId && !n.read).length;
}
