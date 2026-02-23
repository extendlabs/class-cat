import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  title: "Log In | ClassCat",
  description: "Sign in to your ClassCat account",
};

export default function Page() {
  return <PageContent />;
}
