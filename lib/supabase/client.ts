"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/config/env";

/**
 * Браузерный клиент Supabase (singleton внутри @supabase/ssr).
 * Использовать в Client Components: auth, realtime, подписки.
 */
export function createSupabaseBrowserClient() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) {
    throw new Error(
      "Задайте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (или NEXT_PUBLIC_SUPABASE_ANON_KEY) в .env.local",
    );
  }
  return createBrowserClient(url, key);
}
