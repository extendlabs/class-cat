export type CohortStatus = "open" | "full" | "closed";

export interface Cohort {
  id: string;
  activityId: string;
  name: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  status: CohortStatus;
  conversationId: string;
}

export type EnrollmentStatus = "pending" | "accepted" | "rejected";

export interface EnrollmentRequest {
  id: string;
  conversationId: string;
  activityId: string;
  activityTitle: string;
  cohortId: string;
  cohortName: string;
  userId: string;
  userName: string;
  userAvatar: string;
  status: EnrollmentStatus;
  createdAt: string;
  activityImage?: string;
  cohortStartDate?: string;
  cohortEndDate?: string;
}
