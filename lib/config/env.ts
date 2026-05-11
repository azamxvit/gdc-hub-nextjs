export function getPublicApiBaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

/** Supabase project URL (dashboard → Settings → API, или Connect). */
export function getSupabaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

/**
 * Клиентский ключ: новый publishable (`sb_publishable_…`) или legacy `anon`.
 * Не используйте service_role / secret в префиксе NEXT_PUBLIC.
 */
export function getSupabasePublishableKey(): string | null {
  const publishable = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return publishable || anon || null;
}

/**
 * Серверный ключ с полными правами (только Route Handlers / Server Actions / FastAPI).
 * Legacy: SUPABASE_SERVICE_ROLE_KEY. Новые проекты: secret key из дашборда (без NEXT_PUBLIC).
 */
export function getSupabaseServiceRoleKey(): string | null {
  const secret = process.env.SUPABASE_SECRET_KEY?.trim();
  const legacy = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return secret || legacy || null;
}
