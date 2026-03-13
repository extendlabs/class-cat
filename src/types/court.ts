export type CourtStatus = "active" | "inactive" | "maintenance";

export interface CourtFilters {
  query?: string;
  sport?: CourtSport;
  surface?: CourtSurface;
  indoor?: boolean;
  priceMin?: number;
  priceMax?: number;
  city?: string;
  minRating?: number;
}

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

// ── Backend API response types (Django + CamelCaseJSONRenderer) ──────────────
// All field names are camelCase because SuccessCamelCaseJSONRenderer converts them.
// Paginated lists come as: { success, count, next, data: [...items] }
// Single objects come as:  { success, data: {...item} }

export interface VenueCourtAPI {
  id: number;
  name: string;
  description: string;
  status: CourtStatus;
  order: number;
}

export interface VenuePricingRuleAPI {
  id: number;
  dayOfWeek: number | null;
  startHour: number;
  endHour: number;
  pricePerHour: string;
  label: string;
  priority: number;
}

export interface VenueOperatingHoursAPI {
  id: number;
  dayOfWeek: number;
  openTime: string; // "HH:MM:SS"
  closeTime: string;
  isClosed: boolean;
}

export interface VenueAPI {
  id: number;
  slug: string;
  name: string;
  sportType: CourtSport;
  surface: CourtSurface | "";
  indoor: boolean;
  image: string | null;
  defaultPricePerHour: string;
  address: string;
  lat: string | null;
  lng: string | null;
  status: CourtStatus;
  isPromoted: boolean;
  amenities: string[];
  courtCount: number;
  rating: number;
  reviewCount: number;
  providerId: number;
  providerName: string;
}

export interface VenueDetailAPI extends VenueAPI {
  description: string;
  operatingHours: VenueOperatingHoursAPI[];
  pricingRules: VenuePricingRuleAPI[];
  courts: VenueCourtAPI[];
}

export interface TimeSlotAvailabilityAPI {
  courtId: string;
  date: string;
  hour: number;
  available: boolean;
  price: string;
  availableCount: number;
  totalCount: number;
  bookedCount: number;
  closed: boolean;
}

export interface VenueReservationAPI {
  id: number;
  venueId: number;
  venueName: string;
  courtId: number | null;
  courtName: string | null;
  date: string;
  startHour: number;
  durationHours: number;
  totalPrice: string;
  status: "pending" | "confirmed" | "cancelled" | "rejected";
  rejectedReason: string;
  notes: string;
  userName?: string;
  createdAt: string;
}
