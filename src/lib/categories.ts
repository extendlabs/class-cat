const VALID_CATEGORIES = [
  "football",
  "music",
  "art",
  "coding",
  "yoga",
  "chess",
  "cooking",
  "swimming",
  "drama",
  "tennis",
  "photo",
  "science",
  "dance",
  "fitness",
  "cycling",
  "gardening",
  "reading",
  "wellness",
] as const;

type BrowseCategory = (typeof VALID_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<BrowseCategory, string> = {
  football: "Piłka nożna",
  music: "Muzyka",
  art: "Sztuka",
  coding: "Programowanie",
  yoga: "Joga",
  chess: "Szachy",
  cooking: "Gotowanie",
  swimming: "Pływanie",
  drama: "Teatr",
  tennis: "Tenis",
  photo: "Fotografia",
  science: "Nauka",
  dance: "Taniec",
  fitness: "Fitness",
  cycling: "Kolarstwo",
  gardening: "Ogrodnictwo",
  reading: "Czytanie",
  wellness: "Wellness",
};

export function getCategoryLabel(slug: string): string | undefined {
  return CATEGORY_LABELS[slug as BrowseCategory];
}

export function isValidCategory(s: string): s is BrowseCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(s);
}
