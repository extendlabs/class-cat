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
  isPromoted?: boolean;
}

export interface TimeSlotAvailability {
  courtId: string;
  date: string; // ISO date string (YYYY-MM-DD)
  hour: number; // 0-23
  available: boolean;
  price?: number;
}

export interface CourtReservation {
  id: string;
  courtId: string;
  courtName: string;
  date: string;
  startHour: number;
  durationHours: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  userName?: string;
  createdAt: string;
}
