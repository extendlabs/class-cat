import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "Manage Activities | ClassCat",
  description: "Create and manage your business activities",
};

export default function Page() {
  return <PageContent />;
}
