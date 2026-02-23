import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "Business Onboarding | ClassCat",
  description: "Set up your business on ClassCat",
};

export default function Page() {
  return <PageContent />;
}
