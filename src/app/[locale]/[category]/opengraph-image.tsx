import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  BRAND,
  loadPlusJakartaSans,
  loadLogo,
} from "@/lib/og-utils";
import { getCategoryLabel } from "@/lib/categories";

export const alt = "ClassCat Category";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function CategoryOG({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const headersList = await headers();
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const host = headersList.get("host") ?? "classcat.pl";
  const baseUrl = `${proto}://${host}`;

  const [font, logoData] = await Promise.all([
    loadPlusJakartaSans(),
    loadLogo(baseUrl),
  ]);

  const logoSrc = `data:image/png;base64,${Buffer.from(logoData).toString("base64")}`;

  const label =
    getCategoryLabel(category) ??
    category.charAt(0).toUpperCase() + category.slice(1);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${BRAND.coral} 0%, ${BRAND.coralDark} 100%)`,
          padding: "60px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex" }}>
          <img src={logoSrc} width={64} height={64} alt="" />
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: BRAND.white,
              lineHeight: 1.1,
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              marginTop: 24,
            }}
          >
            ClassCat
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "PlusJakartaSans",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
