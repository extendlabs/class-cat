import type { Activity } from "@/types/activity";

const delay = (ms: number = 300) => new Promise((r) => setTimeout(r, ms));

let freelanceActivities: Activity[] = [
  {
    id: "act-f1",
    title: "Indywidualne Lekcje Szachowe",
    description:
      "Lekcje jeden na jeden dopasowane do Twojego poziomu. Analiza partii, otwarcia i końcówki.",
    category: "education",
    provider: { name: "Aleksander Nowak" },
    image:
      "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=400&h=300&fit=crop",
    rating: 5.0,
    reviewCount: 34,
    price: "$$$",
    priceAmount: 80,
    distance: 0,
    location: "Online / Kraków",
    timeSlots: ["morning", "afternoon"],
    instructorId: "inst-6",
  },
  {
    id: "act-f2",
    title: "Szachy Online – Kurs Strategii",
    description:
      "Kurs online dla graczy średniozaawansowanych. Cotygodniowe webinary i zadania treningowe.",
    category: "education",
    provider: { name: "Aleksander Nowak" },
    image:
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 56,
    price: "$$",
    priceAmount: 30,
    distance: 0,
    location: "Online",
    timeSlots: ["afternoon", "evening"],
    instructorId: "inst-6",
  },
];

export async function fetchInstructorOwnActivities(
  instructorId: string
): Promise<Activity[]> {
  await delay(300);
  return freelanceActivities.filter((a) => a.instructorId === instructorId);
}

export async function createInstructorActivity(
  instructorId: string,
  data: Partial<Activity>
): Promise<Activity> {
  await delay(400);
  const activity: Activity = {
    id: `act-f-${Date.now()}`,
    title: data.title ?? "New Activity",
    description: data.description ?? "",
    category: data.category ?? "education",
    provider: { name: data.provider?.name ?? "Instructor" },
    image:
      data.image ??
      "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=400&h=300&fit=crop",
    rating: 0,
    reviewCount: 0,
    price: data.price ?? "$",
    priceAmount: data.priceAmount,
    distance: 0,
    location: data.location ?? "",
    timeSlots: data.timeSlots ?? ["morning"],
    instructorId,
  };
  freelanceActivities = [activity, ...freelanceActivities];
  return activity;
}

export async function updateInstructorActivity(
  activityId: string,
  data: Partial<Activity>
): Promise<Activity> {
  await delay(300);
  freelanceActivities = freelanceActivities.map((a) =>
    a.id === activityId ? { ...a, ...data } : a
  );
  return freelanceActivities.find((a) => a.id === activityId)!;
}

export async function deleteInstructorActivity(
  activityId: string
): Promise<void> {
  await delay(300);
  freelanceActivities = freelanceActivities.filter((a) => a.id !== activityId);
}
