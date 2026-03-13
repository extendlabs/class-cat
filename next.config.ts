import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default withNextIntl(nextConfig);
