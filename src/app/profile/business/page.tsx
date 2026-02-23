import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "Business Profile | ClassCat",
  description: "Manage your business profile on ClassCat",
};

export default function Page() {
  return <PageContent />;
}
