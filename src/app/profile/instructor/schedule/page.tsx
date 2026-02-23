import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "Schedule | ClassCat",
  description: "Manage your weekly teaching schedule",
};

export default function Page() {
  return <PageContent />;
}
