import type { UserProfile, Booking, UserReview, UserSettings } from "@/types/user";

const MOCK_USER: UserProfile = {
  id: "user-1",
  name: "Katarzyna Wiśniewska",
  email: "katarzyna.wisniewska@email.pl",
  phone: "+48 512 345 678",
  location: "Kraków",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  memberSince: "2024-03-15",
  totalBookings: 24,
};

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1",
    activity: {
      id: "pop-1",
      title: "Poranna Joga Vinyasa",
      description: "Rozpocznij dzień ożywczą sesją jogi.",
      category: "fitness",
      provider: { name: "Studio Jogi Kazimierz" },
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 96,
      price: "$",
      priceAmount: 20,
      distance: 0.3,
      location: "Kazimierz, Kraków",
      timeSlots: ["morning"],
    },
    date: "2026-02-18",
    time: "7:00",
    status: "confirmed",
  },
  {
    id: "b2",
    activity: {
      id: "pop-2",
      title: "Warsztaty Kuchni Włoskiej",
      description: "Opanuj autentyczne włoskie przepisy na makaron.",
      category: "cooking",
      provider: { name: "Kuchnia Szefa Marco" },
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 214,
      price: "$$$",
      priceAmount: 65,
      distance: 1.2,
      location: "Świdnicka, Wrocław",
      timeSlots: ["evening", "weekend"],
    },
    date: "2026-02-22",
    time: "18:00",
    status: "pending",
  },
  {
    id: "b3",
    activity: {
      id: "pop-3",
      title: "Taniec Współczesny",
      description: "Wyrażaj siebie poprzez ruch i taniec współczesny.",
      category: "dance",
      provider: { name: "Kolektyw Sztuki Ruchu" },
      image:
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 73,
      price: "$$",
      priceAmount: 30,
      distance: 0.9,
      location: "Ruska, Wrocław",
      timeSlots: ["afternoon"],
    },
    date: "2026-01-28",
    time: "14:00",
    status: "completed",
  },
  {
    id: "b4",
    activity: {
      id: "trend-1",
      title: "Spacer Fotograficzny po Mieście",
      description: "Uchwycić piękno miasta z profesjonalnym przewodnikiem.",
      category: "education",
      provider: { name: "Fotoklub Kraków" },
      image:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 67,
      price: "$$",
      priceAmount: 45,
      distance: 0.6,
      location: "Stare Miasto, Kraków",
      timeSlots: ["morning", "weekend"],
    },
    date: "2026-01-15",
    time: "10:00",
    status: "completed",
  },
  {
    id: "b5",
    activity: {
      id: "trend-3",
      title: "Studio Ceramiki i Gliny",
      description: "Ubrudź ręce formując glinę na kole garncarskim.",
      category: "arts",
      provider: { name: "GlinArt Poznań" },
      image:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 88,
      price: "$$",
      priceAmount: 55,
      distance: 1.8,
      location: "Stary Rynek, Poznań",
      timeSlots: ["afternoon", "weekend"],
      spotsLeft: 2,
    },
    date: "2025-12-20",
    time: "15:00",
    status: "cancelled",
  },
];

const MOCK_SETTINGS: UserSettings = {
  notifications: {
    bookingUpdates: true,
    newClasses: true,
    promotions: false,
    reminders: true,
  },
  defaultRadius: "10km",
  language: "Polski",
  privacyProfilePublic: true,
  privacyShowBookings: false,
};

// ── Instructor (Aleksander) consumer data ──

const MOCK_USER_INSTRUCTOR: UserProfile = {
  id: "user-instructor-1",
  name: "Aleksander Nowak",
  email: "aleksander.nowak@email.pl",
  phone: "+48 600 111 222",
  location: "Kraków",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  memberSince: "2023-06-01",
  totalBookings: 8,
  instructorId: "inst-6",
};

const MOCK_BOOKINGS_INSTRUCTOR: Booking[] = [
  {
    id: "bi1",
    activity: {
      id: "pop-1",
      title: "Poranna Joga Vinyasa",
      description: "Rozpocznij dzień ożywczą sesją jogi.",
      category: "fitness",
      provider: { name: "Studio Jogi Kazimierz" },
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 96,
      price: "$",
      priceAmount: 20,
      distance: 0.3,
      location: "Kazimierz, Kraków",
      timeSlots: ["morning"],
    },
    date: "2026-02-20",
    time: "7:00",
    status: "confirmed",
  },
  {
    id: "bi2",
    activity: {
      id: "trend-3",
      title: "Studio Ceramiki i Gliny",
      description: "Ubrudź ręce formując glinę na kole garncarskim.",
      category: "arts",
      provider: { name: "GlinArt Poznań" },
      image:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 88,
      price: "$$",
      priceAmount: 55,
      distance: 1.8,
      location: "Stary Rynek, Poznań",
      timeSlots: ["afternoon", "weekend"],
    },
    date: "2026-02-25",
    time: "15:00",
    status: "pending",
  },
  {
    id: "bi3",
    activity: {
      id: "pop-3",
      title: "Taniec Współczesny",
      description: "Wyrażaj siebie poprzez ruch i taniec współczesny.",
      category: "dance",
      provider: { name: "Kolektyw Sztuki Ruchu" },
      image:
        "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 73,
      price: "$$",
      priceAmount: 30,
      distance: 0.9,
      location: "Ruska, Wrocław",
      timeSlots: ["afternoon"],
    },
    date: "2026-01-10",
    time: "14:00",
    status: "completed",
  },
];

const MOCK_REVIEWS_INSTRUCTOR: UserReview[] = [
  {
    id: "ri1",
    activityTitle: "Poranna Joga Vinyasa",
    activityId: "pop-1",
    providerName: "Studio Jogi Kazimierz",
    rating: 5,
    text: "Świetne zajęcia na start dnia. Czuję się odprężony i pełen energii po każdej sesji.",
    date: "2026-01-15",
  },
  {
    id: "ri2",
    activityTitle: "Studio Ceramiki i Gliny",
    activityId: "trend-3",
    providerName: "GlinArt Poznań",
    rating: 4,
    text: "Ciekawe doświadczenie. Prowadzący bardzo pomocny, a atmosfera w pracowni relaksująca.",
    date: "2025-12-20",
  },
];

const MOCK_SETTINGS_INSTRUCTOR: UserSettings = {
  notifications: {
    bookingUpdates: true,
    newClasses: false,
    promotions: false,
    reminders: true,
  },
  defaultRadius: "5km",
  language: "Polski",
  privacyProfilePublic: true,
  privacyShowBookings: true,
};

const MOCK_USER_REVIEWS: UserReview[] = [
  {
    id: "r1",
    activityTitle: "Poranna Joga Vinyasa",
    activityId: "pop-1",
    providerName: "Studio Jogi Kazimierz",
    rating: 5,
    text: "Fantastyczne zajęcia! Instruktorka jest bardzo cierpliwa i profesjonalna. Idealne na rozpoczęcie dnia.",
    date: "2026-02-10",
  },
  {
    id: "r2",
    activityTitle: "Warsztaty Kuchni Włoskiej",
    activityId: "pop-2",
    providerName: "Kuchnia Szefa Marco",
    rating: 5,
    text: "Marco jest niesamowitym szefem kuchni! Nauczyłam się robić prawdziwe tagliatelle od zera. Polecam każdemu!",
    date: "2026-01-25",
  },
  {
    id: "r3",
    activityTitle: "Taniec Współczesny",
    activityId: "pop-3",
    providerName: "Kolektyw Sztuki Ruchu",
    rating: 4,
    text: "Bardzo kreatywne podejście do tańca. Jedyny minus to trochę za duża grupa, ale atmosfera super.",
    date: "2026-01-20",
  },
  {
    id: "r4",
    activityTitle: "Spacer Fotograficzny po Mieście",
    activityId: "trend-1",
    providerName: "Fotoklub Kraków",
    rating: 5,
    text: "Odkryłam zakątki Krakowa, które mijałam setki razy nie zwracając uwagi. Przewodnik pełen pasji i wiedzy.",
    date: "2025-12-18",
  },
  {
    id: "r5",
    activityTitle: "Studio Ceramiki i Gliny",
    activityId: "trend-3",
    providerName: "GlinArt Poznań",
    rating: 4,
    text: "Świetna zabawa przy kole garncarskim. Materiały i narzędzia na wysokim poziomie.",
    date: "2025-11-30",
  },
];

export async function fetchUserReviews(userId?: string): Promise<UserReview[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (userId === "user-instructor-1") return MOCK_REVIEWS_INSTRUCTOR;
  return MOCK_USER_REVIEWS;
}

export async function fetchUserProfile(userId?: string): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (userId === "user-instructor-1") return MOCK_USER_INSTRUCTOR;
  return MOCK_USER;
}

export async function fetchUserBookings(userId?: string): Promise<Booking[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (userId === "user-instructor-1") return MOCK_BOOKINGS_INSTRUCTOR;
  return MOCK_BOOKINGS;
}

export async function fetchUserSettings(userId?: string): Promise<UserSettings> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  if (userId === "user-instructor-1") return MOCK_SETTINGS_INSTRUCTOR;
  return MOCK_SETTINGS;
}
