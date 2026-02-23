import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Dashboard | ClassCat",
  description: "Overview of your business performance on ClassCat.",
};

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
