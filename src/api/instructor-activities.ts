import type { Activity } from "@/types/activity";
import { apiFetch, unwrap } from "@/lib/api-client";

interface BackendActivity {
  slug: string;
  name: string;
  description?: string;
  provider: { slug: string; name: string; isVerified: boolean; providerType: string };
  primaryImage?: { file: string };
  reviewScore?: number;
  reviewCount?: number;
  location?: { slug: string; name?: string };
  categories?: { slug: string; name: string }[];
  capacity?: number;
  scheduledTime?: string;
}

function mapBackendActivity(a: BackendActivity): Activity {
  return {
    id: a.slug,
    title: a.name,
    description: a.description ?? "",
    category: (a.categories?.[0]?.slug ?? "education") as Activity["category"],
    provider: { name: a.provider.name, slug: a.provider.slug },
    image: a.primaryImage?.file ?? "",
    rating: a.reviewScore ?? 0,
    reviewCount: a.reviewCount ?? 0,
    price: "free",
    distance: 0,
    location: a.location?.name ?? "",
    timeSlots: [],
    spotsLeft: a.capacity ?? undefined,
  };
}

export async function fetchInstructorOwnActivities(
  _instructorId: string
): Promise<Activity[]> {
  const res = await apiFetch("/activities/contractor/me/activities/");
  if (!res.ok) return [];
  const data: BackendActivity[] = unwrap(await res.json());
  const list = Array.isArray(data) ? data : (data as { results?: BackendActivity[] }).results ?? [];
  return list.map(mapBackendActivity);
}

export async function createInstructorActivity(
  _instructorId: string,
  data: Partial<Activity> & {
    name?: string;
    categories?: string[];
    scheduledTime?: string;
    durationMinutes?: number;
    capacity?: number;
    ageMin?: number;
    ageMax?: number;
    skillLevel?: string;
    materialsIncluded?: string;
    whatYouLearn?: string[];
    curriculum?: { week: number; title: string; description: string }[];
  }
): Promise<Activity> {
  const body: Record<string, unknown> = {
    name: data.name ?? data.title ?? "New Activity",
    description: data.description ?? "",
  };
  if (data.categories) body.categories = data.categories;
  if (data.capacity) body.capacity = data.capacity;
  if (data.scheduledTime) body.scheduled_time = data.scheduledTime;
  if (data.durationMinutes) body.duration_minutes = data.durationMinutes;
  if (data.ageMin != null) body.age_min = data.ageMin;
  if (data.ageMax != null) body.age_max = data.ageMax;
  if (data.skillLevel) body.skill_level = data.skillLevel;
  if (data.materialsIncluded) body.materials_included = data.materialsIncluded;
  if (data.whatYouLearn) body.what_you_learn = data.whatYouLearn;
  if (data.curriculum) body.curriculum = data.curriculum;

  const res = await apiFetch("/activities/contractor/me/activities/", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
  const created: BackendActivity = unwrap(await res.json());
  return mapBackendActivity(created);
}

export async function updateInstructorActivity(
  activityId: string,
  data: Partial<Activity> & {
    name?: string;
    categories?: string[];
    capacity?: number;
    skillLevel?: string;
    materialsIncluded?: string;
    whatYouLearn?: string[];
    curriculum?: { week: number; title: string; description: string }[];
  }
): Promise<Activity> {
  const body: Record<string, unknown> = {};
  if (data.name ?? data.title) body.name = data.name ?? data.title;
  if (data.description !== undefined) body.description = data.description;
  if (data.categories) body.categories = data.categories;
  if (data.capacity != null) body.capacity = data.capacity;
  if (data.skillLevel !== undefined) body.skill_level = data.skillLevel;
  if (data.materialsIncluded !== undefined) body.materials_included = data.materialsIncluded;
  if (data.whatYouLearn) body.what_you_learn = data.whatYouLearn;
  if (data.curriculum) body.curriculum = data.curriculum;

  const res = await apiFetch(`/activities/contractor/me/activities/${activityId}/`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
  const updated: BackendActivity = unwrap(await res.json());
  return mapBackendActivity(updated);
}

export async function uploadActivityImage(activitySlug: string, imageFile: File): Promise<void> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
  const token = typeof window !== "undefined"
    ? (() => { try { return JSON.parse(localStorage.getItem("classcat-auth") ?? "{}").token ?? null; } catch { return null; } })()
    : null;

  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetch(`${API_BASE}/activities/contractor/me/activities/${activitySlug}/image/`, {
    method: "POST",
    body: formData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
}

export async function deleteInstructorActivity(activityId: string): Promise<void> {
  const res = await apiFetch(`/activities/contractor/me/activities/${activityId}/`, {
    method: "DELETE",
  });
  if (!res.ok && res.status !== 204) {
    throw new Error("Failed to delete activity");
  }
}
