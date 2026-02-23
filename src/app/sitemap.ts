import type { MetadataRoute } from "next";
import { ALL_ACTIVITIES } from "@/api/mock-data";
import { routing } from "@/i18n/routing";

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

function localeEntry(
  path: string,
  opts: { lastModified: string; changeFrequency: "daily" | "weekly"; priority: number }
): MetadataRoute.Sitemap[number] {
  const alternates: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    alternates[locale] = `${BASE_URL}${prefix}${path}`;
  }
  return {
    url: `${BASE_URL}${path}`,
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages: alternates },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages = [
    localeEntry("", { lastModified: now, changeFrequency: "daily", priority: 1.0 }),
    localeEntry("/about", { lastModified: now, changeFrequency: "weekly", priority: 0.5 }),
    localeEntry("/how-it-works", { lastModified: now, changeFrequency: "weekly", priority: 0.5 }),
    localeEntry("/contact", { lastModified: now, changeFrequency: "weekly", priority: 0.4 }),
    localeEntry("/help", { lastModified: now, changeFrequency: "weekly", priority: 0.5 }),
    localeEntry("/privacy", { lastModified: now, changeFrequency: "weekly", priority: 0.3 }),
    localeEntry("/terms", { lastModified: now, changeFrequency: "weekly", priority: 0.3 }),
    localeEntry("/for-business", { lastModified: now, changeFrequency: "weekly", priority: 0.7 }),
  ];

  const categoryPages = CATEGORIES.map((cat) =>
    localeEntry(`/${cat}`, { lastModified: now, changeFrequency: "weekly", priority: 0.8 })
  );

  const activityPages = ALL_ACTIVITIES.map((a) =>
    localeEntry(`/activity/${a.id}`, { lastModified: now, changeFrequency: "weekly", priority: 0.6 })
  );

  const businessPages = BUSINESS_IDS.map((id) =>
    localeEntry(`/business/${id}`, { lastModified: now, changeFrequency: "weekly", priority: 0.6 })
  );

  const instructorPages = INSTRUCTOR_IDS.map((id) =>
    localeEntry(`/instructor/${id}`, { lastModified: now, changeFrequency: "weekly", priority: 0.6 })
  );

  return [
    ...staticPages,
    ...categoryPages,
    ...activityPages,
    ...businessPages,
    ...instructorPages,
  ];
}
