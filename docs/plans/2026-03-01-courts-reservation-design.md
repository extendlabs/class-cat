# Courts Reservation System Design

**Date**: 2026-03-01
**Status**: Approved

## Overview

Enhance courts reservation for both consumer and business sides: specific court selection, shared mock store with service layer, pending-then-confirm flow, and business scheduling features.

## Architecture: Unified Mock Store + Service Layer

### Files

```
src/
├── services/
│   ├── court-store.ts        # Singleton in-memory store
│   └── court-service.ts      # Facade with clean API-shaped methods
├── api/
│   ├── courts.ts             # Consumer API — rewired to use CourtService
│   └── business-portal.ts    # Business API — rewired to use CourtService
```

### CourtStore (singleton)

Three maps:
- `courts: Map<string, Court>` — seeded from merged MOCK_COURTS + MOCK_BUSINESS_COURTS
- `slots: Map<string, SlotState>` — keyed by `courtId:date:hour:courtIndex`, generated on first access per week
- `reservations: Map<string, CourtReservation>` — seeded from merged mock reservations

All mutations go through the store. Simulated delays stay (150-300ms) to mimic network.

### CourtService Facade

```ts
// Consumer-facing
CourtService.getCourts(filters, page) → PaginatedResult<Court>
CourtService.getCourtById(id) → Court | null
CourtService.getAvailability(courtId, weekStart) → TimeSlotAvailability[]
CourtService.getAvailableCourtsForSlots(courtId, slots) → number[]
CourtService.createReservation(data) → CourtReservation  // status: "pending"

// Business-facing
CourtService.getBusinessCourts() → Court[]
CourtService.createCourt(data) → Court
CourtService.updateCourt(id, data) → Court
CourtService.deleteCourt(id) → void
CourtService.getWeekSlots(courtId, weekStart) → TimeSlotAvailability[]
CourtService.getSlotDetails(courtId, date, hour) → CourtSlotDetail[]
CourtService.toggleSlotBlock(courtId, date, hour, courtIndex) → void
CourtService.getReservations(filters?) → CourtReservation[]
CourtService.approveReservation(id) → CourtReservation
CourtService.rejectReservation(id) → CourtReservation

// Recurring blocks
CourtService.getRecurringBlocks(courtId) → RecurringBlock[]
CourtService.createRecurringBlock(data) → RecurringBlock
CourtService.updateRecurringBlock(id, data) → RecurringBlock
CourtService.deleteRecurringBlock(id) → void
```

Existing `api/courts.ts` and `api/business-portal.ts` become thin wrappers calling CourtService. Public signatures unchanged — no UI breakage.

## Court Preference Dropdown (Consumer)

In `CourtReservationSidebar`, below slot summary:
- shadcn `Select` dropdown: "Any available", "Court 1", "Court 2"...
- Only shows courts free across **all** selected slots (via `getAvailableCourtsForSlots`)
- If 1 court free → pre-selected, disabled
- If 0 free → error message

Type additions:
- `CourtsPageState.selectedCourtIndex: number | null` (null = any)
- `CourtsPageAction: SELECT_COURT_INDEX`
- `CourtReservation.courtIndex: number | null`

## Reservation Status Flow

```
User creates → "pending"
                  ↓
    Business approves → "confirmed"
    Business rejects  → "rejected"
    User cancels      → "cancelled"
```

Add `"rejected"` to status union type.

- **Pending**: Slot optimistically locked (shows as booked, prevents double-booking)
- **Approve**: Status → confirmed, slot stays booked
- **Reject**: Status → rejected, slot released back to available
- **Visual**: Pending slots show amber/yellow in business schedule grid

## Business Reservations List (Priority 1)

**Page**: `/profile/business/courts/reservations`

**Table columns**: Customer, Court, Court #, Date, Time, Duration, Price, Status badge, Actions

**Features**:
- Filters: status, court, date range
- Search by customer name
- Sort by date (newest first default)
- Pending reservations pinned to top with highlight
- Actions: Approve/Reject (pending), Cancel (confirmed)
- No bulk actions this iteration

**Components**:
```
src/components/features/business-courts/reservations/
├── ReservationTable.tsx
├── ReservationFilters.tsx
└── ReservationActions.tsx
```

**Service**: `CourtService.getReservations({ courtId?, status?, dateFrom?, dateTo?, search? })`

## Daily Agenda View (Priority 2)

**Location**: Toggle on existing schedule page — "Week grid" / "Day agenda"

**Layout**: Vertical timeline (7-21h Y-axis), court columns side by side. Google Calendar day-view style.

**Cell states**: Available (empty/green), Booked (customer name + status badge), Blocked (striped/gray)

**Components**:
```
src/components/features/business-courts/schedule/
├── DailyAgendaView.tsx
└── AgendaSlotCard.tsx
```

## Recurring Blocks (Priority 2)

**Access**: "Manage recurring blocks" button on schedule page → dialog.

**Model**:
```ts
interface RecurringBlock {
  id: string
  courtId: string
  courtIndices: number[]    // which courts, or all
  dayOfWeek: number         // 0-6
  startHour: number
  endHour: number
  reason: string            // "Maintenance", "League play", custom
  active: boolean
}
```

**UI**: List of rules with add/edit/delete. Form: day of week, time range, courts, reason.

**Integration**: `CourtStore` checks recurring blocks when generating weekly slots — matching slots pre-blocked.

**Components**:
```
src/components/features/business-courts/schedule/
├── RecurringBlocksDialog.tsx
└── RecurringBlockForm.tsx
```

**Service**:
```ts
CourtService.getRecurringBlocks(courtId) → RecurringBlock[]
CourtService.createRecurringBlock(data) → RecurringBlock
CourtService.updateRecurringBlock(id, data) → RecurringBlock
CourtService.deleteRecurringBlock(id) → void
```

## Priority Order

1. **Service layer + shared store** (foundation for everything else)
2. **Court preference dropdown** (consumer enhancement)
3. **Reservation status flow** (pending/approve/reject)
4. **Business reservations list** (priority 1 business feature)
5. **Daily agenda view** (priority 2)
6. **Recurring blocks** (priority 2)
