import { ALL_ACTIVITIES, PROMOTED_ACTIVITIES, type BrowseActivity } from "@/api/mock-data";

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

export async function fetchActivities(
  page: number = 0,
  limit: number = 8,
  category: string | null = null,
  filters: BrowseFilters = {}
): Promise<PaginatedResult> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const mergedFilters: BrowseFilters = { ...filters };
  if (category) mergedFilters.category = category;

  const filtered = applyBrowseFilters(ALL_ACTIVITIES, mergedFilters);

  const start = page * limit;
  const activities = filtered.slice(start, start + limit);
  const hasMore = start + limit < filtered.length;

  return {
    activities,
    nextPage: hasMore ? page + 1 : null,
    total: filtered.length,
  };
}

export async function fetchPopularActivities(
  page: number = 0,
  limit: number = 8,
  filters: BrowseFilters = {}
): Promise<PaginatedResult> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const filtered = applyBrowseFilters(PROMOTED_ACTIVITIES, filters);

  const start = page * limit;
  const activities = filtered.slice(start, start + limit);
  const hasMore = start + limit < filtered.length;

  return {
    activities,
    nextPage: hasMore ? page + 1 : null,
    total: filtered.length,
  };
}
