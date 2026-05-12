import { type NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@supabase/ssr";

import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/config/env";

export async function applySupabaseSessionToResponse(
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  if (!url || !key) {
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Не вставлять логику между createServerClient и getUser
  await supabase.auth.getUser();

  return response;
}
export async function updateSupabaseSession(request: NextRequest) {
  return applySupabaseSessionToResponse(request, NextResponse.next({ request }));
}
