"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useUrlSearchParams } from "@/hooks/use-url-search-params";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { CategoryBar } from "@/components/features/category-bar";
import { MapView } from "@/components/features/map-view";
import { TrendingCarousel } from "@/components/features/trending-carousel";
import { CollectionsGrid } from "@/components/features/collections-grid";
import { CTASection } from "@/components/features/cta-section";
import { Footer } from "@/components/layout/footer";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  ActivityTabHeader,
  DesktopActivityList,
  MobileActivityLayout,
} from "@/components/features/browse";
import { trendingClasses, ALL_ACTIVITIES, PROMOTED_ACTIVITIES } from "@/api/mock-data";
import { fetchActivities, fetchPopularActivities, applyBrowseFilters } from "@/api/activities";
import type { BrowseFilters } from "@/api/activities";
interface BrowsePageProps {
  category: string | null;
}

export function BrowsePage({ category: initialCategory }: BrowsePageProps) {
  const searchParams = useUrlSearchParams();
  const t = useTranslations("browse");
  const tCat = useTranslations("categories");
  const locale = useLocale();
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const desktopSentinelRef = useRef<HTMLDivElement>(null);
  const mobileSentinelRef = useRef<HTMLDivElement>(null);

  // Derive category from URL pathname (reacts to pushState via searchparams event)
  const currentCategory = useMemo(() => {
    if (typeof window === "undefined") return initialCategory;
    let path = window.location.pathname.replace(/^\//, "");
    // Strip locale prefix (e.g. "pl/football" → "football", "pl" → "")
    if (locale !== "en" && path.startsWith(locale)) {
      path = path.slice(locale.length).replace(/^\//, "");
    }
    return path || null;
  // searchParams is included to re-derive when any URL change fires
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, initialCategory, locale]);

  // ── URL-driven state ──
  const activeTab = searchParams.get("tab") === "all" ? "all" : "popular";

  const filters: BrowseFilters = useMemo(() => {
    const timesParam = searchParams.get("times");
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");
    const minRatingParam = searchParams.get("minRating");
    const citiesParam = searchParams.get("cities");

    return {
      query: searchParams.get("q") ?? undefined,
      category: currentCategory ?? undefined,
      priceMin: priceMinParam ? Number(priceMinParam) : undefined,
      priceMax: priceMaxParam ? Number(priceMaxParam) : undefined,
      distance: searchParams.get("distance") ?? undefined,
      times: timesParam ? timesParam.split(",") : undefined,
      time: searchParams.get("time") ?? undefined,
      groupType: searchParams.get("groupType") ?? undefined,
      ageRange: searchParams.get("ageRange") ?? undefined,
      minRating: minRatingParam ? Number(minRatingParam) : undefined,
      city: searchParams.get("city") ?? undefined,
      cities: citiesParam ? citiesParam.split(",") : undefined,
    };
  }, [searchParams, currentCategory]);

  // Locale prefix for URL building ("" for default, "/pl" for Polish)
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  const updateParam = useCallback((key: string, value: string | undefined) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Read category from current path (strip locale prefix first)
    let rawPath = window.location.pathname.replace(/^\//, "");
    if (locale !== "en" && rawPath.startsWith(locale)) {
      rawPath = rawPath.slice(locale.length).replace(/^\//, "");
    }
    const pathCategory = rawPath || null;
    const base = pathCategory ? `${localePrefix}/${pathCategory}` : `${localePrefix}/`;
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${base}?${qs}` : base);
    window.dispatchEvent(new Event("searchparams"));
  }, [locale, localePrefix]);

  // Sync category to URL via pushState (no Next.js navigation = no remount)
  const handleCategoryChange = useCallback((cat: string | null) => {
    setActiveActivityId(null);
    const href = cat ? `${localePrefix}/${cat}` : `${localePrefix}/`;
    const params = new URLSearchParams(window.location.search);
    params.delete("category");
    params.delete("categories");
    const qs = params.toString();
    window.history.pushState(null, "", qs ? `${href}?${qs}` : href);
    window.dispatchEvent(new Event("searchparams"));
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [localePrefix]);

  const handleTabChange = useCallback((tab: string) => {
    updateParam("tab", tab === "popular" ? undefined : tab);
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateParam]);

  const handleFilterChange = useCallback((key: string, value: string | string[] | number | undefined) => {
    if (Array.isArray(value)) {
      updateParam(key, value.length > 0 ? value.join(",") : undefined);
    } else if (typeof value === "number") {
      updateParam(key, String(value));
    } else {
      updateParam(key, value);
    }
  }, [updateParam]);

  const handleClearFilters = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const filterKeys = ["category", "categories", "price", "priceMin", "priceMax", "distance", "time", "times", "groupType", "ageRange", "minRating", "city", "cities"];
    for (const k of filterKeys) params.delete(k);
    const qs = params.toString();
    window.history.pushState(null, "", qs ? `${localePrefix}/?${qs}` : `${localePrefix}/`);
    window.dispatchEvent(new Event("searchparams"));
  }, [localePrefix]);

  const handleNavbarSearch = useCallback((query: string) => {
    updateParam("q", query || undefined);
  }, [updateParam]);

  // ── Queries ──
  const {
    data: popularData,
    fetchNextPage: fetchNextPopular,
    hasNextPage: hasNextPopular,
    isFetchingNextPage: isFetchingPopular,
    isFetching: isFetchingPopularAny,
  } = useInfiniteQuery({
    queryKey: ["popular-activities", filters],
    queryFn: ({ pageParam }) => fetchPopularActivities(pageParam, 8, filters),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: activeTab === "popular",
  });

  const {
    data: allData,
    fetchNextPage: fetchNextAll,
    hasNextPage: hasNextAll,
    isFetchingNextPage: isFetchingAll,
    isFetching: isFetchingAllAny,
  } = useInfiniteQuery({
    queryKey: ["all-activities", filters],
    queryFn: ({ pageParam }) => fetchActivities(pageParam, 8, currentCategory, filters),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: activeTab === "all",
  });

  const data = activeTab === "popular" ? popularData : allData;
  const fetchNextPage = activeTab === "popular" ? fetchNextPopular : fetchNextAll;
  const hasNextPage = activeTab === "popular" ? hasNextPopular : hasNextAll;
  const isFetchingNextPage = activeTab === "popular" ? isFetchingPopular : isFetchingAll;
  const isFetching = activeTab === "popular" ? isFetchingPopularAny : isFetchingAllAny;

  const allActivities = useMemo(
    () => data?.pages.flatMap((p) => p.activities) ?? [],
    [data]
  );

  // Map shows all matching activities (respects every filter, not just category).
  // Spread ensures a fresh array reference so the MapView GeoJSON source always re-syncs.
  const mapActivities = useMemo(() => {
    const source = activeTab === "popular" ? PROMOTED_ACTIVITIES : ALL_ACTIVITIES;
    return [...applyBrowseFilters(source, filters)];
  }, [activeTab, filters]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    if (desktopSentinelRef.current) observer.observe(desktopSentinelRef.current);
    if (mobileSentinelRef.current) observer.observe(mobileSentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (activeActivityId && listRef.current) {
      const card = listRef.current.querySelector(`[data-activity-id="${activeActivityId}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeActivityId]);

  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-coral/20 selection:text-coral-hover">
      {/* 1. Navbar + Categories */}
      <Navbar onSearch={handleNavbarSearch}>
        <CategoryBar activeCategory={currentCategory} onCategoryChange={handleCategoryChange} embedded />
      </Navbar>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 pb-24 md:pb-8">
        <h1 className="sr-only">
          {currentCategory
            ? tCat(currentCategory as never)
            : t("heroTitle")}
        </h1>

        {/* 3. Activities + Map with Tabs */}
        <AnimateIn>
          <section>
            <ActivityTabHeader
              activeTab={activeTab}
              onTabChange={handleTabChange}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />

            {/* Desktop: split layout */}
            <div className="hidden lg:grid grid-cols-12 gap-8 h-[550px]">
              <DesktopActivityList
                activities={allActivities}
                activeActivityId={activeActivityId}
                onHover={(id) => setActiveActivityId(id)}
                onLeave={() => setActiveActivityId(null)}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                listRef={listRef}
                sentinelRef={desktopSentinelRef}
              />

              {/* Right: map */}
              <div className="col-span-7 h-full">
                <MapView
                  activities={mapActivities}
                  activeId={activeActivityId ?? undefined}
                  onMarkerClick={(id: string) => setActiveActivityId(id)}
                />
              </div>
            </div>

            {/* Mobile: stacked layout */}
            <MobileActivityLayout
              activities={allActivities}
              mapActivities={mapActivities}
              activeActivityId={activeActivityId}
              onHover={(id) => setActiveActivityId(id)}
              onLeave={() => setActiveActivityId(null)}
              onMarkerClick={(id: string) => setActiveActivityId(id)}
              showMobileMap={showMobileMap}
              onToggleMobileMap={() => setShowMobileMap(!showMobileMap)}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              sentinelRef={mobileSentinelRef}
            />
          </section>
        </AnimateIn>

        {/* 4. Trending Classes Carousel */}
        <AnimateIn delay={100}>
          <TrendingCarousel classes={trendingClasses} />
        </AnimateIn>

        {/* 5. Collections Grid */}
        <AnimateIn delay={200}>
          <CollectionsGrid />
        </AnimateIn>

        {/* 6. CTA Section */}
        <AnimateIn delay={100}>
          <CTASection />
        </AnimateIn>
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  );
}
