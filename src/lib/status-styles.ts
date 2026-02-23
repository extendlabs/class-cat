import type { BookingStatus } from "@/types/user";
import type { BusinessActivityStatus } from "@/types/business-portal";

export const BOOKING_STATUS_STYLES: Record<BookingStatus, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-gray-100 text-gray-500 border-gray-200",
};

export const ACTIVITY_STATUS_STYLES: Record<BusinessActivityStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-gray-100 text-gray-600 border-gray-200",
  paused: "bg-amber-50 text-amber-700 border-amber-200",
};
