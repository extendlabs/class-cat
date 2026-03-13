import { MOCK_COURTS, PROMOTED_COURTS } from "@/api/mock-courts";
import { fetchAvailableCourtIndices as fetchAvailableCourtIndicesService } from "@/api/court-service";
import {
  fetchVenues,
  fetchVenueById,
  fetchVenueAvailability,
  createVenueReservation,
} from "@/api/venues-api";
import type { Court, CourtFilters, TimeSlotAvailability, CourtReservation } from "@/types/court";

export type { CourtFilters };

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
  return fetchVenues(page, limit, filters);
}

export async function fetchPopularCourts(
  page: number = 0,
  limit: number = 8,
  filters: CourtFilters = {}
): Promise<PaginatedCourtResult> {
  return fetchVenues(page, limit, { ...filters });
}

export async function fetchCourtById(id: string): Promise<Court | null> {
  return fetchVenueById(id);
}

export async function fetchCourtAvailability(
  courtId: string,
  weekStart: string
): Promise<TimeSlotAvailability[]> {
  return fetchVenueAvailability(courtId, weekStart);
}

export async function createReservation(data: {
  courtId: string;
  courtName: string;
  date: string;
  startHour: number;
  durationHours: number;
  totalPrice: number;
  courtIndex?: number | null;
}): Promise<CourtReservation> {
  return createVenueReservation({
    venueId: data.courtId,
    date: data.date,
    startHour: data.startHour,
    durationHours: data.durationHours,
    courtName: data.courtName,
    totalPrice: data.totalPrice,
    courtIndex: data.courtIndex,
  });
}

export { fetchAvailableCourtIndicesService as fetchAvailableCourtIndices };

export { MOCK_COURTS, PROMOTED_COURTS } from "@/api/mock-courts";
