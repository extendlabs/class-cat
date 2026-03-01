# Dual Roles Design: Freelance Instructor + Business Owner

## Problem

A freelance instructor who teaches independently may also work for other businesses. The system needs to support this without creating duplicate public pages or scheduling conflicts.

## Decisions Made

- **Role model**: Additive roles on one account (consumer always, + instructor, + business owner)
- **Freelancer public presence**: Instructor page only (`/instructor/[id]`), no phantom business page
- **Activity ownership**: Activities can belong to an instructor directly (freelance) OR to a business
- **Business-instructor relationship**: Partnership/contract model (not employment)
- **Scheduling**: Unified calendar on instructor profile; businesses propose, instructor approves
- **Conflict handling**: Businesses see "unavailable" blocks for other commitments, no details

## Identity & Role Model

One account, additive roles. `UserProfile` unchanged — `businessId?` and `instructorId?` already exist.

| Persona | Public page(s) | Dashboard sections |
|---|---|---|
| Consumer | none | Bookings, Reviews, Settings |
| Freelance instructor | `/instructor/[id]` | Calendar, My Activities, Affiliations, Proposals, Stats |
| Business owner (non-teaching) | `/business/[id]` | Activities, Instructors, Courts, Reviews |
| Business owner + instructor | `/business/[id]` + `/instructor/[id]` | All of the above via role switcher |
| Freelancer + works for businesses | `/instructor/[id]` | Instructor dashboard with unified calendar |

## Activity Ownership

```
Activity
  businessId?      — set when owned by a business
  instructorId?    — set when owned by a freelance instructor
  (at least one must be set)
```

- Freelancer creates activity: `instructorId` = their ID, `businessId` = null
- Business assigns instructor to activity: both IDs set

Instructor public page groups activities:
- "My Classes" — `businessId` is null
- "At [Business Name]" — `businessId` is set

## Business-Instructor Partnerships

```
InstructorAffiliation
  instructorId
  businessId
  status: "pending" | "active" | "ended"
  role: "contractor" | "employee"
  startDate
  endDate?
```

Flow: Business invites instructor -> instructor accepts/rejects -> once active, business can propose slots -> instructor approves/rejects.

Visibility: Businesses see affiliated instructors + their approved schedules + "unavailable" blocks. Instructors see everything.

## Unified Calendar

```
CalendarEntry
  id
  instructorId
  activityId
  businessId?        — null for freelance activities
  status: "confirmed" | "pending_approval" | "cancelled"
  date / startTime / endTime
  recurring?
```

- Freelancer's own activity -> `confirmed` immediately
- Business proposes slot -> `pending_approval` -> instructor approves -> `confirmed`
- Conflict detection: system checks overlaps before allowing proposals

Cross-business visibility: each business sees full details for their own slots, "unavailable" blocks for everything else.

## Dashboard UI

Role switcher (segmented control) at top of dashboard sidebar. Sections:

- **Consumer**: My Bookings, My Reviews, Settings (always visible)
- **Instructor**: Calendar, My Activities, Affiliations, Proposals, Stats, Settings (if `instructorId` exists)
- **Business**: Activities, Instructors, Courts, Reviews, Settings (if `businessId` exists)

Default view = last used role. CTAs for "Become an Instructor" / "Create a Business" when roles not yet unlocked.
