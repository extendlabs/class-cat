import type { ActivityDetail, Review, RatingDistribution } from "@/types/activity";
import { apiFetch, unwrap } from "@/lib/api-client";

// ── Backend response types ────────────────────────────────────────────────────

interface BackendImage {
  file: string;
}

interface BackendCategory {
  slug: string;
  name: string;
}

interface BackendProvider {
  slug: string;
  name: string;
  isVerified: boolean;
  providerType: "BUSINESS" | "INDIVIDUAL";
}

interface BackendPerson {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  avatar?: string;
  experience?: string;
  verified: boolean;
  contractorSlug?: string;
  personType?: string;
  hasAccount: boolean;
  isInvited: boolean;
}

interface BackendPrice {
  id: number;
  price: string;
  priceType: "UNIT" | "HOUR" | "MONTH" | "YEAR";
  isVisible: boolean;
}

interface BackendSession {
  id: number;
  date: string;
  isCancelled: boolean;
}

interface BackendLocation {
  slug: string;
  name?: string;
  address?: {
    addressLine?: string;
    city?: string;
  };
}

interface BackendCurriculumItem {
  week: number;
  title: string;
  description: string;
}

interface BackendActivity {
  slug: string;
  name: string;
  description?: string;
  provider: BackendProvider;
  categories: BackendCategory[];
  primaryImage?: BackendImage;
  images?: BackendImage[];
  reviewScore?: number;
  reviewCount: number;
  scheduledTime?: string;
  durationMinutes?: number;
  capacity?: number;
  ageMin?: number;
  ageMax?: number;
  isOpen: boolean;
  isPromoted?: boolean;
  person?: BackendPerson;
  prices?: BackendPrice[];
  upcomingSessions?: BackendSession[];
  location?: BackendLocation;
  skillLevel?: string;
  materialsIncluded?: string;
  whatYouLearn?: string[];
  curriculum?: BackendCurriculumItem[];
}

interface BackendReview {
  slug: string;
  rating: number;
  comment: string;
  author: {
    username: string;
    firstName?: string;
    lastName?: string;
  };
  createdAt: string;
}

interface BackendReviewStats {
  score: number;
  count: number;
  percent: number;
}

interface BackendSimpleActivity {
  slug: string;
  name: string;
  description?: string;
  provider: BackendProvider;
  primaryImage?: BackendImage;
  reviewScore?: number;
  categories?: BackendCategory[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const DAY_NAMES_PL = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
const MONTH_NAMES_SHORT_PL = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];

function formatNextDate(sessions: BackendSession[]): string {
  if (!sessions.length) return "";
  const d = new Date(sessions[0].date);
  return `${DAY_NAMES_PL[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES_SHORT_PL[d.getMonth()]}`;
}

function buildAgeRange(ageMin?: number, ageMax?: number): string {
  if (ageMin != null && ageMax != null) return `${ageMin}–${ageMax} lat`;
  if (ageMin != null) return `${ageMin}+ lat`;
  if (ageMax != null) return `do ${ageMax} lat`;
  return "Wszystkie grupy wiekowe";
}

function buildPriceDisplay(prices?: BackendPrice[]): { price: "$" | "$$" | "$$$" | "free"; priceAmount?: number } {
  const visible = prices?.filter((p) => p.isVisible) ?? [];
  if (!visible.length) return { price: "free" };
  const amount = Math.min(...visible.map((p) => parseFloat(p.price)));
  if (amount === 0) return { price: "free", priceAmount: 0 };
  if (amount <= 20) return { price: "$", priceAmount: amount };
  if (amount <= 50) return { price: "$$", priceAmount: amount };
  return { price: "$$$", priceAmount: amount };
}

function buildLocation(loc?: BackendLocation): string {
  if (!loc) return "";
  const addr = loc.address;
  const fallback = loc.name ?? loc.slug;
  if (!addr) return fallback;
  return [addr.addressLine, addr.city].filter(Boolean).join(", ") || fallback;
}

function mapReviews(reviews: BackendReview[]): Review[] {
  return reviews.map((r) => {
    const firstName = r.author.firstName ?? "";
    const lastName = r.author.lastName ?? "";
    const authorName = [firstName, lastName].filter(Boolean).join(" ") || r.author.username;
    const initials =
      [firstName[0], lastName[0]].filter(Boolean).join("").toUpperCase() ||
      r.author.username.slice(0, 2).toUpperCase();
    const date = new Date(r.createdAt).toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    // Backend stores rating 0–10; frontend shows 1–5 stars
    const rating = Math.min(5, Math.max(1, Math.round((r.rating / 10) * 5)));
    return { id: r.slug, authorName, authorInitials: initials, date, rating, text: r.comment };
  });
}

function mapRatingDistribution(stats: BackendReviewStats[]): RatingDistribution[] {
  return stats.map((s) => ({ stars: s.score, percentage: Math.round(s.percent) }));
}

// ── Main fetch ────────────────────────────────────────────────────────────────

export async function getActivityById(slug: string): Promise<ActivityDetail | null> {
  try {
    const [actRes, reviewsRes, statsRes, similarRes] = await Promise.all([
      apiFetch(`/activities/activity/${slug}/`),
      apiFetch(`/activities/activity/${slug}/review/?page_size=50`),
      apiFetch(`/activities/activity/${slug}/review/stats/`),
      apiFetch(`/activities/activity/${slug}/similar/?limit=3`),
    ]);

    if (!actRes.ok) return null;

    const act: BackendActivity = unwrap(await actRes.json());
    const reviews = mapReviews(
      reviewsRes.ok ? (unwrap(await reviewsRes.json()) as BackendReview[]) : []
    );
    const ratingDistribution = mapRatingDistribution(
      statsRes.ok ? (unwrap(await statsRes.json()) as BackendReviewStats[]) : []
    );

    const similarRaw: BackendSimpleActivity[] = similarRes.ok
      ? (unwrap(await similarRes.json()) as BackendSimpleActivity[])
      : [];
    const relatedActivities = (Array.isArray(similarRaw) ? similarRaw : []).map((a) => ({
      id: a.slug,
      title: a.name,
      description: a.description ?? "",
      category: (a.categories?.[0]?.slug ?? "education") as ActivityDetail["category"],
      provider: { name: a.provider.name },
      image: a.primaryImage?.file ?? "",
      rating: a.reviewScore ?? 0,
      reviewCount: 0,
      price: "free" as const,
      distance: 0,
      location: "",
      timeSlots: [],
    }));

    const sessions = act.upcomingSessions ?? [];
    const availableTimes = act.scheduledTime ? [act.scheduledTime.slice(0, 5)] : [];
    const { price, priceAmount } = buildPriceDisplay(act.prices);

    const person = act.person
      ? {
          id: act.person?.id,
          name: act.person?.name,
          title: act.person?.title ?? "",
          avatar: act.person?.avatar ?? "",
          experience: act.person?.experience ?? "",
          bio: act.person?.bio ?? "",
          verified: act.person?.verified,
          hasAccount: act.person?.hasAccount,
          invited: act.person?.isInvited,
        }
      : {
          id: "",
          name: act.provider.name,
          title: "",
          avatar: "",
          experience: "",
          bio: "",
          verified: act.provider.isVerified,
        };

    return {
      id: act.slug,
      title: act.name,
      description: act.description ?? "",
      category: (act.categories[0]?.slug ?? "education") as ActivityDetail["category"],
      provider: { name: act.provider.name, slug: act.provider.slug, providerType: act.provider.providerType },
      image: act.primaryImage?.file ?? "",
      rating: act.reviewScore ?? 0,
      reviewCount: reviews.length || act.reviewCount,
      price,
      priceAmount,
      distance: 0,
      location: buildLocation(act.location),
      timeSlots: [],
      spotsLeft: act.capacity ?? undefined,
      businessId: act.provider.slug,
      contractorId: act.person?.contractorSlug ?? "",
      isPromoted: act.isPromoted ?? false,
      currency: "PLN",
      badges: [
        act.provider.isVerified ? "Zweryfikowane Zajęcia" : null,
        act.capacity ? `Maks. ${act.capacity} uczestników` : null,
      ].filter(Boolean) as string[],
      ageRange: buildAgeRange(act.ageMin, act.ageMax),
      duration: act.durationMinutes ? `${act.durationMinutes} min` : "",
      classType: act.capacity === 1 ? "Zajęcia Indywidualne" : "Zajęcia Grupowe",
      maxStudents: act.capacity ?? 0,
      skillLevel: act.skillLevel ?? "",
      materialsIncluded: act.materialsIncluded ?? "",
      person,
      curriculum: (act.curriculum ?? []).map((item) => ({
        week: item.week,
        title: item.title,
        description: item.description,
      })),
      whatYouLearn: act.whatYouLearn ?? [],
      reviews,
      ratingDistribution,
      gallery: (act.images ?? []).map((img, i) => ({
        src: img.file,
        alt: `Zdjęcie ${i + 1}`,
        caption: `Zdjęcie ${i + 1}`,
      })),
      relatedActivities,
      slotsRemaining: act.capacity ?? 0,
      totalSlots: act.capacity ?? 0,
      availableTimes,
      nextDate: formatNextDate(sessions),
    };
  } catch (e) {
    console.error("[getActivityById]", e);
    return null;
  }
}

// ── Submit review ─────────────────────────────────────────────────────────────

export async function submitActivityReview(
  activityId: string,
  review: { rating: number; text: string; authorName: string; authorInitials: string }
): Promise<Review> {
  // Frontend: 1–5 stars → backend: 0–10 scale
  const backendRating = review.rating * 2;
  const res = await apiFetch(`/activities/activity/${activityId}/review/`, {
    method: "POST",
    body: JSON.stringify({ rating: backendRating, comment: review.text }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = unwrap(await res.json());
  const date = new Date(data.createdAt).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return {
    id: data.slug,
    authorName: review.authorName,
    authorInitials: review.authorInitials,
    date,
    rating: review.rating,
    text: data.comment,
  };
}
