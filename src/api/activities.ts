import { ALL_ACTIVITIES, PROMOTED_ACTIVITIES, type BrowseActivity } from "@/api/mock-data";
import { apiFetch, unwrap } from "@/lib/api-client";

export interface BrowseFilters {
  query?: string;
  categories?: string[];
  price?: string;
  priceMin?: number;
  priceMax?: number;
  distance?: string;
  times?: string[];
  groupType?: string;
  ageRange?: string;
  minRating?: number;
  city?: string;
  cities?: string[];
  // Backward compat (single-value from URL)
  category?: string;
  time?: string;
}

interface PaginatedResult {
  activities: BrowseActivity[];
  nextPage: number | null;
  total: number;
}

const PRICE_RANGES: Record<string, [number, number]> = {
  free: [0, 0],
  $: [1, 20],
  $$: [21, 50],
  $$$: [51, Infinity],
};

const DISTANCE_MAX: Record<string, number> = {
  "1km": 1,
  "5km": 5,
  "10km": 10,
  "25km": 25,
};

function extractCity(address: string): string {
  const parts = address.split(",").map((s) => s.trim());
  return parts[parts.length - 1] || "";
}

export function applyBrowseFilters(activities: BrowseActivity[], filters: BrowseFilters): BrowseActivity[] {
  let results = activities;

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.address.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.provider?.toLowerCase().includes(q) ?? false) ||
        a.location.toLowerCase().includes(q)
    );
  }

  // Categories (multiselect) — falls back to singular `category`
  const cats = filters.categories?.length ? filters.categories : filters.category ? [filters.category] : [];
  if (cats.length > 0) {
    results = results.filter((a) => cats.includes(a.category));
  }

  // Price range slider
  if (filters.priceMin != null || filters.priceMax != null) {
    const min = filters.priceMin ?? 0;
    const max = filters.priceMax ?? Infinity;
    results = results.filter((a) => a.price >= min && a.price <= max);
  } else if (filters.price) {
    // Legacy price bucket
    const range = PRICE_RANGES[filters.price];
    if (range) {
      results = results.filter((a) => a.price >= range[0] && a.price <= range[1]);
    }
  }

  if (filters.distance) {
    const max = DISTANCE_MAX[filters.distance];
    if (max) {
      const distNum = (d: string) => parseFloat(d.replace(/[^\d.]/g, "")) || 0;
      results = results.filter((a) => distNum(a.distance) <= max);
    }
  }

  // Group type
  if (filters.groupType && filters.groupType !== "both") {
    results = results.filter((a) => a.groupType === filters.groupType);
  }

  // Age range
  if (filters.ageRange) {
    const ar = filters.ageRange;
    results = results.filter((a) => {
      const age = a.ageRange.toLowerCase();
      if (ar === "all") return age.includes("all");
      if (ar === "0-6") return age.includes("0-") || age.includes("3-") || age.includes("5-");
      if (ar === "6-12") return age.includes("6-") || age.includes("8-") || age.includes("5-12") || age.includes("10");
      if (ar === "12-18") return age.includes("12") || age.includes("14") || age.includes("16") || age.includes("teens");
      if (ar === "18+") return age.includes("adult") || age.includes("18+") || age.includes("16+");
      if (ar === "60+") return age.includes("60+") || age.includes("senior");
      return true;
    });
  }

  // Minimum rating
  if (filters.minRating != null) {
    results = results.filter((a) => a.rating >= filters.minRating!);
  }

  // Cities (multiselect) — falls back to singular `city`
  const cityList = filters.cities?.length ? filters.cities : filters.city ? [filters.city] : [];
  if (cityList.length > 0) {
    const lowerCities = cityList.map((c) => c.toLowerCase());
    results = results.filter((a) => lowerCities.includes(extractCity(a.address).toLowerCase()));
  }

  return results;
}

// ── Backend integration ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSearchResultToActivity(a: any): BrowseActivity {
  const ageMin = a.ageMin ?? null;
  const ageMax = a.ageMax ?? null;
  let ageRange = "All ages";
  if (ageMin !== null && ageMax !== null) ageRange = `${ageMin}–${ageMax}`;
  else if (ageMin !== null) ageRange = `${ageMin}+`;
  else if (ageMax !== null) ageRange = `0–${ageMax}`;

  return {
    id: a.id ?? "",
    title: a.title ?? "",
    image: a.image ?? "",
    location: a.location ?? "",
    address: a.address ?? "",
    distance: "",
    ageRange,
    rating: a.rating ?? 0,
    reviewCount: a.reviewCount ?? 0,
    price: typeof a.price === "string" ? parseFloat(a.price) : (a.price ?? 0),
    category: a.category ?? "",
    lat: a.lat ?? 0,
    lng: a.lng ?? 0,
    isPromoted: a.isPromoted ?? false,
    provider: a.provider ?? undefined,
    businessId: a.providerSlug ?? undefined,
    instructorId: a.instructorSlug ?? undefined,
  };
}

function buildSearchParams(filters: BrowseFilters, category: string | null): string {
  const p = new URLSearchParams();
  if (filters.query) p.set("search", filters.query);
  const cats = filters.categories?.length
    ? filters.categories
    : filters.category
    ? [filters.category]
    : category
    ? [category]
    : [];
  cats.forEach((c) => p.append("category", c));
  if (filters.priceMin != null) p.set("price_0", String(filters.priceMin));
  if (filters.priceMax != null) p.set("price_1", String(filters.priceMax));
  return p.toString();
}

// Module-level cache so paginated calls don't re-fetch the same data.
const _cache = new Map<string, BrowseActivity[]>();

async function fetchAllFromBackend(
  filters: BrowseFilters,
  category: string | null
): Promise<BrowseActivity[]> {
  const key = buildSearchParams(filters, category);
  if (_cache.has(key)) return _cache.get(key)!;

  const qs = key ? `?${key}` : "";
  const res = await apiFetch(`/activities/map-search-combined/${qs}`);
  if (!res.ok) return [];

  const raw = unwrap(await res.json());
  const list: BrowseActivity[] = (Array.isArray(raw) ? raw : raw?.results ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any) => mapSearchResultToActivity(a)
  );
  _cache.set(key, list);
  return list;
}

export async function fetchActivities(
  page: number = 0,
  limit: number = 8,
  category: string | null = null,
  filters: BrowseFilters = {}
): Promise<PaginatedResult> {
  let all = await fetchAllFromBackend(filters, category);

  // Fallback to mock if backend returned nothing
  if (all.length === 0) {
    const mergedFilters: BrowseFilters = { ...filters };
    if (category) mergedFilters.category = category;
    all = applyBrowseFilters(ALL_ACTIVITIES, mergedFilters);
  }

  const start = page * limit;
  return {
    activities: all.slice(start, start + limit),
    nextPage: start + limit < all.length ? page + 1 : null,
    total: all.length,
  };
}

export async function fetchPopularActivities(
  page: number = 0,
  limit: number = 8,
  filters: BrowseFilters = {}
): Promise<PaginatedResult> {
  let all = await fetchAllFromBackend(filters, null);
  all = all.filter((a) => a.isPromoted);

  // Fallback to mock if backend returned nothing
  if (all.length === 0) {
    all = applyBrowseFilters(PROMOTED_ACTIVITIES, filters);
  }

  const start = page * limit;
  return {
    activities: all.slice(start, start + limit),
    nextPage: start + limit < all.length ? page + 1 : null,
    total: all.length,
  };
}
