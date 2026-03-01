import type { Metadata } from "next";
import PageContent from "./_client";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Instructor Schedule",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PageContent instructorId={id} />;
}
