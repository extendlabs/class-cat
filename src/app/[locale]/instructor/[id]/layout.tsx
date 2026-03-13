import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor Profile",
  description: "View contractor profile, classes, achievements and reviews on ClassCat.",
};

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
