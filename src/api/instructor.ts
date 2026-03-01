import type { InstructorDetail, InstructorStats, InstructorScheduleSlot, InstructorSettings } from "@/types/instructor";
import type { InstructorAffiliation, CalendarEntry, SlotProposal } from "@/types/affiliation";
import { MOCK_AFFILIATIONS, MOCK_CALENDAR_ENTRIES, MOCK_SLOT_PROPOSALS } from "./mock-affiliations";
import { getBusinessActivitiesByInstructor } from "./business-portal";

const MOCK_INSTRUCTORS: Record<string, InstructorDetail> = {
  "inst-1": {
    id: "inst-1",
    name: "Karolina Nowak",
    title: "Instruktorka Jogi i Medytacji",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=400&fit=crop",
    verified: true,
    experience: "10 lat doświadczenia",
    bio: "Karolina prowadzi zajęcia jogi i medytacji od ponad 10 lat, łącząc tradycyjne techniki z nowoczesnym podejściem. Ukończyła szkolenia w Indiach i na Bali, zdobywając certyfikat RYT-500. Jej zajęcia kładą nacisk na uważność, prawidłową technikę oddychania i budowanie wewnętrznej równowagi. Pracowała z ponad 800 uczniami, pomagając im osiągnąć harmonię ciała i umysłu.",
    rating: 4.9,
    reviewCount: 156,
    totalStudents: 823,
    yearsExperience: 10,
    totalClasses: 6,
    specialty: "Joga i Medytacja",
    specialties: [
      "Vinyasa Flow",
      "Medytacja Uważności",
      "Joga Restoracyjna",
      "Pranayama",
      "Joga dla Początkujących",
    ],
    certifications: [
      "RYT-500 Yoga Alliance",
      "Certyfikat Medytacji Uważności",
      "Instruktor Pranayama",
    ],
    languages: ["Polski", "Angielski"],
    achievements: [
      {
        icon: "trophy",
        title: "Certyfikat RYT-500",
        description: "Ukończyła zaawansowane szkolenie jogi z 500-godzinnym programem w Rishikesh, Indie",
      },
      {
        icon: "users",
        title: "800+ Uczniów",
        description: "Pomogła ponad 800 osobom rozpocząć praktykę jogi i medytacji",
      },
      {
        icon: "medal",
        title: "Trener Roku 2023",
        description: "Wyróżniona tytułem najlepszej instruktorki wellness w Krakowie",
      },
      {
        icon: "book",
        title: "Autorka Kursu Online",
        description: "Stworzyła kurs 'Medytacja na co dzień' z ponad 5000 uczestników",
      },
    ],
    social: {
      instagram: "https://instagram.com/karolinanowak_yoga",
      youtube: "https://youtube.com/@karolinayoga",
      website: "https://karolinanowak.pl",
    },
    classes: [
      {
        id: "act-1",
        title: "Poranna Joga Vinyasa",
        description:
          "Rozpocznij dzień ożywczą sesją jogi odpowiednią dla każdego poziomu.",
        category: "fitness",
        provider: { name: "Studio Harmonii" },
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        rating: 4.8,
        reviewCount: 124,
        price: "$",
        priceAmount: 15,
        distance: 0,
        location: "Studio Harmonii, Kraków",
        timeSlots: ["morning"],
        spotsLeft: 5,
        businessId: "biz-1",
        instructorId: "inst-1",
      },
      {
        id: "act-2",
        title: "Medytacja i Uważność",
        description:
          "Znajdź spokój i jasność poprzez prowadzone praktyki medytacyjne.",
        category: "wellness",
        provider: { name: "Studio Harmonii" },
        image:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 198,
        price: "$",
        priceAmount: 12,
        distance: 0,
        location: "Studio Harmonii, Kraków",
        timeSlots: ["morning", "evening"],
        businessId: "biz-1",
        instructorId: "inst-1",
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Joanna M.",
        authorInitials: "JM",
        date: "5 stycznia 2025",
        rating: 5,
        text: "Karolina jest niesamowitą instruktorką. Jej poranne zajęcia jogi to idealny sposób na rozpoczęcie dnia. Atmosfera jest ciepła i wspierająca.",
      },
      {
        id: "r2",
        authorName: "Tomek L.",
        authorInitials: "TL",
        date: "18 grudnia 2024",
        rating: 5,
        text: "Sesje medytacji z Karoliną pomogły mi znacznie zredukować stres. Polecam każdemu, kto szuka wewnętrznego spokoju.",
      },
      {
        id: "r3",
        authorName: "Marta K.",
        authorInitials: "MK",
        date: "2 grudnia 2024",
        rating: 4,
        text: "Świetne zajęcia, choć czasem grupa jest dość duża. Mimo to Karolina potrafi poświęcić uwagę każdemu.",
      },
    ],
    ratingDistribution: [
      { stars: 5, percentage: 85 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ],
    businessId: "biz-1",
    businessName: "Studio Harmonii – Centrum Wellness",
    email: "karolina@studioharmonii.pl",
    isFreelance: true,
  },
  "inst-6": {
    id: "inst-6",
    name: "Arcymistrz Aleksander Nowak",
    title: "Instruktor Szachowy i Trener Turniejowy",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&h=400&fit=crop",
    verified: true,
    experience: "15 lat doświadczenia",
    bio: "Aleksander wyszkolił ponad 500 uczniów do sukcesów turniejowych w całej Polsce. Z najwyższym rankingiem FIDE 2580, wnosi profesjonalne spostrzeżenia i ustrukturyzowaną pedagogikę, która upraszcza złożone koncepcje dla młodych umysłów. Zaczął uczyć szachów w wieku 16 lat i od tego czasu wytrenował wielu juniorskich mistrzów na poziomie krajowym. Jego filozofia nauczania kładzie nacisk na krytyczne myślenie, rozpoznawanie wzorców i budowanie odporności psychicznej — umiejętności, które wykraczają daleko poza szachownicę.",
    rating: 4.9,
    reviewCount: 128,
    totalStudents: 523,
    yearsExperience: 15,
    totalClasses: 12,
    specialty: "Szachy Strategiczne",
    specialties: [
      "Szachy Strategiczne",
      "Przygotowanie Turniejowe",
      "Teoria Końcówek",
      "Repertuar Otwarć",
      "Coaching Młodzieżowy",
    ],
    certifications: [
      "Arcymistrz FIDE (GM)",
      "Krajowy Dyrektor Turniejowy PZSzach",
      "Certyfikat Trenera Szachów Młodzieżowych",
    ],
    languages: ["Polski", "Angielski", "Niemiecki"],
    achievements: [
      {
        icon: "trophy",
        title: "Tytuł Arcymistrza FIDE",
        description: "Uzyskał prestiżowy tytuł Arcymistrza w 2012 roku z najwyższym rankingiem 2580",
      },
      {
        icon: "users",
        title: "Trener Kadry Młodzieżowej",
        description: "Główny trener Polskiej Kadry Szachowej Młodzieży przez 3 kolejne lata",
      },
      {
        icon: "medal",
        title: "3-krotny Mistrz Polski",
        description: "Mistrz Polski w Szachach w latach 2015, 2017 i 2019",
      },
      {
        icon: "book",
        title: "Autor 'Logiki Strategicznej'",
        description: "Wydał bestsellerową książkę o strategii szachowej używaną w ponad 50 szkołach w Polsce",
      },
    ],
    social: {
      instagram: "https://instagram.com/gmaleksandernowak",
      youtube: "https://youtube.com/@aleksandernowakszachy",
      website: "https://aleksandernowak.pl",
    },
    classes: [
      {
        id: "act-7",
        title: "Klub Szachowy Mistrzów: Strategia i Taktyka",
        description:
          "Odblokuj swój potencjał w Klubie Szachowym Mistrzów. Dla graczy średniozaawansowanych.",
        category: "education",
        provider: { name: "Centrum Szachowe Kraków" },
        image:
          "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
        rating: 4.9,
        reviewCount: 128,
        price: "$$",
        priceAmount: 25,
        distance: 0.8,
        location: "Centrum Szachowe Kraków",
        timeSlots: ["morning", "afternoon"],
        spotsLeft: 4,
        businessId: "biz-2",
        instructorId: "inst-6",
      },
      {
        id: "act-8",
        title: "Szachy dla Początkujących",
        description:
          "Łagodne wprowadzenie do szachów dla dzieci i dorosłych bez doświadczenia.",
        category: "education",
        provider: { name: "Centrum Szachowe Kraków" },
        image:
          "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=400&h=300&fit=crop",
        rating: 4.8,
        reviewCount: 76,
        price: "$",
        priceAmount: 15,
        distance: 0.8,
        location: "Centrum Szachowe Kraków",
        timeSlots: ["afternoon", "weekend"],
        spotsLeft: 8,
        businessId: "biz-2",
        instructorId: "inst-6",
      },
      {
        id: "act-9",
        title: "Intensywne Przygotowanie Turniejowe",
        description:
          "Intensywne przygotowanie do nadchodzących turniejów rankingowych. Partie na czas i analiza po partii.",
        category: "education",
        provider: { name: "Centrum Szachowe Kraków" },
        image:
          "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=400&h=300&fit=crop",
        rating: 4.9,
        reviewCount: 42,
        price: "$$$",
        priceAmount: 50,
        distance: 0.8,
        location: "Centrum Szachowe Kraków",
        timeSlots: ["weekend"],
        businessId: "biz-2",
        instructorId: "inst-6",
      },
      {
        id: "act-f1",
        title: "Indywidualne Lekcje Szachowe",
        description:
          "Lekcje jeden na jeden dopasowane do Twojego poziomu. Analiza partii, otwarcia i końcówki.",
        category: "education",
        provider: { name: "Aleksander Nowak" },
        image:
          "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=400&h=300&fit=crop",
        rating: 5.0,
        reviewCount: 34,
        price: "$$$",
        priceAmount: 80,
        distance: 0,
        location: "Online / Kraków",
        timeSlots: ["morning", "afternoon"],
        instructorId: "inst-6",
      },
      {
        id: "act-f2",
        title: "Szachy Online – Kurs Strategii",
        description:
          "Kurs online dla graczy średniozaawansowanych. Cotygodniowe webinary i zadania treningowe.",
        category: "education",
        provider: { name: "Aleksander Nowak" },
        image:
          "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=400&h=300&fit=crop",
        rating: 4.8,
        reviewCount: 56,
        price: "$$",
        priceAmount: 30,
        distance: 0,
        location: "Online",
        timeSlots: ["afternoon", "evening"],
        instructorId: "inst-6",
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Marek Kowalski",
        authorInitials: "MK",
        date: "15 października 2024",
        rating: 5,
        text: "Aleksander jest niesamowitym mentorem. Ranking mojego syna poprawił się o ponad 200 punktów w zaledwie dwa miesiące. Sesje są ustrukturyzowane, a analiza profesjonalnych partii jest bardzo pomocna.",
      },
      {
        id: "r2",
        authorName: "Elena K.",
        authorInitials: "EK",
        date: "28 września 2024",
        rating: 5,
        text: "Świetny program skupiający się na końcówkach, które większość innych klubów ignoruje. Mała grupa pozwala na indywidualną uwagę. Gorąco polecam dla poważnych młodych graczy.",
      },
      {
        id: "r3",
        authorName: "Dawid Wiśniewski",
        authorInitials: "DW",
        date: "12 września 2024",
        rating: 5,
        text: "Doskonała atmosfera i bardzo profesjonalne podejście. Szachownice są wysokiej jakości, a cyfrowa analiza po partii pomaga uczniom natychmiast zrozumieć swoje błędy.",
      },
      {
        id: "r4",
        authorName: "Anna J.",
        authorInitials: "AJ",
        date: "20 sierpnia 2024",
        rating: 4,
        text: "Bardzo podobało mi się ustrukturyzowane podejście. Moja córka przeszła od zera do pierwszego turnieju w zaledwie 3 miesiące. Aleksander jest cierpliwy i zachęcający.",
      },
    ],
    ratingDistribution: [
      { stars: 5, percentage: 90 },
      { stars: 4, percentage: 8 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 },
    ],
    businessId: "biz-2",
    businessName: "Centrum Szachowe Kraków",
    email: "aleksander@szachykrakow.pl",
    affiliations: [
      {
        instructorId: "inst-6",
        businessId: "biz-2",
        businessName: "Centrum Szachowe Kraków",
        status: "active",
        role: "contractor",
        startDate: "2023-09-01",
      },
    ],
  },
};

const MOCK_STATS: InstructorStats = {
  totalStudents: 523,
  activeClasses: 5,
  avgRating: 4.9,
  totalReviews: 128,
  upcomingClasses: 7,
  freelanceClasses: 2,
  affiliatedBusinesses: 1,
  monthlyEarnings: 4850,
  freelanceEarnings: 2400,
  businessEarnings: 2450,
};

let schedule: InstructorScheduleSlot[] = [
  { id: "s1", dayOfWeek: 1, startTime: "09:00", endTime: "11:00", activityId: "act-7", activityTitle: "Klub Szachowy Mistrzów", recurring: true, businessId: "biz-1", businessName: "Studio Harmonii" },
  { id: "s2", dayOfWeek: 1, startTime: "14:00", endTime: "16:00", activityId: "act-8", activityTitle: "Szachy dla Początkujących", recurring: true, businessId: "biz-1", businessName: "Studio Harmonii" },
  { id: "s3", dayOfWeek: 3, startTime: "09:00", endTime: "11:00", activityId: "act-7", activityTitle: "Klub Szachowy Mistrzów", recurring: true, businessId: "biz-2", businessName: "Centrum Szachowe Kraków" },
  { id: "s4", dayOfWeek: 3, startTime: "14:00", endTime: "16:00", activityId: "act-8", activityTitle: "Szachy dla Początkujących", recurring: true, businessId: "biz-2", businessName: "Centrum Szachowe Kraków" },
  { id: "s5", dayOfWeek: 5, startTime: "10:00", endTime: "12:00", activityId: "act-f1", activityTitle: "Indywidualne Lekcje Szachowe", recurring: false },
  { id: "s6", dayOfWeek: 6, startTime: "10:00", endTime: "14:00", activityId: "act-9", activityTitle: "Intensywne Przygotowanie Turniejowe", recurring: true, businessId: "biz-2", businessName: "Centrum Szachowe Kraków" },
];

const MOCK_SETTINGS: InstructorSettings = {
  notifications: {
    newBookings: true,
    reviews: true,
    scheduleChanges: true,
    reminders: true,
  },
  privacy: {
    profilePublic: true,
    showStats: true,
  },
};

export async function getInstructorById(
  id: string
): Promise<InstructorDetail | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_INSTRUCTORS[id] ?? null;
}

export async function fetchInstructorProfile(
  id: string
): Promise<InstructorDetail> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const instructor = MOCK_INSTRUCTORS[id] ?? { ...MOCK_INSTRUCTORS["inst-6"]!, id };

  // Merge dynamically assigned business activities into classes
  const assignedActivities = getBusinessActivitiesByInstructor(id);
  const existingIds = new Set(instructor.classes.map((c) => c.id));
  const newClasses = assignedActivities
    .filter((a) => !existingIds.has(a.id))
    .map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      category: a.category,
      provider: a.provider,
      image: a.image,
      rating: a.rating,
      reviewCount: a.reviewCount,
      price: a.price,
      priceAmount: a.priceAmount,
      distance: a.distance,
      location: a.location,
      timeSlots: a.timeSlots,
      spotsLeft: a.spotsLeft,
      businessId: "biz-1",
      instructorId: id,
    }));

  return {
    ...instructor,
    classes: [...instructor.classes, ...newClasses],
  };
}

export async function fetchInstructorStats(
  _id: string
): Promise<InstructorStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_STATS;
}

export async function fetchInstructorSchedule(
  _id: string
): Promise<InstructorScheduleSlot[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...schedule];
}

export async function updateInstructorSchedule(
  _id: string,
  slots: InstructorScheduleSlot[]
): Promise<InstructorScheduleSlot[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  schedule = [...slots];
  return slots;
}

export async function fetchInstructorSettings(
  _id: string
): Promise<InstructorSettings> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { ...MOCK_SETTINGS };
}

// ── Affiliations ──

let affiliations = [...MOCK_AFFILIATIONS];

export async function fetchInstructorAffiliations(
  instructorId: string
): Promise<InstructorAffiliation[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return affiliations.filter((a) => a.instructorId === instructorId);
}

export async function respondToAffiliation(
  instructorId: string,
  businessId: string,
  accept: boolean
): Promise<InstructorAffiliation> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  affiliations = affiliations.map((a) =>
    a.instructorId === instructorId && a.businessId === businessId
      ? { ...a, status: accept ? "active" : "ended" }
      : a
  );
  return affiliations.find(
    (a) => a.instructorId === instructorId && a.businessId === businessId
  )!;
}

// ── Calendar ──

function generateCalendarFromSchedule(
  instructorId: string,
  slots: InstructorScheduleSlot[],
  rangeStart: Date,
  rangeEnd: Date
): CalendarEntry[] {
  const entries: CalendarEntry[] = [];
  const current = new Date(rangeStart);
  while (current <= rangeEnd) {
    const dow = current.getDay();
    const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;
    for (const slot of slots) {
      if (slot.dayOfWeek === dow) {
        entries.push({
          id: `cal-gen-${dateStr}-${slot.id}`,
          instructorId,
          activityId: slot.activityId ?? "",
          activityTitle: slot.activityTitle ?? "Available",
          businessId: slot.businessId,
          businessName: slot.businessName,
          status: "confirmed",
          date: dateStr,
          startTime: slot.startTime,
          endTime: slot.endTime,
          recurring: slot.recurring,
        });
      }
    }
    current.setDate(current.getDate() + 1);
  }
  return entries;
}

export async function fetchInstructorCalendar(
  instructorId: string
): Promise<CalendarEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Generate from current schedule: ±2 weeks around today
  const today = new Date();
  const rangeStart = new Date(today);
  rangeStart.setDate(rangeStart.getDate() - 14);
  const rangeEnd = new Date(today);
  rangeEnd.setDate(rangeEnd.getDate() + 14);

  const generated = generateCalendarFromSchedule(instructorId, schedule, rangeStart, rangeEnd);

  // Get special entries (cancelled, pending_approval) from mock data
  const specialEntries = MOCK_CALENDAR_ENTRIES.filter(
    (e) => e.instructorId === instructorId && e.status !== "confirmed"
  );

  // Special entries override generated entries on same date+time
  const overrideKeys = new Set(
    specialEntries.map((e) => `${e.date}|${e.startTime}`)
  );
  const filtered = generated.filter(
    (e) => !overrideKeys.has(`${e.date}|${e.startTime}`)
  );

  return [...filtered, ...specialEntries];
}

// ── Cancel Calendar Entry ──

export async function cancelCalendarEntry(
  entry: CalendarEntry,
  note?: string
): Promise<CalendarEntry> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const cancelled: CalendarEntry = {
    ...entry,
    status: "cancelled",
    cancellationNote: note || undefined,
  };

  // Check if an override already exists for this date+time
  const existingIdx = MOCK_CALENDAR_ENTRIES.findIndex(
    (e) => e.instructorId === entry.instructorId && e.date === entry.date && e.startTime === entry.startTime
  );
  if (existingIdx >= 0) {
    MOCK_CALENDAR_ENTRIES[existingIdx] = cancelled;
  } else {
    MOCK_CALENDAR_ENTRIES.push(cancelled);
  }

  return cancelled;
}

// ── Fetch Activity Sessions ──

export async function fetchActivitySessions(
  activityId: string
): Promise<CalendarEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const today = new Date();
  const rangeEnd = new Date(today);
  rangeEnd.setDate(rangeEnd.getDate() + 28);

  // Generate entries from schedule for this activity
  const activitySlots = schedule.filter((s) => s.activityId === activityId);
  const generated = generateCalendarFromSchedule("inst-6", activitySlots, today, rangeEnd);

  // Get special entries for this activity
  const specialEntries = MOCK_CALENDAR_ENTRIES.filter(
    (e) => e.activityId === activityId && e.date >= formatDateLocal(today) && e.date <= formatDateLocal(rangeEnd)
  );

  // Special entries override generated entries on same date+time
  const overrideKeys = new Set(
    specialEntries.map((e) => `${e.date}|${e.startTime}`)
  );
  const filtered = generated.filter(
    (e) => !overrideKeys.has(`${e.date}|${e.startTime}`)
  );

  return [...filtered, ...specialEntries].sort(
    (a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)
  );
}

function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ── Slot Proposals ──

let slotProposals = [...MOCK_SLOT_PROPOSALS];

export async function fetchSlotProposals(
  instructorId: string
): Promise<SlotProposal[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return slotProposals.filter((p) => p.instructorId === instructorId);
}

export async function respondToSlotProposal(
  proposalId: string,
  accept: boolean
): Promise<SlotProposal> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  slotProposals = slotProposals.map((p) =>
    p.id === proposalId
      ? {
          ...p,
          status: accept ? "approved" : "rejected",
          respondedAt: new Date().toISOString(),
        }
      : p
  );
  return slotProposals.find((p) => p.id === proposalId)!;
}

