export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export const BRAND = {
  coral: "#FF8A65",
  coralDark: "#FF7043",
  white: "#FFFFFF",
  gray900: "#111827",
  gray600: "#4B5563",
} as const;

let fontCache: ArrayBuffer | null = null;

export async function loadPlusJakartaSans(): Promise<ArrayBuffer> {
  if (fontCache) return fontCache;
  const res = await fetch(
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=swap"
  );
  const css = await res.text();
  const urlMatch = css.match(/src:\s*url\(([^)]+)\)/);
  if (!urlMatch?.[1]) {
    throw new Error("Could not extract font URL from Google Fonts CSS");
  }
  const fontRes = await fetch(urlMatch[1]);
  fontCache = await fontRes.arrayBuffer();
  return fontCache;
}

export async function loadLogo(baseUrl: string): Promise<ArrayBuffer> {
  const res = await fetch(`${baseUrl}/logo-cat.png`);
  return res.arrayBuffer();
}
