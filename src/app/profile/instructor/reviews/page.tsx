import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "Reviews | ClassCat",
  description: "View student reviews for your classes",
};

export default function Page() {
  return <PageContent />;
}
