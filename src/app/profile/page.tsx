import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "Dashboard | ClassCat",
  description: "Manage your ClassCat profile and bookings",
};

export default function Page() {
  return <PageContent />;
}
