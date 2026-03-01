import type { Metadata } from "next";
import RequestsClient from "./_client";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Enrollment Requests",
};

export default function RequestsPage() {
  return <RequestsClient />;
}
