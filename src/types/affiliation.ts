export interface InstructorAffiliation {
  contractorId: string;
  businessId: string;
  businessName: string;
  status: "pending" | "active" | "ended";
  role: "contractor" | "employee";
  startDate: string;
  endDate?: string;
}

export interface CalendarEntry {
  id: string;
  contractorId: string;
  activityId: string;
  activityTitle: string;
  businessId?: string;
  businessName?: string;
  status: "confirmed" | "pending_approval" | "cancelled";
  date: string;
  startTime: string;
  endTime: string;
  recurring?: boolean;
  cancellationNote?: string;
}

export interface SlotProposal {
  id: string;
  businessId: string;
  businessName: string;
  contractorId: string;
  activityId: string;
  activityTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  recurring?: boolean;
  dayOfWeek?: number;
  status: "pending" | "approved" | "rejected";
  proposedAt: string;
  respondedAt?: string;
}
