"use client";

import { useState, useRef, useEffect, useMemo, useReducer, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useUrlSearchParams } from "@/hooks/use-url-search-params";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { MapView } from "@/components/features/map-view";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  CourtTabHeader,
  CourtSchedulePanel,
  CourtReservationSidebar,
  CourtFilterSidebar,
  DesktopCourtList,
  MobileCourtLayout,
} from "@/components/features/courts";
import { fetchCourts, fetchPopularCourts, fetchCourtAvailability, createReservation, fetchAvailableCourtIndices, applyCourtFilters, MOCK_COURTS, PROMOTED_COURTS } from "@/api/courts";
import type { CourtFilters } from "@/api/courts";
import type { CourtSport, TimeSlotAvailability } from "@/types/court";
import type { BrowseActivity } from "@/api/mock-data";
import { courtsPageReducer, courtsInitialState } from "@/hooks/use-courts-page-reducer";

/** Map Court to BrowseActivity shape for MapView */
function courtsToMapActivities(courts: typeof MOCK_COURTS): BrowseActivity[] {
  return courts.map((c) => ({
    id: c.id,
    title: c.name,
    image: c.image,
    location: c.location,
    address: c.address,
    distance: "",
    ageRange: "",
    rating: c.rating,
    reviewCount: c.reviewCount,
    price: c.pricePerHour,
    category: c.sport,
    lat: c.lat,
    lng: c.lng,
    isPromoted: c.isPromoted ?? false,
    provider: c.businessName,
  }));
}

export function CourtsPage() {
  const t = useTranslations("courts");
  const tBrowse = useTranslations("browse");
  const locale = useLocale();
  const searchParams = useUrlSearchParams();
  const [state, dispatch] = useReducer(courtsPageReducer, courtsInitialState);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const desktopSentinelRef = useRef<HTMLDivElement>(null);
  const mobileSentinelRef = useRef<HTMLDivElement>(null);

  // Locale prefix for URL building
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  // ── URL-driven filters (same pattern as landing page) ──
  const filters: CourtFilters = useMemo(() => {
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");
    const minRatingParam = searchParams.get("minRating");
    const indoorParam = searchParams.get("indoor");

    return {
      query: searchParams.get("q") ?? undefined,
      sport: (searchParams.get("sport") as CourtSport) ?? undefined,
      surface: (searchParams.get("surface") as CourtFilters["surface"]) ?? undefined,
      indoor: indoorParam != null ? indoorParam === "true" : undefined,
      priceMin: priceMinParam ? Number(priceMinParam) : undefined,
      priceMax: priceMaxParam ? Number(priceMaxParam) : undefined,
      city: searchParams.get("city") ?? undefined,
      minRating: minRatingParam ? Number(minRatingParam) : undefined,
    };
  }, [searchParams]);

  const activeSport = filters.sport ?? null;
  const activeTab = searchParams.get("tab") === "all" ? "all" : "popular";

  const updateParam = useCallback((key: string, value: string | undefined) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    const base = `${localePrefix}/courts`;
    window.history.replaceState(null, "", qs ? `${base}?${qs}` : base);
    window.dispatchEvent(new Event("searchparams"));
  }, [localePrefix]);

  const handleTabChange = useCallback((tab: string) => {
    updateParam("tab", tab === "popular" ? undefined : tab);
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateParam]);

  const handleSportChange = useCallback((sport: CourtSport | null) => {
    updateParam("sport", sport ?? undefined);
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateParam]);

  const handleFilterChange = useCallback((key: string, value: string | number | boolean | undefined) => {
    if (typeof value === "number") {
      updateParam(key, String(value));
    } else if (typeof value === "boolean") {
      updateParam(key, String(value));
    } else {
      updateParam(key, value);
    }
  }, [updateParam]);

  const handleClearFilters = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const filterKeys = ["sport", "surface", "indoor", "priceMin", "priceMax", "city", "minRating", "q"];
    for (const k of filterKeys) params.delete(k);
    const qs = params.toString();
    const base = `${localePrefix}/courts`;
    window.history.pushState(null, "", qs ? `${base}?${qs}` : base);
    window.dispatchEvent(new Event("searchparams"));
  }, [localePrefix]);

  // ── Queries (popular / all) ──
  const {
    data: popularData,
    fetchNextPage: fetchNextPopular,
    hasNextPage: hasNextPopular,
    isFetchingNextPage: isFetchingPopular,
    isFetching: isFetchingPopularAny,
  } = useInfiniteQuery({
    queryKey: ["popular-courts", filters],
    queryFn: ({ pageParam }) => fetchPopularCourts(pageParam, 8, filters),
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
    queryKey: ["all-courts", filters],
    queryFn: ({ pageParam }) => fetchCourts(pageParam, 8, filters),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: activeTab === "all",
  });

  const data = activeTab === "popular" ? popularData : allData;
  const fetchNextPage = activeTab === "popular" ? fetchNextPopular : fetchNextAll;
  const hasNextPage = activeTab === "popular" ? hasNextPopular : hasNextAll;
  const isFetchingNextPage = activeTab === "popular" ? isFetchingPopular : isFetchingAll;
  const isFetching = activeTab === "popular" ? isFetchingPopularAny : isFetchingAllAny;

  const courts = useMemo(
    () => data?.pages.flatMap((p) => p.courts) ?? [],
    [data]
  );

  const selectedCourt = useMemo(
    () => courts.find((c) => c.id === state.selectedCourtId) ?? MOCK_COURTS.find((c) => c.id === state.selectedCourtId) ?? null,
    [courts, state.selectedCourtId]
  );

  // Availability query
  const { data: slots = [], isLoading: isSlotsLoading } = useQuery({
    queryKey: ["court-availability", state.selectedCourtId, state.selectedDate],
    queryFn: () =>
      fetchCourtAvailability(state.selectedCourtId!, state.selectedDate),
    enabled: !!state.selectedCourtId,
  });

  const slotMap = useMemo(() => {
    const map = new Map<string, TimeSlotAvailability>();
    for (const s of slots) {
      map.set(`${s.date}-${s.hour}`, s);
    }
    return map;
  }, [slots]);

  // Available court indices for the selected slots
  const { data: availableCourtIndices } = useQuery({
    queryKey: ["available-courts", state.selectedCourtId, state.selectedSlots],
    queryFn: () =>
      fetchAvailableCourtIndices(
        state.selectedCourtId!,
        state.selectedSlots[0].date,
        state.selectedSlots.map((s) => s.hour)
      ),
    enabled: !!state.selectedCourtId && state.selectedSlots.length > 0,
  });

  // Map activities — filter from full dataset, respects tab + filters
  const mapActivities = useMemo(() => {
    const source = activeTab === "popular" ? PROMOTED_COURTS : MOCK_COURTS;
    return [...courtsToMapActivities(applyCourtFilters(source, filters))];
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

  const handleSelectCourt = useCallback((id: string) => {
    dispatch({
      type: "SELECT_COURT",
      courtId: state.selectedCourtId === id ? null : id,
    });
  }, [state.selectedCourtId]);

  const handleCloseCourt = useCallback(() => {
    dispatch({ type: "SELECT_COURT", courtId: null });
  }, []);

  // Auto-open reservation sidebar when slots are selected
  const handleToggleSlot = useCallback((date: string, hour: number) => {
    dispatch({ type: "TOGGLE_SLOT", date, hour });
  }, []);

  // Show reservation sidebar when we have selected slots
  useEffect(() => {
    if (state.selectedSlots.length > 0) {
      dispatch({ type: "SHOW_RESERVATION_SUMMARY", show: true });
    }
  }, [state.selectedSlots.length]);

  const handleConfirmReservation = useCallback(async () => {
    if (!selectedCourt || state.selectedSlots.length === 0) return;

    setIsConfirming(true);
    const sorted = [...state.selectedSlots].sort((a, b) => a.hour - b.hour);
    const totalPrice = sorted.reduce((sum, s) => {
      const slot = slotMap.get(`${s.date}-${s.hour}`);
      return sum + (slot?.price ?? selectedCourt.pricePerHour);
    }, 0);

    try {
      await createReservation({
        courtId: selectedCourt.id,
        courtName: selectedCourt.name,
        date: sorted[0].date,
        startHour: sorted[0].hour,
        durationHours: sorted.length,
        totalPrice,
        courtIndex: state.selectedCourtIndex,
      });
      toast.success(t("reservationPending"));
      dispatch({ type: "CLEAR_SLOTS" });
      dispatch({ type: "SHOW_RESERVATION_SUMMARY", show: false });
    } catch {
      toast.error(t("reservationError"));
    } finally {
      setIsConfirming(false);
    }
  }, [selectedCourt, state.selectedSlots, state.selectedCourtIndex, slotMap, t]);

  const activeFilterCount = [
    filters.surface != null,
    filters.indoor != null,
    filters.priceMin != null || filters.priceMax != null,
    filters.minRating != null,
    filters.city != null,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-coral/20 selection:text-coral-hover">
      <Navbar>
        <CourtTabHeader
          activeSport={activeSport}
          onSportChange={handleSportChange}
        />
      </Navbar>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <h1 className="sr-only">{t("pageTitle")}</h1>

        <AnimateIn>
          <section>
            {/* Tabs: Popular / All + Activities link + Filter */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList>
                    <TabsTrigger value="popular">{tBrowse("popular")}</TabsTrigger>
                    <TabsTrigger value="all">{tBrowse("all")}</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Link
                  href="/"
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:border-coral/30 hover:text-coral hover:bg-coral/5 transition-all"
                >
                  {tBrowse("activitiesLink")}
                </Link>
              </div>
              <CourtFilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
                activeCount={activeFilterCount}
              />
            </div>

            {/* Desktop: split layout */}
            <div className="hidden lg:grid grid-cols-12 grid-rows-[1fr] gap-8 h-[550px]">
              <DesktopCourtList
                courts={courts}
                selectedCourtId={state.selectedCourtId}
                onSelect={handleSelectCourt}
                onHover={(id) => setActiveHoverId(id)}
                onLeave={() => setActiveHoverId(null)}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                listRef={listRef}
                sentinelRef={desktopSentinelRef}
              />

              {/* Right: map or schedule */}
              <div className="col-span-7 h-full min-h-0">
                {selectedCourt ? (
                  <CourtSchedulePanel
                    court={selectedCourt}
                    weekStart={state.selectedDate}
                    slots={slots}
                    selectedSlots={state.selectedSlots}
                    onToggleSlot={handleToggleSlot}
                    onPrevWeek={() =>
                      dispatch({
                        type: "SET_WEEK_OFFSET",
                        offset: state.weekOffset - 1,
                      })
                    }
                    onNextWeek={() =>
                      dispatch({
                        type: "SET_WEEK_OFFSET",
                        offset: state.weekOffset + 1,
                      })
                    }
                    onClose={handleCloseCourt}
                    isLoading={isSlotsLoading}
                  />
                ) : (
                  <MapView
                    activities={mapActivities}
                    activeId={activeHoverId ?? undefined}
                    onMarkerClick={(id) => handleSelectCourt(id)}
                  />
                )}
              </div>
            </div>

            {/* Mobile: stacked layout */}
            <MobileCourtLayout
              courts={courts}
              mapActivities={mapActivities}
              selectedCourtId={state.selectedCourtId}
              selectedCourt={selectedCourt}
              onSelect={handleSelectCourt}
              onHover={(id) => setActiveHoverId(id)}
              onLeave={() => setActiveHoverId(null)}
              onMarkerClick={(id) => handleSelectCourt(id)}
              showMobileMap={showMobileMap}
              onToggleMobileMap={() => setShowMobileMap(!showMobileMap)}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              sentinelRef={mobileSentinelRef}
              weekStart={state.selectedDate}
              slots={slots}
              selectedSlots={state.selectedSlots}
              onToggleSlot={handleToggleSlot}
              onPrevWeek={() =>
                dispatch({
                  type: "SET_WEEK_OFFSET",
                  offset: state.weekOffset - 1,
                })
              }
              onNextWeek={() =>
                dispatch({
                  type: "SET_WEEK_OFFSET",
                  offset: state.weekOffset + 1,
                })
              }
              onClose={handleCloseCourt}
              isSlotsLoading={isSlotsLoading}
            />
          </section>
        </AnimateIn>
      </main>

      <Footer />
      <BottomNav />

      {/* Reservation sidebar — auto-opens when slots are selected */}
      {selectedCourt && (
        <CourtReservationSidebar
          open={state.showReservationSummary}
          onOpenChange={(open) => {
            dispatch({ type: "SHOW_RESERVATION_SUMMARY", show: open });
            if (!open) dispatch({ type: "CLEAR_SLOTS" });
          }}
          court={selectedCourt}
          selectedSlots={state.selectedSlots}
          slotMap={slotMap}
          onConfirm={handleConfirmReservation}
          isConfirming={isConfirming}
          availableCourtIndices={availableCourtIndices}
          selectedCourtIndex={state.selectedCourtIndex}
          onCourtIndexChange={(idx) => dispatch({ type: "SET_COURT_INDEX", courtIndex: idx })}
          totalCourts={selectedCourt.courtCount ?? 1}
        />
      )}
    </div>
  );
}
