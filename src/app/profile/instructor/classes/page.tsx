import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "My Classes | ClassCat",
  description: "View and manage your classes",
};

export default function Page() {
  return <PageContent />;
}
