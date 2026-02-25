import type {
  BusinessStats,
  BusinessActivity,
  BusinessNotification,
  BusinessSettings,
  BusinessOnboardingData,
  BusinessPromotion,
  WeeklyBookingsData,
} from "@/types/business-portal";
import type { Business } from "@/types/business";
import type { Court, TimeSlotAvailability, CourtReservation, CourtSlotDetail } from "@/types/court";

const delay = (ms: number = 300) => new Promise((r) => setTimeout(r, ms));

// ── Stats ──

const MOCK_STATS: BusinessStats = {
  totalStudents: 2047,
  totalBookings: 8432,
  avgRating: 4.8,
  monthlyRevenue: 12580,
  activitiesCount: 6,
  upcomingClasses: 14,
};

export async function fetchBusinessStats(): Promise<BusinessStats> {
  await delay(250);
  return { ...MOCK_STATS };
}

// ── Activities ──

const MOCK_BUSINESS_ACTIVITIES: BusinessActivity[] = [
  {
    id: "1",
    title: "Poranna Joga Vinyasa",
    description: "Rozpocznij dzień ożywczą sesją jogi odpowiednią dla każdego poziomu.",
    category: "fitness",
    provider: { name: "Studio Harmonii" },
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 124,
    price: "$",
    priceAmount: 15,
    distance: 0,
    location: "Studio Harmonii",
    timeSlots: ["morning"],
    spotsLeft: 5,
    status: "active",
    enrolledCount: 18,
    maxCapacity: 25,
    nextSessionDate: "2026-02-24",
    createdAt: "2024-06-15",
    duration: "60 min",
    ageRange: "16+",
    skillLevel: "All levels",
    maxStudents: 25,
  },
  {
    id: "9",
    title: "Medytacja i Uważność",
    description: "Znajdź spokój i jasność poprzez prowadzone praktyki medytacyjne.",
    category: "wellness",
    provider: { name: "Studio Harmonii" },
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 198,
    price: "$",
    priceAmount: 12,
    distance: 0,
    location: "Studio Harmonii",
    timeSlots: ["morning", "evening"],
    status: "active",
    enrolledCount: 22,
    maxCapacity: 30,
    nextSessionDate: "2026-02-23",
    createdAt: "2024-07-01",
    duration: "45 min",
    ageRange: "All ages",
    skillLevel: "Beginner",
    maxStudents: 30,
  },
  {
    id: "b-3",
    title: "Power Pilates",
    description: "Zbuduj siłę core i elastyczność na naszych dynamicznych zajęciach Pilates.",
    category: "fitness",
    provider: { name: "Studio Harmonii" },
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 87,
    price: "$",
    priceAmount: 18,
    distance: 0,
    location: "Studio Harmonii",
    timeSlots: ["morning", "afternoon"],
    status: "active",
    enrolledCount: 12,
    maxCapacity: 20,
    nextSessionDate: "2026-02-25",
    createdAt: "2024-08-10",
    duration: "50 min",
    ageRange: "16+",
    skillLevel: "Intermediate",
    maxStudents: 20,
  },
  {
    id: "b-4",
    title: "Oddech i Kąpiel Dźwiękowa",
    description: "Doświadcz głębokiego relaksu z prowadzonymi technikami oddechowymi i misami kryształowymi.",
    category: "wellness",
    provider: { name: "Studio Harmonii" },
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 56,
    price: "$$",
    priceAmount: 25,
    distance: 0,
    location: "Studio Harmonii",
    timeSlots: ["evening", "weekend"],
    spotsLeft: 3,
    status: "active",
    enrolledCount: 12,
    maxCapacity: 15,
    nextSessionDate: "2026-02-26",
    createdAt: "2024-09-05",
    duration: "75 min",
    ageRange: "18+",
    skillLevel: "All levels",
    maxStudents: 15,
  },
  {
    id: "b-5",
    title: "Łagodny Stretching dla Seniorów",
    description: "Ćwiczenia rozciągające o niskim obciążeniu zaprojektowane dla starszych dorosłych.",
    category: "wellness",
    provider: { name: "Studio Harmonii" },
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 43,
    price: "$",
    priceAmount: 10,
    distance: 0,
    location: "Studio Harmonii",
    timeSlots: ["morning"],
    status: "draft",
    enrolledCount: 0,
    maxCapacity: 15,
    nextSessionDate: "",
    createdAt: "2025-01-20",
    duration: "40 min",
    ageRange: "60+",
    skillLevel: "Beginner",
    maxStudents: 15,
  },
  {
    id: "b-6",
    title: "Vinyasa Flow Zaawansowane",
    description: "Wyzwij siebie zaawansowanymi sekwencjami i inwersami.",
    category: "fitness",
    provider: { name: "Studio Harmonii" },
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 72,
    price: "$$",
    priceAmount: 20,
    distance: 0,
    location: "Studio Harmonii",
    timeSlots: ["afternoon"],
    status: "paused",
    enrolledCount: 8,
    maxCapacity: 20,
    nextSessionDate: "",
    createdAt: "2024-10-01",
    duration: "75 min",
    ageRange: "18+",
    skillLevel: "Advanced",
    maxStudents: 20,
  },
];

let businessActivities = [...MOCK_BUSINESS_ACTIVITIES];

export async function fetchBusinessActivities(): Promise<BusinessActivity[]> {
  await delay(300);
  return [...businessActivities];
}

export async function createBusinessActivity(
  data: Partial<BusinessActivity>
): Promise<BusinessActivity> {
  await delay(400);
  const activity: BusinessActivity = {
    id: `ba-${Date.now()}`,
    title: data.title ?? "New Activity",
    description: data.description ?? "",
    category: data.category ?? "fitness",
    provider: { name: "Studio Harmonii" },
    image: data.image ?? "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    rating: 0,
    reviewCount: 0,
    price: data.price ?? "$",
    priceAmount: data.priceAmount,
    distance: 0,
    location: data.location ?? "Studio Harmonii",
    timeSlots: data.timeSlots ?? ["morning"],
    status: (data.status as BusinessActivity["status"]) ?? "draft",
    enrolledCount: 0,
    maxCapacity: data.maxCapacity ?? 20,
    nextSessionDate: data.nextDate ?? "",
    createdAt: new Date().toISOString().split("T")[0],
    duration: data.duration ?? "60 min",
    ageRange: data.ageRange ?? "All ages",
    skillLevel: data.skillLevel ?? "All levels",
    maxStudents: data.maxStudents ?? 20,
    classType: data.classType ?? "Group Classes",
    materialsIncluded: data.materialsIncluded ?? "",
    whatYouLearn: data.whatYouLearn ?? [],
    curriculum: data.curriculum ?? [],
    availableTimes: data.availableTimes ?? [],
    nextDate: data.nextDate ?? "",
    gallery: data.gallery ?? [],
    badges: data.badges ?? [],
  };
  businessActivities = [activity, ...businessActivities];
  return activity;
}

export async function updateBusinessActivity(
  id: string,
  data: Partial<BusinessActivity>
): Promise<BusinessActivity> {
  await delay(300);
  businessActivities = businessActivities.map((a) =>
    a.id === id ? { ...a, ...data } : a
  );
  return businessActivities.find((a) => a.id === id)!;
}

export async function deleteBusinessActivity(id: string): Promise<void> {
  await delay(300);
  businessActivities = businessActivities.filter((a) => a.id !== id);
}

// ── Notifications ──

const MOCK_NOTIFICATIONS: BusinessNotification[] = [
  {
    id: "n-1",
    type: "booking",
    title: "New booking",
    body: "Joanna M. booked Poranna Joga Vinyasa for Feb 24.",
    timestamp: "2026-02-21T09:30:00Z",
    read: false,
  },
  {
    id: "n-2",
    type: "review",
    title: "New review",
    body: "Tomek L. left a 5-star review on Medytacja i Uważność.",
    timestamp: "2026-02-20T18:15:00Z",
    read: false,
  },
  {
    id: "n-3",
    type: "system",
    title: "Weekly report ready",
    body: "Your weekly performance summary is available.",
    timestamp: "2026-02-19T08:00:00Z",
    read: true,
  },
  {
    id: "n-4",
    type: "promotion",
    title: "Promotion ending soon",
    body: "Your promotion for Power Pilates ends tomorrow.",
    timestamp: "2026-02-18T14:00:00Z",
    read: true,
  },
  {
    id: "n-5",
    type: "booking",
    title: "Booking cancelled",
    body: "Priya S. cancelled their booking for Oddech i Kąpiel Dźwiękowa.",
    timestamp: "2026-02-17T11:45:00Z",
    read: true,
  },
];

let notifications = [...MOCK_NOTIFICATIONS];

export async function fetchBusinessNotifications(): Promise<BusinessNotification[]> {
  await delay(200);
  return [...notifications];
}

export async function markNotificationRead(id: string): Promise<void> {
  await delay(100);
  notifications = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
}

export async function markAllNotificationsRead(): Promise<void> {
  await delay(100);
  notifications = notifications.map((n) => ({ ...n, read: true }));
}

// ── Settings ──

const MOCK_SETTINGS: BusinessSettings = {
  notifications: {
    newBookings: true,
    cancellations: true,
    reviews: true,
    promotions: false,
    weeklyReport: true,
  },
  businessInfo: {
    name: "Studio Harmonii – Centrum Wellness",
    tagline: "Umysł, ciało i dusza — wszystko w jednym miejscu",
    description: "Studio Harmonii to wiodące krakowskie centrum wellness oferujące jogę, medytację, fitness i warsztaty kreatywne.",
    category: "wellness",
  },
  social: {
    instagram: "@studioharmonii",
    facebook: "StudioHarmoniiKrakow",
    website: "www.studioharmonii.pl",
  },
  privacy: {
    profilePublic: true,
    showRevenue: false,
    showStudentCount: true,
  },
};

export async function fetchBusinessSettings(): Promise<BusinessSettings> {
  await delay(250);
  return { ...MOCK_SETTINGS };
}

// ── Onboarding ──

export async function createBusinessAccount(
  data: BusinessOnboardingData
): Promise<Business> {
  await delay(800);
  return {
    id: `biz-${Date.now()}`,
    name: data.companyName,
    tagline: "",
    description: "",
    category: data.category,
    coverImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=500&fit=crop",
    logo: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=200&h=200&fit=crop&crop=center",
    rating: 0,
    reviewCount: 0,
    verified: false,
    address: data.address,
    coordinates: data.coordinates,
    hours: data.hours.map((h) => ({
      day: h.day,
      open: h.open,
      close: h.close,
      closed: h.closed,
    })),
    contact: {
      phone: data.phone,
      email: "",
      website: "",
    },
    social: {},
    activities: [],
    instructors: data.employees.map((e, i) => ({
      id: `new-i-${i}`,
      name: e.name,
      title: e.specialty,
      avatar: e.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      experience: "",
      bio: "",
      verified: false,
      specialty: e.specialty,
      rating: 0,
    })),
    reviews: [],
    ratingDistribution: [],
    gallery: [],
  };
}

// ── Weekly Bookings ──

const MOCK_WEEKLY_BOOKINGS: WeeklyBookingsData[] = [
  { week: "Jan 6", bookings: 98 },
  { week: "Jan 13", bookings: 124 },
  { week: "Jan 20", bookings: 110 },
  { week: "Jan 27", bookings: 137 },
  { week: "Feb 3", bookings: 145 },
  { week: "Feb 10", bookings: 132 },
  { week: "Feb 17", bookings: 158 },
];

export async function fetchWeeklyBookings(): Promise<WeeklyBookingsData[]> {
  await delay(250);
  return [...MOCK_WEEKLY_BOOKINGS];
}

// ── Marketing ──

const MOCK_PROMOTIONS: BusinessPromotion[] = [
  {
    id: "p-1",
    activityId: "1",
    activityTitle: "Poranna Joga Vinyasa",
    dailyBudget: 15,
    startDate: "2026-02-10",
    endDate: "2026-02-28",
    status: "active",
    impressions: 3240,
    clicks: 186,
  },
  {
    id: "p-2",
    activityId: "b-3",
    activityTitle: "Power Pilates",
    dailyBudget: 10,
    startDate: "2026-02-01",
    endDate: "2026-02-15",
    status: "ended",
    impressions: 1820,
    clicks: 94,
  },
];

let promotions = [...MOCK_PROMOTIONS];

export async function fetchPromotions(): Promise<BusinessPromotion[]> {
  await delay(250);
  return [...promotions];
}

export async function createPromotion(
  data: Omit<BusinessPromotion, "id" | "impressions" | "clicks">
): Promise<BusinessPromotion> {
  await delay(400);
  const promo: BusinessPromotion = {
    ...data,
    id: `p-${Date.now()}`,
    impressions: 0,
    clicks: 0,
  };
  promotions = [promo, ...promotions];
  return promo;
}

// ── Business Courts ──

const MOCK_BUSINESS_COURTS: Court[] = [
  {
    id: "bc-1",
    name: "Kort Tenisowy Centrum",
    sport: "tennis",
    surface: "clay",
    indoor: false,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    address: "ul. Myśliwiecka 4, Warszawa",
    location: "Studio Harmonii",
    lat: 52.215,
    lng: 21.035,
    pricePerHour: 80,
    rating: 4.8,
    reviewCount: 156,
    businessId: "biz-1",
    businessName: "Studio Harmonii",
    amenities: ["szatnia", "prysznice", "parking", "wypożyczalnia rakiet"],
    operatingHours: [
      { day: "Poniedziałek", open: "7:00", close: "21:00" },
      { day: "Wtorek", open: "7:00", close: "21:00" },
      { day: "Środa", open: "7:00", close: "21:00" },
      { day: "Czwartek", open: "7:00", close: "21:00" },
      { day: "Piątek", open: "7:00", close: "20:00" },
      { day: "Sobota", open: "8:00", close: "20:00" },
      { day: "Niedziela", open: "8:00", close: "18:00" },
    ],
    courtCount: 4,
    status: "active",
  },
  {
    id: "bc-2",
    name: "Padel Arena Mokotów",
    sport: "padel",
    surface: "synthetic",
    indoor: true,
    image: "https://images.unsplash.com/photo-1612534847738-b3af3e5e379c?w=400&h=300&fit=crop",
    address: "ul. Konstruktorska 8, Warszawa",
    location: "Studio Harmonii",
    lat: 52.198,
    lng: 21.040,
    pricePerHour: 120,
    rating: 4.9,
    reviewCount: 89,
    businessId: "biz-1",
    businessName: "Studio Harmonii",
    amenities: ["szatnia", "prysznice", "sklep sportowy", "bar"],
    operatingHours: [
      { day: "Poniedziałek", open: "7:00", close: "22:00" },
      { day: "Wtorek", open: "7:00", close: "22:00" },
      { day: "Środa", open: "7:00", close: "22:00" },
      { day: "Czwartek", open: "7:00", close: "22:00" },
      { day: "Piątek", open: "7:00", close: "22:00" },
      { day: "Sobota", open: "8:00", close: "21:00" },
      { day: "Niedziela", open: "8:00", close: "20:00" },
    ],
    courtCount: 6,
    status: "active",
  },
  {
    id: "bc-3",
    name: "Hala Badmintona",
    sport: "badminton",
    surface: "parquet",
    indoor: true,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
    address: "ul. Kamieńskiego 3, Warszawa",
    location: "Studio Harmonii",
    lat: 52.210,
    lng: 21.020,
    pricePerHour: 50,
    rating: 4.6,
    reviewCount: 72,
    businessId: "biz-1",
    businessName: "Studio Harmonii",
    amenities: ["szatnia", "prysznice", "parking"],
    operatingHours: [
      { day: "Poniedziałek", open: "8:00", close: "22:00" },
      { day: "Wtorek", open: "8:00", close: "22:00" },
      { day: "Środa", open: "8:00", close: "22:00" },
      { day: "Czwartek", open: "8:00", close: "22:00" },
      { day: "Piątek", open: "8:00", close: "21:00" },
      { day: "Sobota", open: "9:00", close: "20:00" },
      { day: "Niedziela", open: "9:00", close: "18:00" },
    ],
    courtCount: 3,
    status: "inactive",
  },
  {
    id: "bc-4",
    name: "Squash Court Premium",
    sport: "squash",
    surface: "parquet",
    indoor: true,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    address: "ul. Powstańców 12, Warszawa",
    location: "Studio Harmonii",
    lat: 52.220,
    lng: 21.030,
    pricePerHour: 60,
    rating: 4.5,
    reviewCount: 41,
    businessId: "biz-1",
    businessName: "Studio Harmonii",
    amenities: ["szatnia", "prysznice", "sauna"],
    operatingHours: [
      { day: "Poniedziałek", open: "10:00", close: "22:00" },
      { day: "Wtorek", open: "10:00", close: "22:00" },
      { day: "Środa", open: "10:00", close: "22:00" },
      { day: "Czwartek", open: "10:00", close: "22:00" },
      { day: "Piątek", open: "10:00", close: "20:00" },
      { day: "Sobota", open: "10:00", close: "18:00" },
      { day: "Niedziela", open: "", close: "" },
    ],
    courtCount: 2,
    status: "maintenance",
  },
];

let businessCourts = [...MOCK_BUSINESS_COURTS];

export async function fetchBusinessCourts(): Promise<Court[]> {
  await delay(300);
  return [...businessCourts];
}

export async function fetchBusinessCourt(id: string): Promise<Court | undefined> {
  await delay(200);
  return businessCourts.find((c) => c.id === id);
}

export async function createBusinessCourt(data: Partial<Court>): Promise<Court> {
  await delay(400);
  const court: Court = {
    id: `bc-${Date.now()}`,
    name: data.name ?? "New Court",
    sport: data.sport ?? "tennis",
    surface: data.surface ?? "hard",
    indoor: data.indoor ?? false,
    image: data.image ?? "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    address: data.address ?? "",
    location: "Studio Harmonii",
    lat: 52.215,
    lng: 21.035,
    pricePerHour: data.pricePerHour ?? 80,
    rating: 0,
    reviewCount: 0,
    businessId: "biz-1",
    businessName: "Studio Harmonii",
    amenities: data.amenities ?? [],
    operatingHours: data.operatingHours ?? [
      { day: "Poniedziałek", open: "8:00", close: "20:00" },
      { day: "Wtorek", open: "8:00", close: "20:00" },
      { day: "Środa", open: "8:00", close: "20:00" },
      { day: "Czwartek", open: "8:00", close: "20:00" },
      { day: "Piątek", open: "8:00", close: "20:00" },
      { day: "Sobota", open: "9:00", close: "18:00" },
      { day: "Niedziela", open: "9:00", close: "16:00" },
    ],
    courtCount: data.courtCount ?? 1,
    status: data.status ?? "active",
  };
  businessCourts = [court, ...businessCourts];
  return court;
}

export async function updateBusinessCourt(
  id: string,
  data: Partial<Court>
): Promise<Court> {
  await delay(300);
  businessCourts = businessCourts.map((c) =>
    c.id === id ? { ...c, ...data } : c
  );
  return businessCourts.find((c) => c.id === id)!;
}

export async function deleteBusinessCourt(id: string): Promise<void> {
  await delay(300);
  businessCourts = businessCourts.filter((c) => c.id !== id);
}

// ── Slot generation for business courts ──

const MOCK_BOOKER_NAMES = [
  "Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Katarzyna Zielińska",
  "Tomasz Lewandowski", "Magdalena Dąbrowska", "Robert Mazur", "Agnieszka Krawczyk",
  "Michał Szymański", "Ewa Wójcik", "Łukasz Jabłoński", "Marta Olszewska",
];

const WEEKDAY_PL = [
  "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela",
];

function getOperatingRange(
  court: Court,
  weekdayIndex: number // 0=Mon … 6=Sun
): { open: number; close: number } | null {
  const dayName = WEEKDAY_PL[weekdayIndex];
  const entry = court.operatingHours.find((h) => h.day === dayName);
  if (!entry || !entry.open || !entry.close) return null; // closed
  return {
    open: parseInt(entry.open.split(":")[0], 10),
    close: parseInt(entry.close.split(":")[0], 10),
  };
}

function generateBusinessWeekSlots(courtId: string, weekStart: string): TimeSlotAvailability[] {
  const court = businessCourts.find((c) => c.id === courtId);
  if (!court) return [];

  const slots: TimeSlotAvailability[] = [];
  const startDate = new Date(weekStart);
  const total = court.courtCount ?? 1;

  const seed = courtId.split("").reduce((a, c) => a + c.charCodeAt(0), 0) + startDate.getTime();
  let rng = seed;
  const random = () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return (rng % 100) / 100;
  };

  for (let d = 0; d < 7; d++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];
    const range = getOperatingRange(court, d);

    for (let hour = 7; hour <= 21; hour++) {
      // Outside operating hours or closed day
      if (!range || hour < range.open || hour >= range.close) {
        slots.push({
          courtId,
          date: dateStr,
          hour,
          available: false,
          price: 0,
          availableCount: 0,
          totalCount: total,
          bookedCount: 0,
          closed: true,
        });
        continue;
      }

      const isWeekend = d >= 5;
      const isPeak = hour >= 17 && hour <= 20;
      const price = isWeekend
        ? Math.round(court.pricePerHour * 1.2)
        : isPeak
          ? Math.round(court.pricePerHour * 1.1)
          : court.pricePerHour;

      const booked = Math.floor(random() * (total + 1));
      const avail = total - booked;

      slots.push({
        courtId,
        date: dateStr,
        hour,
        available: avail > 0,
        price,
        availableCount: avail,
        totalCount: total,
        bookedCount: booked,
      });
    }
  }

  return slots;
}

// Slot cache for toggling — keyed by "courtId-weekStart"
const slotCache = new Map<string, TimeSlotAvailability[]>();
// Detail cache — keyed by "courtId-date-hour"
const slotDetailCache = new Map<string, CourtSlotDetail[]>();

function ensureSlotDetails(slot: TimeSlotAvailability): CourtSlotDetail[] {
  const key = `${slot.courtId}-${slot.date}-${slot.hour}`;
  if (slotDetailCache.has(key)) return slotDetailCache.get(key)!;

  const total = slot.totalCount ?? 1;
  const booked = slot.bookedCount ?? 0;
  const avail = slot.availableCount ?? (slot.available ? 1 : 0);
  const blocked = total - booked - avail;
  const seed = key.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const details: CourtSlotDetail[] = [];
  let b = 0, bl = 0;
  for (let i = 0; i < total; i++) {
    if (b < booked) {
      details.push({
        courtIndex: i + 1,
        status: "booked",
        bookedBy: MOCK_BOOKER_NAMES[(seed + i) % MOCK_BOOKER_NAMES.length],
      });
      b++;
    } else if (bl < blocked) {
      details.push({ courtIndex: i + 1, status: "blocked" });
      bl++;
    } else {
      details.push({ courtIndex: i + 1, status: "available" });
    }
  }

  slotDetailCache.set(key, details);
  return details;
}

export async function fetchCourtWeekSlots(
  courtId: string,
  weekStart: string
): Promise<TimeSlotAvailability[]> {
  await delay(300);
  const key = `${courtId}-${weekStart}`;
  if (!slotCache.has(key)) {
    slotCache.set(key, generateBusinessWeekSlots(courtId, weekStart));
  }
  return [...slotCache.get(key)!];
}

export async function fetchSlotDetails(
  courtId: string,
  weekStart: string,
  date: string,
  hour: number
): Promise<CourtSlotDetail[]> {
  await delay(150);
  const cacheKey = `${courtId}-${weekStart}`;
  if (!slotCache.has(cacheKey)) {
    slotCache.set(cacheKey, generateBusinessWeekSlots(courtId, weekStart));
  }
  const slots = slotCache.get(cacheKey)!;
  const slot = slots.find((s) => s.date === date && s.hour === hour);
  if (!slot) return [];
  return [...ensureSlotDetails(slot)];
}

export async function toggleSingleCourtSlot(
  courtId: string,
  weekStart: string,
  date: string,
  hour: number,
  courtIndex: number,
  direction: "block" | "unblock"
): Promise<{ slots: TimeSlotAvailability[]; details: CourtSlotDetail[] }> {
  await delay(150);

  // Ensure aggregate slots exist
  const cacheKey = `${courtId}-${weekStart}`;
  if (!slotCache.has(cacheKey)) {
    slotCache.set(cacheKey, generateBusinessWeekSlots(courtId, weekStart));
  }
  const slots = slotCache.get(cacheKey)!;
  const slotIdx = slots.findIndex((s) => s.date === date && s.hour === hour);
  if (slotIdx === -1) return { slots: [...slots], details: [] };

  const slot = slots[slotIdx];
  const details = ensureSlotDetails(slot);
  const detail = details.find((d) => d.courtIndex === courtIndex);
  if (!detail) return { slots: [...slots], details: [...details] };

  if (direction === "block" && detail.status === "available") {
    detail.status = "blocked";
    const avail = (slot.availableCount ?? 1) - 1;
    slots[slotIdx] = { ...slot, availableCount: avail, available: avail > 0 };
  } else if (direction === "unblock" && detail.status === "blocked") {
    detail.status = "available";
    const avail = (slot.availableCount ?? 0) + 1;
    slots[slotIdx] = { ...slot, availableCount: avail, available: avail > 0 };
  }

  // Update detail cache
  slotDetailCache.set(`${courtId}-${date}-${hour}`, [...details]);

  return { slots: [...slots], details: [...details] };
}

// ── Court Reservations ──

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}

function toISO(d: Date): string {
  return d.toISOString().split("T")[0];
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

const monday = getMonday(new Date());

const MOCK_COURT_RESERVATIONS: CourtReservation[] = [
  // bc-1 — Tennis, 4 courts
  { id: "cr-1", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(monday), startHour: 8, durationHours: 1, totalPrice: 80, status: "confirmed", userName: "Jan Kowalski", createdAt: toISO(addDays(monday, -3)) },
  { id: "cr-2", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(monday), startHour: 9, durationHours: 2, totalPrice: 160, status: "confirmed", userName: "Anna Nowak", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-3", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(monday), startHour: 10, durationHours: 1, totalPrice: 80, status: "pending", userName: "Piotr Wiśniewski", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-4", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(addDays(monday, 1)), startHour: 7, durationHours: 1, totalPrice: 80, status: "confirmed", userName: "Katarzyna Zielińska", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-5", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(addDays(monday, 1)), startHour: 14, durationHours: 2, totalPrice: 160, status: "confirmed", userName: "Tomasz Lewandowski", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-6", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(addDays(monday, 2)), startHour: 17, durationHours: 1, totalPrice: 80, status: "confirmed", userName: "Magdalena Dąbrowska", createdAt: toISO(addDays(monday, -4)) },
  { id: "cr-7", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(addDays(monday, 3)), startHour: 10, durationHours: 1, totalPrice: 80, status: "cancelled", userName: "Robert Mazur", createdAt: toISO(addDays(monday, -5)) },
  { id: "cr-8", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(addDays(monday, 4)), startHour: 16, durationHours: 2, totalPrice: 160, status: "confirmed", userName: "Agnieszka Krawczyk", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-9", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(addDays(monday, 5)), startHour: 9, durationHours: 1, totalPrice: 80, status: "confirmed", userName: "Michał Szymański", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-10", courtId: "bc-1", courtName: "Kort Tenisowy Centrum", date: toISO(addDays(monday, 5)), startHour: 11, durationHours: 2, totalPrice: 160, status: "pending", userName: "Ewa Wójcik", createdAt: toISO(addDays(monday, -1)) },

  // bc-2 — Padel, 6 courts
  { id: "cr-11", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(monday), startHour: 7, durationHours: 1, totalPrice: 120, status: "confirmed", userName: "Łukasz Jabłoński", createdAt: toISO(addDays(monday, -3)) },
  { id: "cr-12", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(monday), startHour: 8, durationHours: 2, totalPrice: 240, status: "confirmed", userName: "Marta Olszewska", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-13", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(monday), startHour: 18, durationHours: 1, totalPrice: 120, status: "confirmed", userName: "Krzysztof Jankowski", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-14", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(monday), startHour: 18, durationHours: 1, totalPrice: 120, status: "confirmed", userName: "Joanna Stępień", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-15", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(addDays(monday, 1)), startHour: 10, durationHours: 1, totalPrice: 120, status: "pending", userName: "Adam Pawlak", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-16", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(addDays(monday, 2)), startHour: 19, durationHours: 2, totalPrice: 240, status: "confirmed", userName: "Natalia Michalska", createdAt: toISO(addDays(monday, -3)) },
  { id: "cr-17", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(addDays(monday, 3)), startHour: 12, durationHours: 1, totalPrice: 120, status: "confirmed", userName: "Damian Grabowski", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-18", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(addDays(monday, 4)), startHour: 17, durationHours: 1, totalPrice: 120, status: "cancelled", userName: "Paulina Kozłowska", createdAt: toISO(addDays(monday, -4)) },
  { id: "cr-19", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(addDays(monday, 5)), startHour: 10, durationHours: 2, totalPrice: 240, status: "confirmed", userName: "Bartosz Wojciechowski", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-20", courtId: "bc-2", courtName: "Padel Arena Mokotów", date: toISO(addDays(monday, 6)), startHour: 14, durationHours: 1, totalPrice: 120, status: "confirmed", userName: "Karolina Kamińska", createdAt: toISO(addDays(monday, -2)) },

  // bc-3 — Badminton, 3 courts
  { id: "cr-21", courtId: "bc-3", courtName: "Hala Badmintona", date: toISO(monday), startHour: 9, durationHours: 1, totalPrice: 50, status: "confirmed", userName: "Rafał Piotrowski", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-22", courtId: "bc-3", courtName: "Hala Badmintona", date: toISO(addDays(monday, 1)), startHour: 16, durationHours: 2, totalPrice: 100, status: "confirmed", userName: "Aleksandra Wróblewska", createdAt: toISO(addDays(monday, -3)) },
  { id: "cr-23", courtId: "bc-3", courtName: "Hala Badmintona", date: toISO(addDays(monday, 2)), startHour: 11, durationHours: 1, totalPrice: 50, status: "pending", userName: "Grzegorz Kwiatkowski", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-24", courtId: "bc-3", courtName: "Hala Badmintona", date: toISO(addDays(monday, 4)), startHour: 18, durationHours: 1, totalPrice: 50, status: "confirmed", userName: "Dorota Malinowska", createdAt: toISO(addDays(monday, -2)) },

  // bc-4 — Squash, 2 courts
  { id: "cr-25", courtId: "bc-4", courtName: "Squash Court Premium", date: toISO(monday), startHour: 8, durationHours: 1, totalPrice: 60, status: "confirmed", userName: "Paweł Zając", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-26", courtId: "bc-4", courtName: "Squash Court Premium", date: toISO(addDays(monday, 1)), startHour: 12, durationHours: 1, totalPrice: 60, status: "confirmed", userName: "Monika Król", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-27", courtId: "bc-4", courtName: "Squash Court Premium", date: toISO(addDays(monday, 3)), startHour: 15, durationHours: 2, totalPrice: 120, status: "pending", userName: "Sebastian Sikora", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-28", courtId: "bc-4", courtName: "Squash Court Premium", date: toISO(addDays(monday, 5)), startHour: 10, durationHours: 1, totalPrice: 60, status: "cancelled", userName: "Weronika Baran", createdAt: toISO(addDays(monday, -3)) },
];

export async function fetchBusinessCourtReservations(
  courtId?: string
): Promise<CourtReservation[]> {
  await delay(250);
  if (courtId) {
    return MOCK_COURT_RESERVATIONS.filter((r) => r.courtId === courtId);
  }
  return [...MOCK_COURT_RESERVATIONS];
}

