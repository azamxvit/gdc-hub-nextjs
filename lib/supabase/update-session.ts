import { type NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@supabase/ssr";

import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/config/env";

/**
 * Обновление сессии Supabase Auth по cookie (вызывать из middleware).
 * Без настроенных переменных — no-op, чтобы `pnpm dev` не падал до подключения проекта.
 */
export async function updateSupabaseSession(request: NextRequest) {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Не вставлять логику между createServerClient и getUser — см. доку Supabase SSR.
  await supabase.auth.getUser();

  return supabaseResponse;
}
