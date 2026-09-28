import "server-only";

/**
 * Minimal server-side client for Supabase's REST API (PostgREST).
 * Uses the secret/service-role key, so it must never be imported by client code.
 */

export type ApplicationRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  area_of_interest: string;
  message: string;
};

const TABLE = "career_applications";

export class SupabaseConfigError extends Error {}

function config() {
  // Accept the project URL with or without a trailing "/rest/v1".
  const url = process.env.SUPABASE_URL?.trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/, "");
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new SupabaseConfigError(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local.",
    );
  }
  return { url, key };
}

async function request(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  // Legacy service_role keys are JWTs and also go in Authorization;
  // new sb_secret_ keys are sent in the apikey header only.
  if (key.startsWith("eyJ")) headers.set("Authorization", `Bearer ${key}`);
  headers.set("Content-Type", "application/json");

  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${detail.slice(0, 300)}`);
  }
  return res;
}

export async function insertApplication(row: Omit<ApplicationRow, "id" | "created_at">) {
  await request(TABLE, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(row),
  });
}

export async function listApplications(): Promise<ApplicationRow[]> {
  const res = await request(`${TABLE}?select=*&order=created_at.desc&limit=1000`);
  return res.json();
}
