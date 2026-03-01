import type { Court, CourtReservation, RecurringBlock, TimeSlotAvailability } from "@/types/court";

export const MOCK_COURTS: Court[] = [
  {
    id: "court-1",
    name: "Kort Tenisowy Centrum",
    sport: "tennis",
    surface: "clay",
    indoor: false,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    address: "ul. Myśliwiecka 4, Warszawa",
    location: "Klub Tenisowy Łazienki",
    lat: 52.215,
    lng: 21.035,
    pricePerHour: 80,
    rating: 4.8,
    reviewCount: 156,
    businessId: "biz-1",
    businessName: "Klub Tenisowy Łazienki",
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
    isPromoted: true,
  },
  {
    id: "court-2",
    name: "Padel Arena Mokotów",
    sport: "padel",
    surface: "synthetic",
    indoor: true,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    address: "ul. Konstruktorska 8, Warszawa",
    location: "Kompleks Sportowy Mokotów",
    lat: 52.198,
    lng: 21.040,
    pricePerHour: 120,
    rating: 4.9,
    reviewCount: 89,
    businessId: "biz-1",
    businessName: "Padel Club Mokotów",
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
    isPromoted: true,
  },
  {
    id: "court-3",
    name: "Hala Badmintona Kraków",
    sport: "badminton",
    surface: "parquet",
    indoor: true,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop",
    address: "ul. Kamieńskiego 3, Kraków",
    location: "Centrum Sportowe Podgórze",
    lat: 50.040,
    lng: 19.960,
    pricePerHour: 50,
    rating: 4.6,
    reviewCount: 72,
    businessId: "biz-2",
    businessName: "Centrum Sportowe Podgórze",
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
  },
  {
    id: "court-4",
    name: "Squash City Wrocław",
    sport: "squash",
    surface: "parquet",
    indoor: true,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    address: "ul. Powstańców Śląskich 95, Wrocław",
    location: "Squash City Club",
    lat: 51.095,
    lng: 17.020,
    pricePerHour: 60,
    rating: 4.7,
    reviewCount: 94,
    businessId: "biz-3",
    businessName: "Squash City Club",
    amenities: ["szatnia", "prysznice", "sauna", "bar"],
    operatingHours: [
      { day: "Poniedziałek", open: "7:00", close: "22:00" },
      { day: "Wtorek", open: "7:00", close: "22:00" },
      { day: "Środa", open: "7:00", close: "22:00" },
      { day: "Czwartek", open: "7:00", close: "22:00" },
      { day: "Piątek", open: "7:00", close: "22:00" },
      { day: "Sobota", open: "8:00", close: "20:00" },
      { day: "Niedziela", open: "9:00", close: "18:00" },
    ],
  },
  {
    id: "court-5",
    name: "Kort Tenisowy Gdańsk",
    sport: "tennis",
    surface: "hard",
    indoor: false,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    address: "ul. Grunwaldzka 470, Gdańsk",
    location: "Olivia Tennis Club",
    lat: 54.380,
    lng: 18.590,
    pricePerHour: 70,
    rating: 4.5,
    reviewCount: 63,
    businessId: "biz-4",
    businessName: "Olivia Tennis Club",
    amenities: ["szatnia", "prysznice", "parking", "kawiarnia"],
    operatingHours: [
      { day: "Poniedziałek", open: "7:00", close: "21:00" },
      { day: "Wtorek", open: "7:00", close: "21:00" },
      { day: "Środa", open: "7:00", close: "21:00" },
      { day: "Czwartek", open: "7:00", close: "21:00" },
      { day: "Piątek", open: "7:00", close: "20:00" },
      { day: "Sobota", open: "8:00", close: "19:00" },
      { day: "Niedziela", open: "8:00", close: "17:00" },
    ],
  },
  {
    id: "court-6",
    name: "Futsal Arena Poznań",
    sport: "futsal",
    surface: "synthetic",
    indoor: true,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop",
    address: "ul. Bułgarska 17, Poznań",
    location: "Arena Sportowa Poznań",
    lat: 52.395,
    lng: 16.880,
    pricePerHour: 200,
    rating: 4.8,
    reviewCount: 112,
    businessId: "biz-5",
    businessName: "Arena Sportowa Poznań",
    amenities: ["szatnia", "prysznice", "parking", "trybuna"],
    operatingHours: [
      { day: "Poniedziałek", open: "8:00", close: "23:00" },
      { day: "Wtorek", open: "8:00", close: "23:00" },
      { day: "Środa", open: "8:00", close: "23:00" },
      { day: "Czwartek", open: "8:00", close: "23:00" },
      { day: "Piątek", open: "8:00", close: "23:00" },
      { day: "Sobota", open: "9:00", close: "22:00" },
      { day: "Niedziela", open: "9:00", close: "20:00" },
    ],
    isPromoted: true,
  },
  {
    id: "court-7",
    name: "Padel Club Kraków",
    sport: "padel",
    surface: "synthetic",
    indoor: true,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
    address: "ul. Zakopiańska 62, Kraków",
    location: "Padel Zone Kraków",
    lat: 50.025,
    lng: 19.935,
    pricePerHour: 100,
    rating: 4.7,
    reviewCount: 68,
    businessId: "biz-2",
    businessName: "Padel Zone Kraków",
    amenities: ["szatnia", "prysznice", "wypożyczalnia rakiet"],
    operatingHours: [
      { day: "Poniedziałek", open: "7:00", close: "22:00" },
      { day: "Wtorek", open: "7:00", close: "22:00" },
      { day: "Środa", open: "7:00", close: "22:00" },
      { day: "Czwartek", open: "7:00", close: "22:00" },
      { day: "Piątek", open: "7:00", close: "22:00" },
      { day: "Sobota", open: "8:00", close: "20:00" },
      { day: "Niedziela", open: "9:00", close: "19:00" },
    ],
  },
  {
    id: "court-8",
    name: "Hala Siatkówki Katowice",
    sport: "volleyball",
    surface: "parquet",
    indoor: true,
    image: "https://images.unsplash.com/photo-1592656094267-764a45160876?w=400&h=300&fit=crop",
    address: "ul. Korfantego 35, Katowice",
    location: "Spodek Arena Katowice",
    lat: 50.265,
    lng: 19.025,
    pricePerHour: 150,
    rating: 4.6,
    reviewCount: 47,
    businessId: "biz-6",
    businessName: "Spodek Arena Katowice",
    amenities: ["szatnia", "prysznice", "parking", "trybuna"],
    operatingHours: [
      { day: "Poniedziałek", open: "8:00", close: "22:00" },
      { day: "Wtorek", open: "8:00", close: "22:00" },
      { day: "Środa", open: "8:00", close: "22:00" },
      { day: "Czwartek", open: "8:00", close: "22:00" },
      { day: "Piątek", open: "8:00", close: "22:00" },
      { day: "Sobota", open: "9:00", close: "20:00" },
      { day: "Niedziela", open: "9:00", close: "18:00" },
    ],
  },
  {
    id: "court-9",
    name: "Kort Tenisowy Łódź",
    sport: "tennis",
    surface: "grass",
    indoor: false,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    address: "ul. Piotrkowska 217, Łódź",
    location: "Park Tenisowy Łódź",
    lat: 51.750,
    lng: 19.460,
    pricePerHour: 65,
    rating: 4.4,
    reviewCount: 38,
    businessId: "biz-7",
    businessName: "Park Tenisowy Łódź",
    amenities: ["szatnia", "parking", "wypożyczalnia rakiet"],
    operatingHours: [
      { day: "Poniedziałek", open: "8:00", close: "20:00" },
      { day: "Wtorek", open: "8:00", close: "20:00" },
      { day: "Środa", open: "8:00", close: "20:00" },
      { day: "Czwartek", open: "8:00", close: "20:00" },
      { day: "Piątek", open: "8:00", close: "19:00" },
      { day: "Sobota", open: "9:00", close: "18:00" },
      { day: "Niedziela", open: "9:00", close: "16:00" },
    ],
  },
  {
    id: "court-10",
    name: "Boisko Koszykówki Warszawa",
    sport: "basketball",
    surface: "rubber",
    indoor: true,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    address: "ul. Inflancka 4, Warszawa",
    location: "Hala Sportowa Wola",
    lat: 52.240,
    lng: 20.985,
    pricePerHour: 180,
    rating: 4.7,
    reviewCount: 81,
    businessId: "biz-8",
    businessName: "Hala Sportowa Wola",
    amenities: ["szatnia", "prysznice", "parking", "trybuna", "tablica wyników"],
    operatingHours: [
      { day: "Poniedziałek", open: "7:00", close: "22:00" },
      { day: "Wtorek", open: "7:00", close: "22:00" },
      { day: "Środa", open: "7:00", close: "22:00" },
      { day: "Czwartek", open: "7:00", close: "22:00" },
      { day: "Piątek", open: "7:00", close: "22:00" },
      { day: "Sobota", open: "8:00", close: "20:00" },
      { day: "Niedziela", open: "8:00", close: "18:00" },
    ],
    isPromoted: true,
  },
];

export const PROMOTED_COURTS = MOCK_COURTS.filter((c) => c.isPromoted);

/** Generate random availability slots for a court over a 7-day week */
export function generateWeekSlots(
  courtId: string,
  weekStart: string // ISO date of Monday
): TimeSlotAvailability[] {
  const court = MOCK_COURTS.find((c) => c.id === courtId);
  if (!court) return [];

  const slots: TimeSlotAvailability[] = [];
  const startDate = new Date(weekStart);
  const total = court.courtCount ?? 1;

  // Seeded-ish random based on courtId + date for consistent results
  const seed =
    courtId.split("").reduce((a, c) => a + c.charCodeAt(0), 0) +
    startDate.getTime();
  let rng = seed;
  const random = () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return (rng % 100) / 100;
  };

  for (let d = 0; d < 7; d++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];

    for (let hour = 7; hour <= 21; hour++) {
      const isWeekend = d >= 5;
      const isPeak = hour >= 17 && hour <= 20;
      const price = isWeekend
        ? Math.round(court.pricePerHour * 1.2)
        : isPeak
          ? Math.round(court.pricePerHour * 1.1)
          : court.pricePerHour;

      // Simulate bookings: random number of courts booked
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

export const MOCK_RESERVATIONS: CourtReservation[] = [
  {
    id: "res-1",
    courtId: "court-1",
    courtName: "Kort Tenisowy Centrum",
    date: "2026-02-24",
    startHour: 10,
    durationHours: 2,
    totalPrice: 160,
    status: "confirmed",
    userName: "Jan Kowalski",
    createdAt: "2026-02-20T14:30:00Z",
  },
  {
    id: "res-2",
    courtId: "court-2",
    courtName: "Padel Arena Mokotów",
    date: "2026-02-25",
    startHour: 18,
    durationHours: 1,
    totalPrice: 132,
    status: "confirmed",
    userName: "Anna Nowak",
    createdAt: "2026-02-21T09:15:00Z",
  },
  {
    id: "res-3",
    courtId: "court-3",
    courtName: "Hala Badmintona Kraków",
    date: "2026-02-26",
    startHour: 16,
    durationHours: 2,
    totalPrice: 100,
    status: "pending",
    userName: "Piotr Wiśniewski",
    createdAt: "2026-02-22T11:00:00Z",
  },
  {
    id: "res-4",
    courtId: "court-1",
    courtName: "Kort Tenisowy Centrum",
    date: "2026-03-08",
    startHour: 10,
    durationHours: 2,
    totalPrice: 160,
    status: "confirmed",
    userName: "Katarzyna Nowak",
    createdAt: "2026-02-25T10:00:00Z",
  },
  {
    id: "res-5",
    courtId: "court-2",
    courtName: "Padel Arena Mokotów",
    date: "2026-03-05",
    startHour: 18,
    durationHours: 1,
    totalPrice: 132,
    status: "pending",
    userName: "Katarzyna Nowak",
    createdAt: "2026-02-26T14:30:00Z",
  },
  {
    id: "res-6",
    courtId: "court-3",
    courtName: "Hala Badmintona Kraków",
    date: "2026-02-15",
    startHour: 12,
    durationHours: 1,
    totalPrice: 50,
    status: "confirmed",
    userName: "Katarzyna Nowak",
    createdAt: "2026-02-10T09:00:00Z",
  },
];

// ── Business courts mock data ──

export const MOCK_BOOKER_NAMES = [
  "Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Katarzyna Zielińska",
  "Tomasz Lewandowski", "Magdalena Dąbrowska", "Robert Mazur", "Agnieszka Krawczyk",
  "Michał Szymański", "Ewa Wójcik", "Łukasz Jabłoński", "Marta Olszewska",
];

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

export const MOCK_BUSINESS_COURTS: Court[] = [
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
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
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

const monday = getMonday(new Date());

export const MOCK_BUSINESS_RESERVATIONS: CourtReservation[] = [
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
  { id: "cr-21", courtId: "bc-3", courtName: "Hala Badmintona", date: toISO(monday), startHour: 9, durationHours: 1, totalPrice: 50, status: "confirmed", userName: "Rafał Piotrowski", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-22", courtId: "bc-3", courtName: "Hala Badmintona", date: toISO(addDays(monday, 1)), startHour: 16, durationHours: 2, totalPrice: 100, status: "confirmed", userName: "Aleksandra Wróblewska", createdAt: toISO(addDays(monday, -3)) },
  { id: "cr-23", courtId: "bc-3", courtName: "Hala Badmintona", date: toISO(addDays(monday, 2)), startHour: 11, durationHours: 1, totalPrice: 50, status: "pending", userName: "Grzegorz Kwiatkowski", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-24", courtId: "bc-3", courtName: "Hala Badmintona", date: toISO(addDays(monday, 4)), startHour: 18, durationHours: 1, totalPrice: 50, status: "confirmed", userName: "Dorota Malinowska", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-25", courtId: "bc-4", courtName: "Squash Court Premium", date: toISO(monday), startHour: 8, durationHours: 1, totalPrice: 60, status: "confirmed", userName: "Paweł Zając", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-26", courtId: "bc-4", courtName: "Squash Court Premium", date: toISO(addDays(monday, 1)), startHour: 12, durationHours: 1, totalPrice: 60, status: "confirmed", userName: "Monika Król", createdAt: toISO(addDays(monday, -2)) },
  { id: "cr-27", courtId: "bc-4", courtName: "Squash Court Premium", date: toISO(addDays(monday, 3)), startHour: 15, durationHours: 2, totalPrice: 120, status: "pending", userName: "Sebastian Sikora", createdAt: toISO(addDays(monday, -1)) },
  { id: "cr-28", courtId: "bc-4", courtName: "Squash Court Premium", date: toISO(addDays(monday, 5)), startHour: 10, durationHours: 1, totalPrice: 60, status: "cancelled", userName: "Weronika Baran", createdAt: toISO(addDays(monday, -3)) },
];

export const MOCK_RECURRING_BLOCKS: RecurringBlock[] = [];
