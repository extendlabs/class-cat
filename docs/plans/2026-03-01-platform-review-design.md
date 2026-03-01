# Platform Architecture Review & Consolidation

**Date**: 2026-03-01
**Status**: Approved

## Context

Review of three existing plans (Dual Roles, Courts Reservation, Chat & Enrollment) revealed cross-plan gaps and stale docs. This document captures decisions made to unify the architecture.

## Three Role Variants

| Variant | Affiliation role | Owns activities? | Approves proposals? | Public page |
|---|---|---|---|---|
| Business + employee instructors | `employee` | No | Yes | `/business/[id]` |
| Freelance instructor (influencer) | `contractor` (for biz work) | Yes, via cohorts | Yes | `/instructor/[id]` |
| Pure employee instructor | `employee` | No | Yes | Linked from business page |

### Freelancer Activity Scheduling

Freelancers use the same **cohort-based** system as businesses:

```
Activity: "Advanced Yoga" (freelance, no business)
  └── Cohort: "Spring 2026" (March-June)
        ├── Pattern: Mon 18:00-19:00, Wed 10:00-11:00
        ├── Max participants: 12
        └── Auto-generates CalendarEntries for each session
```

Benefits:
- Consumer experience identical regardless of activity owner (same apply → enroll flow)
- No separate scheduling UI — instructor's "My Activities" page just needs cohort management
- Handles both ongoing (no end date) and fixed-length classes

### Employee vs Contractor

Both still approve/reject schedule proposals. The difference is contractual, not behavioral in the current system. Business assigns, instructor confirms — regardless of role.

## Booking Paradigms — Kept Separate

Two distinct flows, no forced unification:

| | Classes (Enrollment) | Courts (Reservation) |
|---|---|---|
| **Flow** | Apply → accept/reject → join group chat | Book slots → pending → approve/reject |
| **Access** | Creates direct chat, joins cohort group | Transactional confirmation |
| **Capacity** | Cohort-based (max participants) | Per-court per-slot |
| **Relationship** | Ongoing (chat, updates) | One-time |

### Venue Link (Classes at Courts)

Activity gets optional fields:
```typescript
Activity {
  // existing fields...
  courtId?: string       // venue court
  courtIndex?: number    // specific court number
}
```

When a class session is scheduled at a court, the corresponding court slot is auto-blocked. Consumer only interacts with the enrollment flow — court blocking is a backend side-effect.

## Unified Calendar

Single `CalendarEntry` model (exists in `src/types/affiliation.ts`) is the source of truth for ALL scheduled time:

```typescript
CalendarEntry {
  id: string
  instructorId: string
  activityId: string
  businessId?: string        // null for freelance
  status: "confirmed" | "pending_approval" | "cancelled"
  date: string
  startTime: string
  endTime: string
  recurring?: boolean
}
```

### What writes CalendarEntries:

- Freelancer's own class sessions → auto-generated from cohort schedule pattern, status: `confirmed`
- Business proposes slot for instructor → status: `pending_approval`, instructor approves → `confirmed`
- Court-linked classes → CalendarEntry created + court slot blocked in CourtStore

### Conflict Checks

Before any scheduling action, check CalendarEntry for overlaps:
- Business proposes slot → check instructor's calendar
- Freelancer creates cohort → check their own calendar
- Court reservation → check if a class holds that slot

## Consumer Dashboard

```
/profile/dashboard          → overview (next classes + reservations)
/profile/dashboard/classes  → all enrollments by status (upcoming/pending/past)
/profile/dashboard/courts   → all court reservations (upcoming/past)
/profile/liked              → saved activities
/profile/settings           → profile
```

### Overview Page

- **Upcoming Classes**: next 3 sessions — activity name, instructor, date/time, location
- **Pending Applications**: enrollment requests awaiting response
- **Upcoming Reservations**: next 3 court bookings with status
- Quick links to full lists

### Classes Page

Grouped by status:
- **Upcoming**: next session date, activity name, instructor, cohort, "Open Chat" link
- **Pending**: applied but not yet accepted, "View Chat" link
- **Past**: completed cohorts, option to leave review

### Reservations Page

- Upcoming bookings with status (pending/confirmed)
- Cancel button for confirmed reservations (before cancellation deadline)
- Past reservations

## Stale Plan Corrections

### Courts Reservation Plan
- ~~`src/services/court-store.ts`~~ → `src/api/court-store.ts` (already implemented)
- ~~`src/services/court-service.ts`~~ → `src/api/court-service.ts` (already implemented)

### Chat & Enrollment Plan
- ~~`/dashboard/messages`~~ → `/profile/messages` (already implemented)
- ~~`removed_from_group` notification type~~ → `cohort_update` (already implemented)
- Message model matches plan. Conversation model matches plan.

### Dual Roles Plan
- Scheduling section now covered by unified CalendarEntry (this document)
- Freelancer scheduling via cohorts (this document)

## Implementation Status

| Feature | Plan | Status |
|---|---|---|
| Affiliation system | Dual Roles | ✅ Implemented |
| Instructor proposals | Dual Roles | ✅ Implemented |
| Calendar entries | Dual Roles | ✅ Types + mock data |
| Freelance activities | Dual Roles | ✅ API + mock data |
| Court store + service | Courts | ✅ Implemented |
| Court reservation flow | Courts | ✅ Implemented |
| Recurring blocks | Courts | ✅ Implemented |
| Business reservations list | Courts | ✅ Implemented |
| Daily agenda view | Courts | ❌ Not yet |
| Chat system | Chat & Enrollment | ✅ Implemented |
| Enrollment flow | Chat & Enrollment | ✅ Implemented |
| Notifications | Chat & Enrollment | ✅ Implemented |
| Consumer dashboard | This doc | ❌ Not yet |
| Venue link (court + activity) | This doc | ❌ Not yet |
| Cohort schedule patterns | This doc | ❌ Not yet |
| Cross-system conflict checks | This doc | ❌ Not yet |
