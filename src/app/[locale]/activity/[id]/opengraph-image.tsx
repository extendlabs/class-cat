import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  BRAND,
  loadPlusJakartaSans,
  loadLogo,
} from "@/lib/og-utils";
import { getActivityById } from "@/api/activity-detail";

export const alt = "ClassCat Activity";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function ActivityOG({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const headersList = await headers();
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const host = headersList.get("host") ?? "classcat.pl";
  const baseUrl = `${proto}://${host}`;

  const [font, logoData, activity] = await Promise.all([
    loadPlusJakartaSans(),
    loadLogo(baseUrl),
    getActivityById(id),
  ]);

  const logoSrc = `data:image/png;base64,${Buffer.from(logoData).toString("base64")}`;

  // Fallback if activity not found
  if (!activity) {
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
            <img src={logoSrc} width={64} height={64} />
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
              Activity | ClassCat
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

  const categoryLabel =
    activity.category.charAt(0).toUpperCase() + activity.category.slice(1);

  const priceLabel = activity.priceAmount
    ? `${activity.currency ?? "zl"} ${activity.priceAmount}`
    : activity.price;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${activity.image})`,
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
            <img src={logoSrc} width={64} height={64} />
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
            {/* Category badge */}
            <div style={{ display: "flex", marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: BRAND.coral,
                  color: BRAND.white,
                  fontSize: 20,
                  fontWeight: 700,
                  padding: "8px 20px",
                  borderRadius: 9999,
                }}
              >
                {categoryLabel}
              </div>
            </div>

            {/* Title */}
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
              {activity.title}
            </div>

            {/* Price */}
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                marginTop: 20,
              }}
            >
              {priceLabel}
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
