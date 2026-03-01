import type {
  Court,
  CourtReservation,
  CourtSlotDetail,
  RecurringBlock,
  TimeSlotAvailability,
} from "@/types/court";
import {
  MOCK_COURTS,
  MOCK_RESERVATIONS,
  MOCK_BUSINESS_COURTS,
  MOCK_BUSINESS_RESERVATIONS,
  MOCK_RECURRING_BLOCKS,
  MOCK_BOOKER_NAMES,
} from "@/api/mock-courts";

const WEEKDAY_PL = [
  "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela",
];

function getOperatingRange(
  court: Court,
  weekdayIndex: number
): { open: number; close: number } | null {
  const dayName = WEEKDAY_PL[weekdayIndex];
  const entry = court.operatingHours.find((h) => h.day === dayName);
  if (!entry || !entry.open || !entry.close) return null;
  return {
    open: parseInt(entry.open.split(":")[0], 10),
    close: parseInt(entry.close.split(":")[0], 10),
  };
}

function seededRandom(seed: number) {
  let rng = seed;
  return () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return (rng % 100) / 100;
  };
}

class CourtStore {
  // Consumer courts (browsing)
  private courts: Court[] = [...MOCK_COURTS];
  private reservations: CourtReservation[] = [...MOCK_RESERVATIONS];

  // Business courts
  private businessCourts: Court[] = [...MOCK_BUSINESS_COURTS];
  private businessReservations: CourtReservation[] = [...MOCK_BUSINESS_RESERVATIONS];

  // Recurring blocks
  private recurringBlocks: RecurringBlock[] = [...MOCK_RECURRING_BLOCKS];

  // Caches
  private slotCache = new Map<string, TimeSlotAvailability[]>();
  private slotDetailCache = new Map<string, CourtSlotDetail[]>();
  private consumerSlotCache = new Map<string, TimeSlotAvailability[]>();

  // ── Consumer Court reads ──

  getCourts(): Court[] {
    return [...this.courts];
  }

  getCourtById(id: string): Court | null {
    return this.courts.find((c) => c.id === id) ?? null;
  }

  // ── Business Court reads ──

  getBusinessCourts(): Court[] {
    return [...this.businessCourts];
  }

  getBusinessCourtById(id: string): Court | undefined {
    return this.businessCourts.find((c) => c.id === id);
  }

  // ── Business Court CRUD ──

  addBusinessCourt(data: Partial<Court>): Court {
    const court: Court = {
      id: `bc-${Date.now()}`,
      name: data.name ?? "New Court",
      sport: data.sport ?? "tennis",
      surface: data.surface ?? "hard",
      indoor: data.indoor ?? false,
      image: data.image ?? "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
      address: data.address ?? "",
      location: "Studio Harmonii",
      lat: 52.215,
      lng: 21.035,
      pricePerHour: data.pricePerHour ?? 80,
      rating: 0,
      reviewCount: 0,
      businessId: "biz-1",
      businessName: "Studio Harmonii",
      amenities: data.amenities ?? [],
      operatingHours: data.operatingHours ?? [
        { day: "Poniedziałek", open: "8:00", close: "20:00" },
        { day: "Wtorek", open: "8:00", close: "20:00" },
        { day: "Środa", open: "8:00", close: "20:00" },
        { day: "Czwartek", open: "8:00", close: "20:00" },
        { day: "Piątek", open: "8:00", close: "20:00" },
        { day: "Sobota", open: "9:00", close: "18:00" },
        { day: "Niedziela", open: "9:00", close: "16:00" },
      ],
      courtCount: data.courtCount ?? 1,
      status: data.status ?? "active",
    };
    this.businessCourts = [court, ...this.businessCourts];
    return court;
  }

  updateBusinessCourt(id: string, data: Partial<Court>): Court {
    this.businessCourts = this.businessCourts.map((c) =>
      c.id === id ? { ...c, ...data } : c
    );
    return this.businessCourts.find((c) => c.id === id)!;
  }

  deleteBusinessCourt(id: string): void {
    this.businessCourts = this.businessCourts.filter((c) => c.id !== id);
  }

  getReservationsByUser(userName: string): CourtReservation[] {
    const all = [...this.reservations, ...this.businessReservations];
    const seen = new Set<string>();
    const results: CourtReservation[] = [];
    for (const r of all) {
      if (r.userName === userName && !seen.has(r.id)) {
        seen.add(r.id);
        results.push(r);
      }
    }
    return results.sort((a, b) => b.date.localeCompare(a.date) || b.startHour - a.startHour);
  }

  // ── Consumer Slot generation ──

  getConsumerWeekSlots(courtId: string, weekStart: string): TimeSlotAvailability[] {
    const key = `consumer-${courtId}-${weekStart}`;
    if (this.consumerSlotCache.has(key)) return [...this.consumerSlotCache.get(key)!];

    const court = this.courts.find((c) => c.id === courtId);
    if (!court) return [];

    const slots: TimeSlotAvailability[] = [];
    const startDate = new Date(weekStart);
    const total = court.courtCount ?? 1;

    const seed = courtId.split("").reduce((a, c) => a + c.charCodeAt(0), 0) + startDate.getTime();
    const random = seededRandom(seed);

    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + d);
      const dateStr = date.toISOString().split("T")[0];

      for (let hour = 7; hour <= 21; hour++) {
        const isWeekend = d >= 5;
        const isPeak = hour >= 17 && hour <= 20;
        const price = isWeekend
          ? Math.round(court.pricePerHour * 1.2)
          : isPeak
            ? Math.round(court.pricePerHour * 1.1)
            : court.pricePerHour;

        const booked = Math.floor(random() * (total + 1));
        const avail = total - booked;

        slots.push({
          courtId,
          date: dateStr,
          hour,
          available: avail > 0,
          price,
          availableCount: avail,
          totalCount: total,
          bookedCount: booked,
        });
      }
    }

    this.consumerSlotCache.set(key, slots);
    return [...slots];
  }

  // ── Business Slot generation ──

  getBusinessWeekSlots(courtId: string, weekStart: string): TimeSlotAvailability[] {
    const key = `${courtId}-${weekStart}`;
    if (this.slotCache.has(key)) return [...this.slotCache.get(key)!];

    const court = this.businessCourts.find((c) => c.id === courtId);
    if (!court) return [];

    const slots: TimeSlotAvailability[] = [];
    const startDate = new Date(weekStart);
    const total = court.courtCount ?? 1;

    const seed = courtId.split("").reduce((a, c) => a + c.charCodeAt(0), 0) + startDate.getTime();
    const random = seededRandom(seed);

    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + d);
      const dateStr = date.toISOString().split("T")[0];
      const range = getOperatingRange(court, d);

      for (let hour = 7; hour <= 21; hour++) {
        if (!range || hour < range.open || hour >= range.close) {
          slots.push({
            courtId,
            date: dateStr,
            hour,
            available: false,
            price: 0,
            availableCount: 0,
            totalCount: total,
            bookedCount: 0,
            closed: true,
          });
          continue;
        }

        // Check recurring blocks
        const blocked = this.recurringBlocks.filter(
          (b) => b.courtId === courtId && b.dayOfWeek === d && hour >= b.startHour && hour < b.endHour
        );
        const blockedCount = blocked.reduce((acc, b) => acc + (b.courtIndex ? 1 : total), 0);

        const isWeekend = d >= 5;
        const isPeak = hour >= 17 && hour <= 20;
        const price = isWeekend
          ? Math.round(court.pricePerHour * 1.2)
          : isPeak
            ? Math.round(court.pricePerHour * 1.1)
            : court.pricePerHour;

        const effectiveTotal = Math.max(0, total - blockedCount);
        const booked = Math.min(Math.floor(random() * (effectiveTotal + 1)), effectiveTotal);
        const avail = effectiveTotal - booked;

        slots.push({
          courtId,
          date: dateStr,
          hour,
          available: avail > 0,
          price,
          availableCount: avail,
          totalCount: total,
          bookedCount: booked,
        });
      }
    }

    this.slotCache.set(key, slots);
    return [...slots];
  }

  getSlotDetails(courtId: string, weekStart: string, date: string, hour: number): CourtSlotDetail[] {
    const cacheKey = `${courtId}-${weekStart}`;
    if (!this.slotCache.has(cacheKey)) {
      this.getBusinessWeekSlots(courtId, weekStart);
    }
    const slots = this.slotCache.get(cacheKey)!;
    const slot = slots.find((s) => s.date === date && s.hour === hour);
    if (!slot) return [];

    const detailKey = `${courtId}-${date}-${hour}`;
    if (this.slotDetailCache.has(detailKey)) return [...this.slotDetailCache.get(detailKey)!];

    const total = slot.totalCount ?? 1;
    const booked = slot.bookedCount ?? 0;
    const avail = slot.availableCount ?? (slot.available ? 1 : 0);
    const blocked = total - booked - avail;
    const seed = detailKey.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

    const details: CourtSlotDetail[] = [];
    let b = 0, bl = 0;
    for (let i = 0; i < total; i++) {
      if (b < booked) {
        details.push({
          courtIndex: i + 1,
          status: "booked",
          bookedBy: MOCK_BOOKER_NAMES[(seed + i) % MOCK_BOOKER_NAMES.length],
        });
        b++;
      } else if (bl < blocked) {
        details.push({ courtIndex: i + 1, status: "blocked" });
        bl++;
      } else {
        details.push({ courtIndex: i + 1, status: "available" });
      }
    }

    this.slotDetailCache.set(detailKey, details);
    return [...details];
  }

  toggleSlot(
    courtId: string,
    weekStart: string,
    date: string,
    hour: number,
    courtIndex: number,
    direction: "block" | "unblock"
  ): { slots: TimeSlotAvailability[]; details: CourtSlotDetail[] } {
    const cacheKey = `${courtId}-${weekStart}`;
    if (!this.slotCache.has(cacheKey)) {
      this.getBusinessWeekSlots(courtId, weekStart);
    }
    const slots = this.slotCache.get(cacheKey)!;
    const slotIdx = slots.findIndex((s) => s.date === date && s.hour === hour);
    if (slotIdx === -1) return { slots: [...slots], details: [] };

    const slot = slots[slotIdx];
    const details = this.getSlotDetails(courtId, weekStart, date, hour);
    const detailKey = `${courtId}-${date}-${hour}`;
    const mutableDetails = this.slotDetailCache.get(detailKey)!;

    const detail = mutableDetails.find((d) => d.courtIndex === courtIndex);
    if (!detail) return { slots: [...slots], details };

    if (direction === "block" && detail.status === "available") {
      detail.status = "blocked";
      const avail = (slot.availableCount ?? 1) - 1;
      slots[slotIdx] = { ...slot, availableCount: avail, available: avail > 0 };
    } else if (direction === "unblock" && detail.status === "blocked") {
      detail.status = "available";
      const avail = (slot.availableCount ?? 0) + 1;
      slots[slotIdx] = { ...slot, availableCount: avail, available: avail > 0 };
    }

    this.slotDetailCache.set(detailKey, [...mutableDetails]);
    return { slots: [...slots], details: [...mutableDetails] };
  }

  // ── Reservations ──

  getAllReservations(): CourtReservation[] {
    return [...this.reservations];
  }

  getBusinessReservations(filters?: {
    courtId?: string;
    status?: CourtReservation["status"];
    search?: string;
  }): CourtReservation[] {
    let results = [...this.businessReservations];
    if (filters?.courtId) {
      results = results.filter((r) => r.courtId === filters.courtId);
    }
    if (filters?.status) {
      results = results.filter((r) => r.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (r) =>
          r.userName?.toLowerCase().includes(q) ||
          r.courtName.toLowerCase().includes(q)
      );
    }
    // Sort: pending first, then by date desc
    results.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return b.date.localeCompare(a.date) || b.startHour - a.startHour;
    });
    return results;
  }

  createReservation(data: {
    courtId: string;
    courtName: string;
    date: string;
    startHour: number;
    durationHours: number;
    totalPrice: number;
    courtIndex?: number | null;
  }): CourtReservation {
    // Auto-assign lowest free court if courtIndex is null
    let assignedIndex = data.courtIndex ?? undefined;
    if (!assignedIndex) {
      const court = this.courts.find((c) => c.id === data.courtId);
      const total = court?.courtCount ?? 1;
      if (total > 1) {
        const hours = Array.from({ length: data.durationHours }, (_, i) => data.startHour + i);
        const available = this.getAvailableCourtIndices(data.courtId, data.date, hours);
        assignedIndex = available.length > 0 ? available[0] : 1;
      } else {
        assignedIndex = 1;
      }
    }

    const reservation: CourtReservation = {
      id: `res-${Date.now()}`,
      courtId: data.courtId,
      courtName: data.courtName,
      date: data.date,
      startHour: data.startHour,
      durationHours: data.durationHours,
      totalPrice: data.totalPrice,
      status: "pending",
      courtIndex: assignedIndex,
      userName: "Jan Kowalski",
      createdAt: new Date().toISOString(),
    };

    this.reservations.push(reservation);
    // Also add to business reservations if the court belongs to business
    const bCourt = this.businessCourts.find((c) => c.id === data.courtId);
    if (bCourt) {
      this.businessReservations.push(reservation);
    }

    return reservation;
  }

  updateReservationStatus(
    id: string,
    status: "confirmed" | "rejected" | "cancelled",
    rejectedReason?: string
  ): CourtReservation | null {
    const update = (list: CourtReservation[]) => {
      const idx = list.findIndex((r) => r.id === id);
      if (idx === -1) return null;
      list[idx] = {
        ...list[idx],
        status,
        ...(rejectedReason ? { rejectedReason } : {}),
      };
      return list[idx];
    };

    const result = update(this.businessReservations) ?? update(this.reservations);
    if (result) {
      // Also update in the other list
      update(this.reservations);
      update(this.businessReservations);
    }
    return result;
  }

  getAvailableCourtIndices(
    courtId: string,
    date: string,
    hours: number[]
  ): number[] {
    const court = this.courts.find((c) => c.id === courtId) ??
      this.businessCourts.find((c) => c.id === courtId);
    if (!court) return [];

    const total = court.courtCount ?? 1;
    if (total <= 1) return [1];

    // Find which court indices are booked for ALL requested hours
    const bookedIndices = new Set<number>();
    const activeReservations = [...this.reservations, ...this.businessReservations]
      .filter(
        (r) =>
          r.courtId === courtId &&
          r.date === date &&
          r.status !== "cancelled" &&
          r.status !== "rejected"
      );

    for (const res of activeReservations) {
      const resHours = Array.from({ length: res.durationHours }, (_, i) => res.startHour + i);
      const overlaps = hours.some((h) => resHours.includes(h));
      if (overlaps && res.courtIndex) {
        bookedIndices.add(res.courtIndex);
      }
    }

    const available: number[] = [];
    for (let i = 1; i <= total; i++) {
      if (!bookedIndices.has(i)) available.push(i);
    }
    return available;
  }

  // ── Recurring Blocks ──

  getRecurringBlocks(courtId?: string): RecurringBlock[] {
    if (courtId) return this.recurringBlocks.filter((b) => b.courtId === courtId);
    return [...this.recurringBlocks];
  }

  createRecurringBlock(data: Omit<RecurringBlock, "id">): RecurringBlock {
    const block: RecurringBlock = { id: `rb-${Date.now()}`, ...data };
    this.recurringBlocks.push(block);
    // Invalidate slot caches for this court
    this.invalidateCourtSlotCaches(data.courtId);
    return block;
  }

  updateRecurringBlock(id: string, data: Partial<RecurringBlock>): RecurringBlock | null {
    const idx = this.recurringBlocks.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    this.recurringBlocks[idx] = { ...this.recurringBlocks[idx], ...data };
    this.invalidateCourtSlotCaches(this.recurringBlocks[idx].courtId);
    return this.recurringBlocks[idx];
  }

  deleteRecurringBlock(id: string): void {
    const block = this.recurringBlocks.find((b) => b.id === id);
    this.recurringBlocks = this.recurringBlocks.filter((b) => b.id !== id);
    if (block) this.invalidateCourtSlotCaches(block.courtId);
  }

  private invalidateCourtSlotCaches(courtId: string): void {
    for (const key of this.slotCache.keys()) {
      if (key.startsWith(courtId)) this.slotCache.delete(key);
    }
    for (const key of this.slotDetailCache.keys()) {
      if (key.startsWith(courtId)) this.slotDetailCache.delete(key);
    }
  }
}

// Singleton
export const courtStore = new CourtStore();
