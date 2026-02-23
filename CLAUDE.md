# ClassCat

Activity discovery platform. Users search/browse local classes and activities. Businesses create and manage activity listings.

## Stack

- **Framework**: Next.js 16 (App Router, RSC enabled)
- **Runtime**: Bun
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + CSS variables
- **UI**: shadcn/ui (new-york style, Radix primitives)
- **Icons**: Phosphor Icons (`@phosphor-icons/react`) primary, Lucide as shadcn default
- **Map**: MapLibre GL + Supercluster for clustering
- **State**: TanStack React Query for server state
- **Fonts**: Plus Jakarta Sans / Geist Mono (via `next/font/google`)
- **Logo**: Cat mascot with graduation cap (`/public/logo-cat.png`)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage — activity list + map split view
│   ├── search/page.tsx     # Search results page
│   ├── activity/[id]/      # Activity detail page
│   ├── business/[id]/      # Business profile page
│   ├── instructor/[id]/    # Instructor profile page
│   ├── dashboard/          # User dashboard
│   ├── layout.tsx          # Root layout (Providers wrapper)
│   └── globals.css         # Theme variables + custom utilities
├── components/
│   ├── ui/                 # shadcn/ui primitives (do not edit directly)
│   ├── features/           # Domain components (cards, map, carousels, etc.)
│   └── layout/             # Navbar, Footer, BottomNav
├── hooks/                  # Custom hooks
├── api/                    # Data fetching + mock data (no real backend yet)
├── lib/                    # Utilities (cn helper)
└── types/                  # TypeScript types (activity, business, user, instructor)
```

## Commands

- `bun dev` — dev server
- `bun run build` — production build
- `bun run lint` — ESLint

## Design System

- **Brand color**: Coral `#FF8A65`, hover `#FF7043`
- **Shadows**: `--shadow-soft`, `--shadow-hover`, `--shadow-float` (CSS custom properties)
- **Radius**: `0.625rem` base, cards use `rounded-xl` / `rounded-2xl`
- **Animations**: `fadeInUp`, `fadeIn`, `slideInRight` keyframes with `cubic-bezier(0.16, 1, 0.3, 1)` easing. Use `<AnimateIn>` component for scroll-triggered reveals.
- Light mode only for now. Dark mode variables exist but are unused.

## Key Patterns

- **Path alias**: `@/*` maps to `./src/*`
- **"use client"** on interactive pages/components. Keep data-fetching logic in client components using TanStack Query for now (no API routes yet).
- **Mock data**: All data lives in `src/api/mock-data.ts` and `src/api/activities.ts` with simulated async delays. When adding new data or endpoints, follow the same pattern.
- **Map markers**: Custom DOM markers (not GeoJSON layers). Styles in `globals.css` under `.cf-*` classes.
- **Infinite scroll**: IntersectionObserver sentinel pattern with `useInfiniteQuery`.
## Conventions

- Use `cn()` from `@/lib/utils` for conditional class merging (clsx + tailwind-merge).
- Prefer Tailwind utility classes. Avoid inline styles except for dynamic values.
- shadcn components go in `src/components/ui/` — add new ones via `bunx shadcn@latest add <component>`.
- Feature components in `src/components/features/`, layout in `src/components/layout/`.
- Types in `src/types/` — one file per domain entity.
- Images from Unsplash (configured in `next.config.ts` remote patterns).

## Two User Roles (planned)

1. **Consumer**: Searches/browses activities, books classes, has a dashboard.
2. **Business**: Creates/manages activity listings, manages instructors, business profile page. (Business dashboard not yet built.)

## What's Not Built Yet

- Backend / database / auth — currently all mock data
- Business dashboard (create/edit activities)
- Booking/payment flow
- User authentication
- Search page functionality (page exists but may be incomplete)
