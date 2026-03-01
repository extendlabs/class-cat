import type { ActivityDetail } from "@/types/activity";
import { MOCK_COHORTS } from "./enrollments";

import type { Review, RatingDistribution } from "@/types/activity";

const MOCK_ACTIVITY_DETAIL: ActivityDetail = {
  id: "act-7",
  title: "Klub Szachowy Mistrzów: Strategia i Taktyka",
  description:
    "Odblokuj swój potencjał w Klubie Szachowym Mistrzów. Kurs zaprojektowany dla graczy średniozaawansowanych, którzy chcą przejść do gry turniejowej. Program skupia się na głębokim zrozumieniu pozycji, opanowaniu końcówek i odporności psychicznej. Nasz program jest dostosowany, aby wypełnić lukę między grą rekreacyjną a doskonałością na poziomie turniejowym.",
  category: "education",
  provider: { name: "Centrum Szachowe Kraków", avatar: "/placeholder-avatar.jpg" },
  image:
    "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=600&fit=crop",
  rating: 4.9,
  reviewCount: 128,
  price: "$",
  priceAmount: 25,
  distance: 2.3,
  location: "Kraków",
  timeSlots: ["morning", "afternoon"],
  spotsLeft: 4,
  businessId: "biz-2",
  instructorId: "inst-6",
  badges: ["Zweryfikowane Zajęcia", "Grupa: Maks. 12 uczniów"],
  ageRange: "Ages 8-15",
  duration: "90 min",
  classType: "Zajęcia Grupowe",
  maxStudents: 12,
  skillLevel: "Średniozaawansowany do zaawansowanego (1200+ ELO)",
  materialsIncluded: "Szachownice premium, zeszyty notacyjne, analiza cyfrowa",
  instructor: {
    id: "inst-6",
    name: "Arcymistrz Aleksander Nowak",
    title: "Instruktor Szachowy",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    experience: "15 lat doświadczenia",
    bio: "Aleksander wyszkolił ponad 500 uczniów do sukcesów turniejowych w całej Polsce. Z najwyższym rankingiem FIDE 2580, wnosi profesjonalne spostrzeżenia i ustrukturyzowaną pedagogikę, która upraszcza złożone koncepcje dla młodych umysłów.",
    verified: true,
  },
  curriculum: [
    {
      week: 1,
      title: "Podstawy Strategii",
      description:
        "Zrozumienie struktur pionkowych i znaczenia kontroli centrum w złożonych grach środkowych.",
    },
    {
      week: 2,
      title: "Mistrzostwo Taktyczne",
      description:
        "Głębokie zagłębienie w odciąganie, interferencję i podwójne ataki w scenariuszach turniejowych.",
    },
    {
      week: 3,
      title: "Nowoczesna Końcówka",
      description:
        "Wygrywanie z niewielką przewagą: wieża kontra lekka figura i strategie promocji pionka.",
    },
  ],
  whatYouLearn: [
    "Zaawansowany repertuar otwarć i teoria",
    "Rozpoznawanie złożonych wzorców taktycznych",
    "Klasyczne techniki końcówek i skróty",
    "Analiza partii i przegląd z silnikiem",
  ],
  reviews: [
    {
      id: "r1",
      authorName: "Marek Kowalski",
      authorInitials: "MK",
      date: "15 października 2024",
      rating: 5,
      text: "Aleksander jest niesamowitym mentorem. Ranking mojego syna poprawił się o ponad 200 punktów w zaledwie dwa miesiące. Sesje są ustrukturyzowane, a analiza profesjonalnych partii jest bardzo pomocna dla graczy średniozaawansowanych.",
    },
    {
      id: "r2",
      authorName: "Elena K.",
      authorInitials: "EK",
      date: "28 września 2024",
      rating: 4,
      text: "Świetny program skupiający się na końcówkach, które większość innych klubów ignoruje. Mała grupa pozwala na indywidualną uwagę nawet w zajęciach grupowych. Gorąco polecam dla poważnych młodych graczy.",
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
      authorName: "Anna Zielińska",
      authorInitials: "AZ",
      date: "30 sierpnia 2024",
      rating: 5,
      text: "Moja córka uwielbia te zajęcia. Aleksander potrafi sprawić, że złożone strategie stają się dostępne dla młodszych graczy. Format turnieju próbnego utrzymuje zaangażowanie i motywację wszystkich.",
    },
    {
      id: "r5",
      authorName: "Jakub Pawlak",
      authorInitials: "JP",
      date: "18 sierpnia 2024",
      rating: 4,
      text: "Solidna instrukcja i dobry stosunek jakości do ceny. Program jest dobrze ustrukturyzowany. Chciałbym, żeby oferowano więcej sesji w tygodniu, bo obecny harmonogram bywa trudny do dopasowania.",
    },
    {
      id: "r6",
      authorName: "Priya Sharma",
      authorInitials: "PS",
      date: "5 sierpnia 2024",
      rating: 3,
      text: "Ogólnie przyzwoity program, ale tempo może być nieco za szybkie dla dzieci bliżej dolnego końca poziomu średniozaawansowanego. Materiały są dobre, a Aleksander jest cierpliwy.",
    },
    {
      id: "r7",
      authorName: "Michał Tomaszewski",
      authorInitials: "MT",
      date: "22 lipca 2024",
      rating: 5,
      text: "Najlepsza nauka szachów w Krakowie. Kropka. Doświadczenie Aleksandra jako arcymistrza naprawdę widać w głębokości jego analizy. Mój syn przeszedł z 1300 do 1600 ELO w trzy miesiące.",
    },
    {
      id: "r8",
      authorName: "Lidia Chmielewska",
      authorInitials: "LC",
      date: "10 lipca 2024",
      rating: 4,
      text: "Bardzo zorganizowane i profesjonalne zajęcia. Narzędzia do cyfrowej analizy po każdej partii to świetny dodatek. Parking w weekendy bywa kłopotliwy, ale same zajęcia są doskonałe.",
    },
    {
      id: "r9",
      authorName: "Robert Kamiński",
      authorInitials: "RK",
      date: "28 czerwca 2024",
      rating: 3,
      text: "Dobra instrukcja, ale grupa czasami wydaje się zbyt duża. Niektóre sesje miały 12 uczniów i trudno było o indywidualną uwagę. Mimo to warto ze względu na program.",
    },
  ],
  ratingDistribution: [
    { stars: 5, percentage: 90 },
    { stars: 4, percentage: 8 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ],
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=400&h=300&fit=crop",
      alt: "Uczniowie współpracują nad strategią szachową",
      caption: "Wspólna Analiza",
    },
    {
      src: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=400&h=300&fit=crop",
      alt: "Interaktywne środowisko nauki",
      caption: "Nowoczesna Sala",
    },
    {
      src: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
      alt: "Praktyka turniejowa",
      caption: "Turnieje Próbne",
    },
    {
      src: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=400&h=300&fit=crop",
      alt: "Instruktor udziela informacji zwrotnej",
      caption: "Indywidualne Wskazówki",
    },
    {
      src: "https://images.unsplash.com/photo-1586165368502-1bad9cc34fc1?w=400&h=300&fit=crop",
      alt: "Skupienie i koncentracja podczas zajęć",
      caption: "Sesje Głębokiego Skupienia",
    },
    {
      src: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=400&h=300&fit=crop",
      alt: "Uczniowie świętują zwycięstwo",
      caption: "Duch Wspólnoty",
    },
  ],
  relatedActivities: [
    {
      id: "7",
      title: "Młody Programista – Python",
      description: "Zabawne, interaktywne lekcje kodowania dla dzieci w wieku 8-14 lat.",
      category: "tech",
      provider: { name: "Code Camp Warszawa" },
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 42,
      price: "$$",
      priceAmount: 30,
      distance: 3.2,
      location: "Emilii Plater, Warszawa",
      timeSlots: ["afternoon", "weekend"],
    },
    {
      id: "13",
      title: "Klub Gier Planszowych",
      description:
        "Gry planszowe, strategia i zabawa dla wszystkich grup wiekowych w przyjaznej atmosferze.",
      category: "education",
      provider: { name: "Planszówkowy Raj" },
      image:
        "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 88,
      price: "$",
      priceAmount: 15,
      distance: 1.8,
      location: "Kazimierz, Kraków",
      timeSlots: ["afternoon", "evening"],
    },
    {
      id: "14",
      title: "Robotyka z LEGO Mindstorms",
      description: "Buduj i programuj roboty w tych praktycznych warsztatach STEM.",
      category: "tech",
      provider: { name: "Centrum Nauki Kopernik" },
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 56,
      price: "$$",
      priceAmount: 45,
      distance: 4.5,
      location: "Wybrzeże Kościuszkowskie, Warszawa",
      timeSlots: ["weekend"],
    },
  ],
  slotsRemaining: 4,
  totalSlots: 12,
  availableTimes: ["10:00", "14:00"],
  nextDate: "Sobota, 26 paź",
};

// Mutable reviews store keyed by activity id
const reviewsStore: Record<string, Review[]> = {};

function getReviews(activityId: string): Review[] {
  if (!reviewsStore[activityId]) {
    reviewsStore[activityId] = [...MOCK_ACTIVITY_DETAIL.reviews];
  }
  return reviewsStore[activityId];
}

function recalcRating(reviews: Review[]): { rating: number; reviewCount: number; ratingDistribution: RatingDistribution[] } {
  const reviewCount = reviews.length;
  const rating = reviewCount > 0 ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10 : 0;
  const counts = [0, 0, 0, 0, 0]; // index 0 = 1 star
  for (const r of reviews) counts[Math.min(Math.max(Math.floor(r.rating), 1), 5) - 1]++;
  const ratingDistribution: RatingDistribution[] = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percentage: reviewCount > 0 ? Math.round((counts[stars - 1] / reviewCount) * 100) : 0,
  }));
  return { rating, reviewCount, ratingDistribution };
}

export async function submitActivityReview(
  activityId: string,
  review: { rating: number; text: string; authorName: string; authorInitials: string }
): Promise<Review> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const reviews = getReviews(activityId);
  const newReview: Review = {
    id: `r-${Date.now()}`,
    authorName: review.authorName,
    authorInitials: review.authorInitials,
    date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
    rating: review.rating,
    text: review.text,
  };
  reviews.unshift(newReview);
  return newReview;
}

export async function getActivityById(
  id: string
): Promise<ActivityDetail | null> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const cohorts = MOCK_COHORTS.filter((c) => c.activityId === (id === MOCK_ACTIVITY_DETAIL.id ? MOCK_ACTIVITY_DETAIL.id : id));
  const reviews = getReviews(id);
  const { rating, reviewCount, ratingDistribution } = recalcRating(reviews);
  const detail = {
    ...MOCK_ACTIVITY_DETAIL,
    reviews,
    rating,
    reviewCount,
    ratingDistribution,
    cohorts: cohorts.length > 0 ? cohorts : MOCK_COHORTS.filter((c) => c.activityId === "act-7"),
  };

  if (id === "act-7" || id === MOCK_ACTIVITY_DETAIL.id) {
    return detail;
  }
  // Return the same data with the requested id for demo purposes
  return { ...detail, id };
}
