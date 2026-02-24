import { MOCK_COURTS, PROMOTED_COURTS, generateWeekSlots, MOCK_RESERVATIONS } from "@/api/mock-courts";
import type { Court, TimeSlotAvailability, CourtReservation, CourtSport, CourtSurface } from "@/types/court";

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

interface PaginatedCourtResult {
  courts: Court[];
  nextPage: number | null;
  total: number;
}

function extractCity(address: string): string {
  const parts = address.split(",").map((s) => s.trim());
  return parts[parts.length - 1] || "";
}

export function applyCourtFilters(courts: Court[], filters: CourtFilters): Court[] {
  let results = courts;

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.sport.toLowerCase().includes(q) ||
        c.businessName.toLowerCase().includes(q)
    );
  }

  if (filters.sport) {
    results = results.filter((c) => c.sport === filters.sport);
  }

  if (filters.surface) {
    results = results.filter((c) => c.surface === filters.surface);
  }

  if (filters.indoor != null) {
    results = results.filter((c) => c.indoor === filters.indoor);
  }

  if (filters.priceMin != null) {
    results = results.filter((c) => c.pricePerHour >= filters.priceMin!);
  }

  if (filters.priceMax != null) {
    results = results.filter((c) => c.pricePerHour <= filters.priceMax!);
  }

  if (filters.city) {
    const lowerCity = filters.city.toLowerCase();
    results = results.filter((c) =>
      extractCity(c.address).toLowerCase().includes(lowerCity)
    );
  }

  if (filters.minRating != null) {
    results = results.filter((c) => c.rating >= filters.minRating!);
  }

  return results;
}

export async function fetchCourts(
  page: number = 0,
  limit: number = 8,
  filters: CourtFilters = {}
): Promise<PaginatedCourtResult> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const filtered = applyCourtFilters(MOCK_COURTS, filters);
  const start = page * limit;
  const courts = filtered.slice(start, start + limit);
  const hasMore = start + limit < filtered.length;

  return {
    courts,
    nextPage: hasMore ? page + 1 : null,
    total: filtered.length,
  };
}

export async function fetchPopularCourts(
  page: number = 0,
  limit: number = 8,
  filters: CourtFilters = {}
): Promise<PaginatedCourtResult> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const filtered = applyCourtFilters(PROMOTED_COURTS, filters);
  const start = page * limit;
  const courts = filtered.slice(start, start + limit);
  const hasMore = start + limit < filtered.length;

  return {
    courts,
    nextPage: hasMore ? page + 1 : null,
    total: filtered.length,
  };
}

export async function fetchCourtById(id: string): Promise<Court | null> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return MOCK_COURTS.find((c) => c.id === id) ?? null;
}

export async function fetchCourtAvailability(
  courtId: string,
  weekStart: string
): Promise<TimeSlotAvailability[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return generateWeekSlots(courtId, weekStart);
}

export async function createReservation(data: {
  courtId: string;
  courtName: string;
  date: string;
  startHour: number;
  durationHours: number;
  totalPrice: number;
}): Promise<CourtReservation> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const reservation: CourtReservation = {
    id: `res-${Date.now()}`,
    ...data,
    status: "confirmed",
    userName: "Jan Kowalski",
    createdAt: new Date().toISOString(),
  };
  MOCK_RESERVATIONS.push(reservation);
  return reservation;
}

export { MOCK_COURTS, PROMOTED_COURTS } from "@/api/mock-courts";
