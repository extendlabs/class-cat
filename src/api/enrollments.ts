import type { Cohort, EnrollmentRequest } from "@/types/enrollment";
import type { Conversation } from "@/types/chat";
import { createDirectConversation, addParticipantToConversation } from "./conversations";
import { getCurrentUser } from "./auth";

export const MOCK_COHORTS: Cohort[] = [
  {
    id: "cohort-1",
    activityId: "act-7",
    name: "Grupa Wiosenna 2026",
    startDate: "2026-03-10",
    endDate: "2026-05-30",
    maxParticipants: 12,
    currentParticipants: 8,
    status: "open",
    conversationId: "conv-2",
  },
  {
    id: "cohort-2",
    activityId: "act-7",
    name: "Grupa Letnia 2026",
    startDate: "2026-06-02",
    endDate: "2026-08-22",
    maxParticipants: 12,
    currentParticipants: 3,
    status: "open",
    conversationId: "conv-group-summer",
  },
  {
    id: "cohort-3",
    activityId: "act-1",
    name: "Joga Marcowa",
    startDate: "2026-03-03",
    endDate: "2026-03-31",
    maxParticipants: 20,
    currentParticipants: 14,
    status: "open",
    conversationId: "conv-5",
  },
  {
    id: "cohort-4",
    activityId: "act-1",
    name: "Joga Kwietniowa",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    maxParticipants: 20,
    currentParticipants: 2,
    status: "open",
    conversationId: "conv-group-april",
  },
];

export const MOCK_ENROLLMENT_REQUESTS: EnrollmentRequest[] = [
  {
    id: "enr-1",
    conversationId: "conv-3",
    activityId: "act-7",
    activityTitle: "Klub Szachowy Mistrzów",
    cohortId: "cohort-2",
    cohortName: "Grupa Letnia 2026",
    userId: "user-5",
    userName: "Anna Zielińska",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "pending",
    createdAt: "2026-02-27T16:00:00Z",
  },
  {
    id: "enr-2",
    conversationId: "conv-6",
    activityId: "act-1",
    activityTitle: "Poranna Joga Vinyasa",
    cohortId: "cohort-4",
    cohortName: "Joga Kwietniowa",
    userId: "user-7",
    userName: "Jakub Pawlak",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    status: "pending",
    createdAt: "2026-02-28T08:00:00Z",
  },
  {
    id: "enr-3",
    conversationId: "conv-2",
    activityId: "act-7",
    activityTitle: "Klub Szachowy Mistrzów",
    cohortId: "cohort-1",
    cohortName: "Grupa Wiosenna 2026",
    userId: "user-1",
    userName: "Katarzyna Nowak",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    status: "accepted",
    createdAt: "2026-01-08T10:00:00Z",
    activityImage: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
    cohortStartDate: "2026-03-10",
    cohortEndDate: "2026-05-30",
  },
  {
    id: "enr-4",
    conversationId: "conv-5",
    activityId: "act-1",
    activityTitle: "Poranna Joga Vinyasa",
    cohortId: "cohort-3",
    cohortName: "Joga Marcowa",
    userId: "user-1",
    userName: "Katarzyna Nowak",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    status: "accepted",
    createdAt: "2026-02-20T11:00:00Z",
    activityImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    cohortStartDate: "2026-03-03",
    cohortEndDate: "2026-03-31",
  },
];

// In-memory state
const cohorts = [...MOCK_COHORTS];
const enrollmentRequests = [...MOCK_ENROLLMENT_REQUESTS];

export async function fetchCohortsByActivity(activityId: string): Promise<Cohort[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return cohorts.filter((c) => c.activityId === activityId);
}

export async function fetchEnrollmentRequests(_businessId?: string): Promise<EnrollmentRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // In a real app, filter by _businessId. For mock, return all.
  return enrollmentRequests.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function applyForCohort(
  activityId: string,
  cohortId: string
): Promise<{ request: EnrollmentRequest; conversation: Conversation }> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const cohort = cohorts.find((c) => c.id === cohortId);
  if (!cohort) throw new Error("Cohort not found");

  const currentUser = getCurrentUser();
  const userId = currentUser?.id ?? "user-1";
  const userName = currentUser?.name ?? "User";
  const userAvatar = currentUser?.avatar ?? "";

  // Create a direct conversation for the enrollment
  const conversation = createDirectConversation({
    userId,
    userName,
    userAvatar,
    businessId: "biz-2",
    businessName: "Centrum Szachowe Kraków",
    businessAvatar: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=100&h=100&fit=crop",
    activityId,
    activityTitle: "Klub Szachowy Mistrzów",
    cohortId,
  });

  const request: EnrollmentRequest = {
    id: `enr-${Date.now()}`,
    conversationId: conversation.id,
    activityId,
    activityTitle: "Klub Szachowy Mistrzów",
    cohortId,
    cohortName: cohort.name,
    userId,
    userName,
    userAvatar,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  enrollmentRequests.push(request);
  return { request, conversation };
}

export async function acceptEnrollment(requestId: string): Promise<EnrollmentRequest> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const request = enrollmentRequests.find((r) => r.id === requestId);
  if (!request) throw new Error("Request not found");

  request.status = "accepted";

  // Add user to the cohort's group conversation
  const cohort = cohorts.find((c) => c.id === request.cohortId);
  if (cohort) {
    cohort.currentParticipants += 1;
    if (cohort.currentParticipants >= cohort.maxParticipants) {
      cohort.status = "full";
    }

    addParticipantToConversation(cohort.conversationId, {
      id: request.userId,
      name: request.userName,
      avatar: request.userAvatar,
      role: "consumer",
    });
  }

  return request;
}

export async function rejectEnrollment(requestId: string): Promise<EnrollmentRequest> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const request = enrollmentRequests.find((r) => r.id === requestId);
  if (!request) throw new Error("Request not found");

  request.status = "rejected";
  return request;
}

export async function fetchUserEnrollments(userId: string): Promise<EnrollmentRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const userEnrollments = enrollmentRequests.filter((r) => r.userId === userId);

  // Enrich with cohort dates if not already present
  return userEnrollments
    .map((r) => {
      if (r.cohortStartDate && r.cohortEndDate) return r;
      const cohort = cohorts.find((c) => c.id === r.cohortId);
      return {
        ...r,
        cohortStartDate: r.cohortStartDate ?? cohort?.startDate,
        cohortEndDate: r.cohortEndDate ?? cohort?.endDate,
      };
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getUserEnrollmentForActivity(
  activityId: string
): Promise<EnrollmentRequest | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const userId = getCurrentUser()?.id ?? "user-1";
  return (
    enrollmentRequests.find(
      (r) => r.activityId === activityId && r.userId === userId
    ) ?? null
  );
}
