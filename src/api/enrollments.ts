import type { Cohort, EnrollmentRequest } from "@/types/enrollment";
import type { Conversation } from "@/types/chat";
import { createDirectConversation, addParticipantToConversation } from "./conversations";
import { getCurrentUser } from "./auth";
import { apiFetch, unwrap } from "@/lib/api-client";

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

export async function fetchEnrollmentRequests(providerSlug?: string): Promise<EnrollmentRequest[]> {
  if (!providerSlug) return [];
  const res = await apiFetch(`/activities/provider/${providerSlug}/all-requests/`);
  if (!res.ok) return [];
  const data = unwrap(await res.json());
  const list = Array.isArray(data) ? data : data?.results ?? [];
  const statusMap: Record<string, EnrollmentRequest["status"]> = {
    PENDING: "pending",
    CONFIRMED: "accepted",
    REJECTED: "rejected",
    CANCELLED: "rejected",
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return list.map((r: any): EnrollmentRequest => ({
    id: String(r.id),
    activityId: r.activitySlug ?? "",
    activityTitle: r.activityName ?? "",
    cohortId: "",
    cohortName: r.message ?? "",
    userId: r.user?.username ?? "",
    userName: [r.user?.firstName, r.user?.lastName].filter(Boolean).join(" ") || r.user?.username || "",
    userAvatar: r.user?.avatar?.file ?? "",
    status: statusMap[r.status] ?? "pending",
    conversationId: "",
    createdAt: r.createdAt ?? new Date().toISOString(),
  }));
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

export async function acceptEnrollment(requestId: string, providerSlug?: string): Promise<EnrollmentRequest> {
  if (!providerSlug) throw new Error("No provider slug");
  const res = await apiFetch(`/activities/provider/${providerSlug}/all-requests/${requestId}/`, {
    method: "PATCH",
    body: JSON.stringify({ status: "CONFIRMED" }),
  });
  if (!res.ok) throw new Error("Failed to accept request");
  return unwrap(await res.json());
}

export async function rejectEnrollment(requestId: string, providerSlug?: string): Promise<EnrollmentRequest> {
  if (!providerSlug) throw new Error("No provider slug");
  const res = await apiFetch(`/activities/provider/${providerSlug}/all-requests/${requestId}/`, {
    method: "PATCH",
    body: JSON.stringify({ status: "REJECTED" }),
  });
  if (!res.ok) throw new Error("Failed to reject request");
  return unwrap(await res.json());
}

export async function fetchUserEnrollments(_userId: string): Promise<EnrollmentRequest[]> {
  const res = await apiFetch("/users/users/enrolled-in/");
  if (!res.ok) {
    // fallback to mock (filter by userId)
    await new Promise((resolve) => setTimeout(resolve, 250));
    const userEnrollments = enrollmentRequests.filter((r) => r.userId === _userId);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = unwrap(await res.json());
  const list = Array.isArray(data) ? data : (data as any)?.results ?? [];

  const statusMap: Record<string, EnrollmentRequest["status"]> = {
    PENDING: "pending",
    COMPLETED: "accepted",
    IGNORED: "rejected",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return list.map((e: any): EnrollmentRequest => {
    const activity = e.session?.activity ?? {};
    const sessionDate: string | undefined = e.session?.date;
    return {
      id: String(e.id),
      activityId: activity.slug ?? "",
      activityTitle: activity.name ?? "",
      activityImage: activity.primaryImage?.file ?? undefined,
      cohortId: String(e.session?.id ?? ""),
      cohortName: "",
      userId: _userId,
      userName: "",
      userAvatar: "",
      status: statusMap[e.status] ?? "pending",
      conversationId: "",
      createdAt: sessionDate ?? new Date().toISOString(),
      cohortStartDate: sessionDate,
      cohortEndDate: sessionDate,
    };
  });
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

export async function sendActivityRequest(
  providerSlug: string,
  activitySlug: string,
  message: string
): Promise<{ status: string }> {
  const res = await apiFetch(
    `/activities/provider/${providerSlug}/activity/${activitySlug}/requests/`,
    { method: "POST", body: JSON.stringify({ message }) }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
  return unwrap(await res.json());
}

export async function getMyActivityRequest(
  providerSlug: string,
  activitySlug: string
): Promise<{ status: string } | null> {
  const res = await apiFetch(
    `/activities/provider/${providerSlug}/activity/${activitySlug}/requests/mine/`
  );
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return unwrap(await res.json());
}
