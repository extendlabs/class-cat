import type { Distance, TimeSlot } from "@/types/activity";

export const FILTER_DISTANCES: { value: Distance; label: string }[] = [
  { value: "1km", label: "1 km" },
  { value: "5km", label: "5 km" },
  { value: "10km", label: "10 km" },
  { value: "25km", label: "25 km" },
];

export const FILTER_TIMES: { value: TimeSlot; label: string }[] = [
  { value: "morning", label: "Morning (6:00–12:00)" },
  { value: "afternoon", label: "Afternoon (12:00–17:00)" },
  { value: "evening", label: "Evening (17:00–22:00)" },
  { value: "weekend", label: "Weekend" },
];

export const FILTER_AGE_RANGES: { value: string; label: string }[] = [
  { value: "0-6", label: "Kids (0-6)" },
  { value: "6-12", label: "Kids (6-12)" },
  { value: "12-18", label: "Teens (12-18)" },
  { value: "18+", label: "Adults (18+)" },
  { value: "60+", label: "Seniors (60+)" },
  { value: "all", label: "All Ages" },
];

export const FILTER_CITIES: { value: string; label: string }[] = [
  { value: "Warszawa", label: "Warszawa" },
  { value: "Kraków", label: "Kraków" },
  { value: "Wrocław", label: "Wrocław" },
  { value: "Gdańsk", label: "Gdańsk" },
  { value: "Poznań", label: "Poznań" },
  { value: "Katowice", label: "Katowice" },
  { value: "Łódź", label: "Łódź" },
  { value: "Szczecin", label: "Szczecin" },
  { value: "Lublin", label: "Lublin" },
];

export const FILTER_GROUP_TYPES: { value: string; label: string }[] = [
  { value: "group", label: "Group" },
  { value: "individual", label: "Individual" },
  { value: "both", label: "Both" },
];
