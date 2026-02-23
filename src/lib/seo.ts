import { routing } from "@/i18n/routing";

const BASE_URL = "https://classcat.pl";

/**
 * Build Next.js metadata `alternates` for a given path.
 * Returns canonical URL + hreflang links for all locales (including x-default).
 */
export function getAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    languages[locale] = `${BASE_URL}${prefix}${path}`;
  }
  languages["x-default"] = `${BASE_URL}${path}`;

  return {
    canonical: `${BASE_URL}${path}`,
    languages,
  };
}
