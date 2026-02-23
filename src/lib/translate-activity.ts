/**
 * Helpers that map raw mock-data strings (ageRange, badge) to i18n keys.
 * The mock data keeps English keys; these functions translate at render time.
 */

/**
 * Translate an ageRange string like "Ages 6-12", "Adults (18+)", "All Ages"
 * using the `ageRange` namespace from next-intl.
 */
export function translateAgeRange(
  raw: string,
  t: (key: string, values?: Record<string, string | number>) => string
): string {
  if (raw === "All Ages") return t("allAges");
  if (raw === "Adults") return t("adults");

  // "Adults (18+)"
  const adultsPlus = raw.match(/^Adults\s*\((\d+)\+\)$/);
  if (adultsPlus) return t("adultsPlus", { age: Number(adultsPlus[1]) });

  // "Ages 6-12"
  const range = raw.match(/^Ages\s+(\d+)[–-](\d+)$/);
  if (range) return t("ages", { min: Number(range[1]), max: Number(range[2]) });

  // "Ages 16+"
  const plus = raw.match(/^Ages\s+(\d+)\+$/);
  if (plus) return t("agesPlus", { age: Number(plus[1]) });

  // Fallback: return raw string
  return raw;
}