import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "Instructor Profile | ClassCat",
  description: "Manage your instructor profile",
};

export default function Page() {
  return <PageContent />;
}
