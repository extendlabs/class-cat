import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  BRAND,
  loadPlusJakartaSans,
  loadLogo,
} from "@/lib/og-utils";
import { getBusinessById } from "@/api/business";

export const alt = "ClassCat Business";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function BusinessOG({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const headersList = await headers();
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const host = headersList.get("host") ?? "classcat.pl";
  const baseUrl = `${proto}://${host}`;

  const [font, logoData, business] = await Promise.all([
    loadPlusJakartaSans(),
    loadLogo(baseUrl),
    getBusinessById(id),
  ]);

  const logoSrc = `data:image/png;base64,${Buffer.from(logoData).toString("base64")}`;

  // Fallback if business not found
  if (!business) {
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
          <div style={{ display: "flex" }}>
            <img src={logoSrc} width={64} height={64} alt="" />
          </div>
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
              Business | ClassCat
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

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${business.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.55)",
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
            {/* Business name */}
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 700,
                color: BRAND.white,
                lineHeight: 1.1,
                maxWidth: "90%",
              }}
            >
              {business.name}
            </div>

            {/* Tagline */}
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                marginTop: 20,
                maxWidth: "80%",
              }}
            >
              {business.tagline}
            </div>
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
