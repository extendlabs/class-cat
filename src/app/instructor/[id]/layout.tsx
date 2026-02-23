import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructor Profile | ClassCat",
  description: "View instructor profile, classes, achievements and reviews on ClassCat.",
};

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
