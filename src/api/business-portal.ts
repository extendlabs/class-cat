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

