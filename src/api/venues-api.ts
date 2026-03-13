/**
 * venues-api.ts
 * Calls the real Django backend at /api/v1/venues/.
 * Falls back to mock data (court-store) on error.
 *
 * IMPORTANT: This file must NOT import from courts.ts or court-service.ts
 * to avoid circular module dependencies. Use court-store directly.
 */

import { courtStore } from "@/api/court-store";
import { apiFetch, unwrap } from "@/lib/api-client";
import type {
  Court,
  CourtFilters,
  CourtReservation,
  CourtSurface,
  TimeSlotAvailability,
  VenueAPI,
  VenueDetailAPI,
  VenueReservationAPI,
  TimeSlotAvailabilityAPI,
} from "@/types/court";

// CourtFilters is defined in courts.ts but re-exported — to avoid circular import
// we accept it via the type import from types/court.ts (not from courts.ts)
// Note: CourtFilters is exported from courts.ts but the TYPE is defined there too.
// We keep it as an interface import only.

// ── Mappers ───────────────────────────────────────────────────────────────────

function mapVenueToCourt(v: VenueAPI): Court {
  return {
    id: String(v.id),
    name: v.name,
    sport: v.sportType,
    surface: (v.surface || "hard") as CourtSurface,
    indoor: v.indoor,
    image: v.image ?? "",
    address: v.address,
    location: v.address,
    lat: v.lat ? parseFloat(v.lat) : 0,
    lng: v.lng ? parseFloat(v.lng) : 0,
    pricePerHour: parseFloat(v.defaultPricePerHour),
    rating: v.rating,
    reviewCount: v.reviewCount,
    businessId: String(v.providerId),
    businessName: v.providerName,
    amenities: v.amenities,
    operatingHours: [],
    courtCount: v.courtCount,
    status: v.status,
    isPromoted: v.isPromoted,
  };
}

function mapVenueDetailToCourt(v: VenueDetailAPI): Court {
  return {
    ...mapVenueToCourt(v),
    operatingHours: v.operatingHours
      .filter((h) => !h.isClosed)
      .map((h) => ({
        day: String(h.dayOfWeek),
        open: h.openTime.slice(0, 5),
        close: h.closeTime.slice(0, 5),
      })),
  };
}

function mapTimeSlot(s: TimeSlotAvailabilityAPI): TimeSlotAvailability {
  return {
    courtId: s.courtId,
    date: s.date,
    hour: s.hour,
    available: s.available,
    price: parseFloat(s.price),
    availableCount: s.availableCount,
    totalCount: s.totalCount,
    bookedCount: s.bookedCount,
    closed: s.closed,
  };
}

function mapReservation(r: VenueReservationAPI): CourtReservation {
  return {
    id: String(r.id),
    courtId: r.courtId ? String(r.courtId) : String(r.venueId),
    courtName: r.courtName ?? r.venueName,
    date: r.date,
    startHour: r.startHour,
    durationHours: r.durationHours,
    totalPrice: parseFloat(r.totalPrice),
    status: r.status,
    rejectedReason: r.rejectedReason || undefined,
    userName: r.userName,
    createdAt: r.createdAt,
  };
}

function buildFilterParams(filters: CourtFilters): Record<string, string> {
  const p: Record<string, string> = {};
  if (filters.query) p.search = filters.query;
  if (filters.sport) p.sport_type = filters.sport;
  if (filters.surface) p.surface = filters.surface;
  if (filters.indoor != null) p.indoor = String(filters.indoor);
  if (filters.priceMin != null) p.price_min = String(filters.priceMin);
  if (filters.priceMax != null) p.price_max = String(filters.priceMax);
  if (filters.city) p.city = filters.city;
  return p;
}

// Inline filter logic to avoid importing from courts.ts (circular dep)
function applyFilters(courts: Court[], filters: CourtFilters): Court[] {
  let results = courts;
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.sport.toLowerCase().includes(q) ||
        c.businessName.toLowerCase().includes(q)
    );
  }
  if (filters.sport) results = results.filter((c) => c.sport === filters.sport);
  if (filters.surface) results = results.filter((c) => c.surface === filters.surface);
  if (filters.indoor != null) results = results.filter((c) => c.indoor === filters.indoor);
  if (filters.priceMin != null) results = results.filter((c) => c.pricePerHour >= filters.priceMin!);
  if (filters.priceMax != null) results = results.filter((c) => c.pricePerHour <= filters.priceMax!);
  if (filters.city) {
    const lc = filters.city.toLowerCase();
    results = results.filter((c) => c.address.toLowerCase().includes(lc));
  }
  if (filters.minRating != null) results = results.filter((c) => c.rating >= filters.minRating!);
  return results;
}

// ── Consumer API ──────────────────────────────────────────────────────────────

interface PaginatedCourtResult {
  courts: Court[];
  nextPage: number | null;
  total: number;
}

// Paginated response structure from SuccessCamelCaseJSONRenderer:
// { success: true, count: N, next: "url"|null, data: [...items] }
// Single object: { success: true, data: {...item} }

export async function fetchVenues(
  page = 0,
  limit = 8,
  filters: CourtFilters = {}
): Promise<PaginatedCourtResult> {
  try {
    const params = new URLSearchParams({
      page: String(page + 1),
      page_size: String(limit),
      ...buildFilterParams(filters),
    });
    const res = await apiFetch(`/venues/venue/?${params}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    // Paginated: { success, count, next, data: [...] }
    const items: VenueAPI[] = json.data ?? json;
    return {
      courts: items.map(mapVenueToCourt),
      nextPage: json.next ? page + 1 : null,
      total: json.count ?? items.length,
    };
  } catch {
    const all = courtStore.getCourts();
    const filtered = applyFilters(all, filters);
    const start = page * limit;
    return {
      courts: filtered.slice(start, start + limit),
      nextPage: start + limit < filtered.length ? page + 1 : null,
      total: filtered.length,
    };
  }
}

export async function fetchVenueById(id: string): Promise<Court | null> {
  try {
    const res = await apiFetch(`/venues/venue/${id}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const venue: VenueDetailAPI = unwrap(await res.json());
    return mapVenueDetailToCourt(venue);
  } catch {
    return courtStore.getCourtById(id);
  }
}

export async function fetchVenueAvailability(
  venueId: string,
  weekStart: string
): Promise<TimeSlotAvailability[]> {
  try {
    const res = await apiFetch(`/venues/venue/${venueId}/availability/?date=${weekStart}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items: TimeSlotAvailabilityAPI[] = unwrap(await res.json());
    return items.map(mapTimeSlot);
  } catch {
    return courtStore.getConsumerWeekSlots(venueId, weekStart);
  }
}

export async function createVenueReservation(data: {
  venueId: string;
  courtId?: number | null;
  date: string;
  startHour: number;
  durationHours: number;
  notes?: string;
  courtName?: string;
  totalPrice?: number;
  courtIndex?: number | null;
}): Promise<CourtReservation> {
  try {
    const res = await apiFetch("/venues/reservation/", {
      method: "POST",
      body: JSON.stringify({
        venue_id: data.venueId,
        court_id: data.courtId ?? null,
        date: data.date,
        start_hour: data.startHour,
        duration_hours: data.durationHours,
        notes: data.notes ?? "",
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const reservation: VenueReservationAPI = unwrap(await res.json());
    return mapReservation(reservation);
  } catch {
    return courtStore.createReservation({
      courtId: data.venueId,
      courtName: data.courtName ?? "",
      date: data.date,
      startHour: data.startHour,
      durationHours: data.durationHours,
      totalPrice: data.totalPrice ?? 0,
      courtIndex: data.courtIndex,
    });
  }
}

export async function fetchMyVenueReservations(): Promise<CourtReservation[]> {
  try {
    const res = await apiFetch("/venues/reservation/");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const items: VenueReservationAPI[] = json.data ?? json;
    return items.map(mapReservation);
  } catch {
    return [];
  }
}

export async function cancelVenueReservation(id: string): Promise<CourtReservation> {
  const res = await apiFetch(`/venues/reservation/${id}/cancel/`, { method: "PATCH" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const reservation: VenueReservationAPI = unwrap(await res.json());
  return mapReservation(reservation);
}

// ── Business API ──────────────────────────────────────────────────────────────

export async function fetchBusinessVenues(): Promise<Court[]> {
  try {
    const res = await apiFetch("/venues/business/venue/");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const items: VenueAPI[] = json.data ?? json;
    return items.map(mapVenueToCourt);
  } catch {
    return courtStore.getBusinessCourts();
  }
}

export async function fetchBusinessVenueById(id: string): Promise<Court | null> {
  try {
    const res = await apiFetch(`/venues/business/venue/${id}/`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const venue: VenueDetailAPI = unwrap(await res.json());
    return mapVenueDetailToCourt(venue);
  } catch {
    return courtStore.getBusinessCourtById(id) ?? null;
  }
}

export async function createBusinessVenue(data: Partial<Court>): Promise<Court> {
  const res = await apiFetch("/venues/business/venue/", {
    method: "POST",
    body: JSON.stringify({
      name: data.name,
      sport_type: data.sport,
      surface: data.surface,
      indoor: data.indoor,
      default_price_per_hour: data.pricePerHour,
      address: data.address,
      lat: data.lat,
      lng: data.lng,
      amenities: data.amenities ?? [],
      status: data.status ?? "active",
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const venue: VenueAPI = unwrap(await res.json());
  return mapVenueToCourt(venue);
}

export async function updateBusinessVenue(id: string, data: Partial<Court>): Promise<Court> {
  const res = await apiFetch(`/venues/business/venue/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({
      ...(data.name && { name: data.name }),
      ...(data.sport && { sport_type: data.sport }),
      ...(data.surface && { surface: data.surface }),
      ...(data.indoor != null && { indoor: data.indoor }),
      ...(data.pricePerHour != null && { default_price_per_hour: data.pricePerHour }),
      ...(data.address && { address: data.address }),
      ...(data.status && { status: data.status }),
      ...(data.amenities && { amenities: data.amenities }),
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const venue: VenueAPI = unwrap(await res.json());
  return mapVenueToCourt(venue);
}

export async function deleteBusinessVenue(id: string): Promise<void> {
  const res = await apiFetch(`/venues/business/venue/${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function fetchBusinessVenueSchedule(
  venueId: string,
  weekStart: string
): Promise<TimeSlotAvailability[]> {
  try {
    const res = await apiFetch(`/venues/business/venue/${venueId}/schedule/?date=${weekStart}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items: TimeSlotAvailabilityAPI[] = unwrap(await res.json());
    return items.map(mapTimeSlot);
  } catch {
    return courtStore.getBusinessWeekSlots(venueId, weekStart);
  }
}

export async function fetchBusinessVenueReservations(
  venueId?: string
): Promise<CourtReservation[]> {
  try {
    const url = venueId
      ? `/venues/business/venue/${venueId}/reservations/`
      : "/venues/business/reservation/";
    const res = await apiFetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const items: VenueReservationAPI[] = json.data ?? json;
    return items.map(mapReservation);
  } catch {
    return [];
  }
}

export async function updateVenueReservationStatus(
  id: string,
  status: "confirmed" | "rejected" | "cancelled",
  rejectedReason?: string
): Promise<CourtReservation> {
  const res = await apiFetch(`/venues/business/reservation/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({ status, rejected_reason: rejectedReason ?? "" }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const reservation: VenueReservationAPI = unwrap(await res.json());
  return mapReservation(reservation);
}
