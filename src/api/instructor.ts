import type { InstructorDetail, InstructorStats, InstructorScheduleSlot, InstructorSettings } from "@/types/instructor";

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
  },
};

const MOCK_STATS: InstructorStats = {
  totalStudents: 523,
  activeClasses: 3,
  avgRating: 4.9,
  totalReviews: 128,
  upcomingClasses: 5,
};

const MOCK_SCHEDULE: InstructorScheduleSlot[] = [
  { id: "s1", dayOfWeek: 1, startTime: "09:00", endTime: "11:00", activityId: "act-7", activityTitle: "Klub Szachowy Mistrzów", recurring: true },
  { id: "s2", dayOfWeek: 1, startTime: "14:00", endTime: "16:00", activityId: "act-8", activityTitle: "Szachy dla Początkujących", recurring: true },
  { id: "s3", dayOfWeek: 3, startTime: "09:00", endTime: "11:00", activityId: "act-7", activityTitle: "Klub Szachowy Mistrzów", recurring: true },
  { id: "s4", dayOfWeek: 3, startTime: "14:00", endTime: "16:00", activityId: "act-8", activityTitle: "Szachy dla Początkujących", recurring: true },
  { id: "s5", dayOfWeek: 5, startTime: "10:00", endTime: "12:00", recurring: false },
  { id: "s6", dayOfWeek: 6, startTime: "10:00", endTime: "14:00", activityId: "act-9", activityTitle: "Intensywne Przygotowanie Turniejowe", recurring: true },
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
  const instructor = MOCK_INSTRUCTORS[id];
  return instructor ?? { ...MOCK_INSTRUCTORS["inst-6"]!, id };
}

export async function fetchInstructorStats(
  id: string
): Promise<InstructorStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_STATS;
}

export async function fetchInstructorSchedule(
  id: string
): Promise<InstructorScheduleSlot[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...MOCK_SCHEDULE];
}

export async function updateInstructorSchedule(
  id: string,
  slots: InstructorScheduleSlot[]
): Promise<InstructorScheduleSlot[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return slots;
}

export async function fetchInstructorSettings(
  id: string
): Promise<InstructorSettings> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { ...MOCK_SETTINGS };
}

