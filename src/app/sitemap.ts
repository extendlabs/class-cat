import type { MetadataRoute } from "next";
import { ALL_ACTIVITIES } from "@/api/mock-data";

const BASE_URL = "https://classcat.pl";

const CATEGORIES = [
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
];

const BUSINESS_IDS = ["biz-1", "biz-2"];
const INSTRUCTOR_IDS = ["inst-1", "inst-6"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/${cat}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const activityPages: MetadataRoute.Sitemap = ALL_ACTIVITIES.map((a) => ({
    url: `${BASE_URL}/activity/${a.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const businessPages: MetadataRoute.Sitemap = BUSINESS_IDS.map((id) => ({
    url: `${BASE_URL}/business/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const instructorPages: MetadataRoute.Sitemap = INSTRUCTOR_IDS.map((id) => ({
    url: `${BASE_URL}/instructor/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...activityPages,
    ...businessPages,
    ...instructorPages,
  ];
}
