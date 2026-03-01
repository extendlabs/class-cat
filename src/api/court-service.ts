import { courtStore } from "@/api/court-store";
import type {
  Court,
  CourtReservation,
  CourtSlotDetail,
  RecurringBlock,
  TimeSlotAvailability,
} from "@/types/court";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── Consumer-facing ──

export async function fetchCourtsFromStore(): Promise<Court[]> {
  await delay(200);
  return courtStore.getCourts();
}

export async function fetchCourtByIdFromStore(id: string): Promise<Court | null> {
  await delay(150);
  return courtStore.getCourtById(id);
}

export async function fetchConsumerWeekSlots(
  courtId: string,
  weekStart: string
): Promise<TimeSlotAvailability[]> {
  await delay(300);
  return courtStore.getConsumerWeekSlots(courtId, weekStart);
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
  await delay(500);
  return courtStore.createReservation(data);
}

export async function fetchAvailableCourtIndices(
  courtId: string,
  date: string,
  hours: number[]
): Promise<number[]> {
  await delay(150);
  return courtStore.getAvailableCourtIndices(courtId, date, hours);
}

export async function fetchUserCourtReservations(userName: string): Promise<CourtReservation[]> {
  await delay(250);
  return courtStore.getReservationsByUser(userName);
}

// ── Business-facing ──

export async function fetchBusinessCourts(): Promise<Court[]> {
  await delay(300);
  return courtStore.getBusinessCourts();
}

export async function fetchBusinessCourt(id: string): Promise<Court | undefined> {
  await delay(200);
  return courtStore.getBusinessCourtById(id);
}

export async function createBusinessCourt(data: Partial<Court>): Promise<Court> {
  await delay(400);
  return courtStore.addBusinessCourt(data);
}

export async function updateBusinessCourt(id: string, data: Partial<Court>): Promise<Court> {
  await delay(300);
  return courtStore.updateBusinessCourt(id, data);
}

export async function deleteBusinessCourt(id: string): Promise<void> {
  await delay(300);
  courtStore.deleteBusinessCourt(id);
}

export async function fetchCourtWeekSlots(
  courtId: string,
  weekStart: string
): Promise<TimeSlotAvailability[]> {
  await delay(300);
  return courtStore.getBusinessWeekSlots(courtId, weekStart);
}

export async function fetchSlotDetails(
  courtId: string,
  weekStart: string,
  date: string,
  hour: number
): Promise<CourtSlotDetail[]> {
  await delay(150);
  return courtStore.getSlotDetails(courtId, weekStart, date, hour);
}

export async function toggleSingleCourtSlot(
  courtId: string,
  weekStart: string,
  date: string,
  hour: number,
  courtIndex: number,
  direction: "block" | "unblock"
): Promise<{ slots: TimeSlotAvailability[]; details: CourtSlotDetail[] }> {
  await delay(150);
  return courtStore.toggleSlot(courtId, weekStart, date, hour, courtIndex, direction);
}

export async function fetchBusinessCourtReservations(
  filters?: {
    courtId?: string;
    status?: CourtReservation["status"];
    search?: string;
  }
): Promise<CourtReservation[]> {
  await delay(250);
  return courtStore.getBusinessReservations(filters);
}

export async function updateReservationStatus(
  id: string,
  status: "confirmed" | "rejected" | "cancelled",
  rejectedReason?: string
): Promise<CourtReservation | null> {
  await delay(300);
  return courtStore.updateReservationStatus(id, status, rejectedReason);
}

// ── Recurring Blocks ──

export async function fetchRecurringBlocks(courtId?: string): Promise<RecurringBlock[]> {
  await delay(200);
  return courtStore.getRecurringBlocks(courtId);
}

export async function createRecurringBlock(
  data: Omit<RecurringBlock, "id">
): Promise<RecurringBlock> {
  await delay(300);
  return courtStore.createRecurringBlock(data);
}

export async function updateRecurringBlock(
  id: string,
  data: Partial<RecurringBlock>
): Promise<RecurringBlock | null> {
  await delay(300);
  return courtStore.updateRecurringBlock(id, data);
}

export async function deleteRecurringBlock(id: string): Promise<void> {
  await delay(300);
  courtStore.deleteRecurringBlock(id);
}
