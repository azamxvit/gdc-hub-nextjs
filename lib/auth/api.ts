/**
 * Legacy: FastAPI `gdc_portal` (`/auth/login`, `/auth/register`).
 * Целевая модель — Supabase Auth + `lib/supabase/*`; этот модуль остаётся для параллельной работы с Python.
 */
import { getPublicApiBaseUrl } from "@/lib/config/env";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { email: string; password: string; full_name: string };

function parseErrorDetail(data: unknown): string {
  if (data && typeof data === "object" && "detail" in data) {
    const d = (data as { detail: unknown }).detail;
    if (typeof d === "string") return d;
    if (Array.isArray(d)) return d.map((x) => JSON.stringify(x)).join(", ");
  }
  return "Ошибка запроса";
}

export async function loginRequest(payload: LoginPayload): Promise<{ access_token: string }> {
  const base = getPublicApiBaseUrl();
  if (!base) {
    throw new Error(
      "Задайте NEXT_PUBLIC_API_BASE_URL в .env.local (как в legacy: http://localhost:8000)",
    );
  }
  const res = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(parseErrorDetail(data));
  return data as { access_token: string };
}

export async function registerRequest(payload: RegisterPayload): Promise<{ access_token: string }> {
  const base = getPublicApiBaseUrl();
  if (!base) {
    throw new Error(
      "Задайте NEXT_PUBLIC_API_BASE_URL в .env.local (как в legacy: http://localhost:8000)",
    );
  }
  const res = await fetch(`${base}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(parseErrorDetail(data));
  return data as { access_token: string };
}
