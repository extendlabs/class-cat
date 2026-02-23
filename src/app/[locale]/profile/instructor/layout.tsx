import type { Metadata } from "next";
import InstructorLayoutClient from "./_layout-client";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InstructorLayoutClient>{children}</InstructorLayoutClient>;
}
