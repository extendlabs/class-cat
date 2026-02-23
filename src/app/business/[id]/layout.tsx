import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Profile | ClassCat",
  description: "Explore classes, instructors and reviews for this business on ClassCat.",
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
