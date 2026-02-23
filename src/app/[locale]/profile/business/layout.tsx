import type { Metadata } from "next";
import BusinessLayoutClient from "./_layout-client";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BusinessLayoutClient>{children}</BusinessLayoutClient>;
}
