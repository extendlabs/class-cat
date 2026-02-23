import { Suspense } from "react";
import type { Metadata } from "next";
import { BrowsePage } from "@/components/features/browse-page";

export const metadata: Metadata = {
  title: "ClassCat — Znajdź Zajęcia Blisko Siebie",
  description:
    "Odkryj lokalne zajęcia i aktywności w Twojej okolicy. Przeglądaj fitness, sztukę, muzykę, gotowanie, jogę, szachy i więcej. Kraków, Warszawa, Wrocław, Gdańsk, Poznań.",
  keywords: [
    "zajęcia",
    "kursy",
    "aktywności",
    "Kraków",
    "Warszawa",
    "Wrocław",
    "fitness",
    "joga",
    "szachy",
    "gotowanie",
    "taniec",
    "sztuka",
  ],
  openGraph: {
    title: "ClassCat — Znajdź Zajęcia Blisko Siebie",
    description:
      "Odkryj lokalne zajęcia i aktywności w Twojej okolicy. Przeglądaj fitness, sztukę, muzykę, gotowanie i więcej.",
    images: ["/logo-cat.png"],
  },
};

export default function Home() {
  return (
    <Suspense>
      <BrowsePage category={null} />
    </Suspense>
  );
}
