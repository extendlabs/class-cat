const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("classcat-auth");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed.token ?? null;
  } catch {
    return null;
  }
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...init?.headers,
    },
  });
}

/** Unwrap backend { success, data } envelope */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unwrap(json: any): any {
  return json?.data ?? json;
}
