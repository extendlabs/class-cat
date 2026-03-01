export type CourtStatus = "active" | "inactive" | "maintenance";

export type CourtSport =
  | "tennis"
  | "padel"
  | "badminton"
  | "squash"
  | "basketball"
  | "volleyball"
  | "futsal";

export type CourtSurface =
  | "clay"
  | "hard"
  | "grass"
  | "synthetic"
  | "parquet"
  | "rubber";

export interface Court {
  id: string;
  name: string;
  sport: CourtSport;
  surface: CourtSurface;
  indoor: boolean;
  image: string;
  address: string;
  location: string;
  lat: number;
  lng: number;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  businessId: string;
  businessName: string;
  amenities: string[];
  operatingHours: { day: string; open: string; close: string }[];
  courtCount?: number; // how many physical courts of this type (default 1)
  status?: CourtStatus;
  isPromoted?: boolean;
}

export interface TimeSlotAvailability {
  courtId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  hour: number; // 0-23
  available: boolean; // true if at least 1 court free (consumer view)
  price?: number;
  availableCount?: number; // how many courts free this slot (business view)
  totalCount?: number; // total courts of this type
  bookedCount?: number; // reserved by customers
  closed?: boolean; // outside operating hours / closed day
}

export interface CourtSlotDetail {
  courtIndex: number; // 1-based (e.g. "Court 1")
  status: "available" | "booked" | "blocked";
  bookedBy?: string;
}

export interface CourtReservation {
  id: string;
  courtId: string;
  courtName: string;
  date: string;
  startHour: number;
  durationHours: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled" | "rejected";
  courtIndex?: number;
  rejectedReason?: string;
  userName?: string;
  createdAt: string;
}

export interface RecurringBlock {
  id: string;
  courtId: string;
  courtIndex?: number;
  dayOfWeek: number; // 0=Mon … 6=Sun
  startHour: number;
  endHour: number;
  label?: string;
}
