import { apiFetch, unwrap } from "@/lib/api-client";

export interface BackendCategory {
  slug: string;
  name: string;
  icon: string | null;
  numberOfActivities: number | null;
}

export async function fetchCategories(): Promise<BackendCategory[]> {
  const res = await apiFetch("/activities/category/");
  if (!res.ok) return [];
  const data = unwrap(await res.json());
  return Array.isArray(data) ? data : data?.results ?? [];
}
