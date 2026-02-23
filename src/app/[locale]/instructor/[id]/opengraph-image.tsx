import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import {
  OG_SIZE,
  OG_CONTENT_TYPE,
  BRAND,
  loadPlusJakartaSans,
  loadLogo,
} from "@/lib/og-utils";
import { getInstructorById } from "@/api/instructor";

export const alt = "ClassCat Instructor";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function InstructorOG({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const headersList = await headers();
  const proto = headersList.get("x-forwarded-proto") ?? "https";
  const host = headersList.get("host") ?? "classcat.pl";
  const baseUrl = `${proto}://${host}`;

  const [font, logoData, instructor] = await Promise.all([
    loadPlusJakartaSans(),
    loadLogo(baseUrl),
    getInstructorById(id),
  ]);

  const logoSrc = `data:image/png;base64,${Buffer.from(logoData).toString("base64")}`;

  // Fallback if instructor not found
  if (!instructor) {
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
              Instructor | ClassCat
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

  // Build star rating display
  const fullStars = Math.floor(instructor.rating);
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < fullStars ? "\u2605" : "\u2606"
  ).join("");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${instructor.coverImage})`,
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
            {/* Instructor name */}
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
              {instructor.name}
            </div>

            {/* Title */}
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                marginTop: 16,
              }}
            >
              {instructor.title}
            </div>

            {/* Rating stars */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 32,
                  color: "#FBBF24",
                  letterSpacing: 4,
                }}
              >
                {stars}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  marginLeft: 16,
                }}
              >
                {instructor.rating.toFixed(1)}
              </div>
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
