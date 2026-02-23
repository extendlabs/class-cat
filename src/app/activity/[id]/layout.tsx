import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity Details | ClassCat",
  description: "View activity details, schedule, reviews and book your spot on ClassCat.",
};

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
