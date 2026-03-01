# Chat & Enrollment System Design

## Overview

Unified chat system for ClassCat with two conversation types: **direct** (1-on-1 enrollment chats) and **group** (per-cohort activity chats). Logistics-first purpose — schedule changes, coordination, quick Q&A.

## Core Decisions

- **Approach**: Unified chat (single system, single UI for both direct and group)
- **Access model**: Chat unlocks via enrollment application. No cold messaging.
- **Group chat**: Per cohort/session. Everyone can message (WhatsApp-style).
- **Messages**: Text only for now. System messages for join/leave events.
- **On leave/removal**: Removed from group chat. Direct chat history preserved.
- **Notifications**: In-app only (bell icon + unread count). No push/email yet.

## Data Model

### Conversation

```typescript
type ConversationType = "direct" | "group"
type ConversationStatus = "pending" | "active" | "archived"

interface Conversation {
  id: string
  type: ConversationType
  status: ConversationStatus        // pending = enrollment request, active = accepted/ongoing

  // Group-specific
  activityId?: string
  cohortId?: string
  name?: string                     // e.g. "Yoga Mondays - March 2026"

  // Direct-specific
  enrollmentStatus?: "pending" | "accepted" | "rejected"

  participants: Participant[]
  lastMessage?: MessagePreview
  createdAt: string
  updatedAt: string
}

interface Participant {
  userId: string
  name: string
  avatar?: string
  role: "consumer" | "instructor" | "business"
  joinedAt: string
}
```

### Message

```typescript
type MessageType = "text" | "system"

interface Message {
  id: string
  conversationId: string
  senderId: string                   // "system" for system messages
  type: MessageType
  text: string
  createdAt: string
}

interface MessagePreview {
  text: string
  senderId: string
  createdAt: string
}
```

### Cohort

```typescript
interface Cohort {
  id: string
  activityId: string
  name: string                      // e.g. "March 2026", "Monday Evening Group"
  startDate: string
  endDate?: string
  maxParticipants: number
  currentParticipants: number
  status: "upcoming" | "active" | "completed"
  conversationId?: string           // linked group chat
}
```

### Enrollment Request

```typescript
interface EnrollmentRequest {
  id: string
  conversationId: string            // links to direct chat
  activityId: string
  cohortId: string
  userId: string
  userName: string
  userAvatar?: string
  status: "pending" | "accepted" | "rejected"
  appliedAt: string
  resolvedAt?: string
}
```

### Notification

```typescript
interface Notification {
  id: string
  userId: string
  type: "enrollment_request" | "enrollment_accepted" | "enrollment_rejected" | "new_message" | "removed_from_group"
  title: string
  body: string
  link: string                      // e.g. "/dashboard/messages/conv-123"
  read: boolean
  createdAt: string
}
```

### Key Relationships

- 1 Activity has many Cohorts
- 1 Cohort has 1 Group Conversation (created when first user accepted)
- 1 Enrollment creates 1 Direct Conversation + 1 EnrollmentRequest
- Accepting enrollment adds user to Cohort's Group Conversation

## User Flows

### Flow 1: Consumer Applies

1. Activity page shows available cohorts with spots remaining
2. Consumer selects cohort → clicks "Apply"
3. System creates `EnrollmentRequest` (status: pending)
4. System creates `Conversation` (type: direct, status: pending) with consumer + business/instructor
5. Consumer can message in the direct chat ("Is this suitable for beginners?")
6. Business receives notification: "New application from {user} for {activity} - {cohort}"

### Flow 2: Business Accepts/Rejects

**Accept:**
1. Business clicks Accept (from requests tab or chat header)
2. `EnrollmentRequest.status` → "accepted"
3. `Conversation.enrollmentStatus` → "accepted"
4. User added to group conversation for that cohort
5. System message in group: "{user} joined"
6. Consumer notified: "You've been accepted to {activity} - {cohort}!"
7. Activity page button changes: "Apply" → "Enrolled" (links to group chat)

**Reject:**
1. Business clicks Reject
2. `EnrollmentRequest.status` → "rejected"
3. Direct conversation remains active (business can explain reasoning)
4. Consumer notified: "Your application to {activity} was not accepted"

### Flow 3: Group Chat Usage

- All participants + instructor can send text messages
- System messages for member join/leave
- Instructor/business posts logistics: "Class moved to Room B tomorrow"

### Flow 4: User Leaves / Is Removed

1. User removed from Group Conversation participants
2. System message: "{user} left the group"
3. User loses group chat access
4. Direct conversation history preserved

## UI Structure

### Pages

| Route | Purpose |
|---|---|
| `/dashboard/messages` | Conversation list — All / Groups tabs |
| `/dashboard/messages/[conversationId]` | Chat thread view |

### Chat List (`/dashboard/messages`)

- Tabs: All, Groups
- Each row: avatar, name, last message preview, timestamp, unread badge
- Direct chats: other person's name/avatar
- Group chats: activity name + cohort, group icon
- Pending enrollments: "Pending" badge

### Chat Thread (`/dashboard/messages/[conversationId]`)

- Header: conversation name, participant count (groups), back button
- Message bubbles: left (others) / right (you)
- Sender name shown in group chats
- System messages: centered, muted style
- Text input at bottom
- Business sees Accept/Reject buttons in header for pending direct chats

### Activity Page Changes

- Cohort selector (list of available sessions with spots remaining)
- "Apply" button → "Application Pending" (disabled) → "Enrolled" (links to chat)

### Business Dashboard Additions

- "Requests" tab: pending enrollment requests with [View Chat] [Accept] [Reject]
- Per-cohort participant management within activity management

### Notifications

- Bell icon in navbar with unread count
- Dropdown with recent notifications
- Click navigates to relevant chat/request

## Notification Events

| Event | Recipient | Message |
|---|---|---|
| User applies | Business/Instructor | "New application from {user} for {activity} - {cohort}" |
| Accepted | Consumer | "You've been accepted to {activity} - {cohort}!" |
| Rejected | Consumer | "Your application to {activity} was not accepted" |
| New message (direct) | Other participant | "{sender}: {preview}" |
| New message (group) | All except sender | "{sender} in {group}: {preview}" |
| User removed | Removed user | "You've been removed from {activity}" |
