import { type NextRequest, NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { applySupabaseSessionToResponse } from "@/lib/supabase/update-session";

const handleI18n = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/auth/callback" || pathname.startsWith("/auth/callback/")) {
    return applySupabaseSessionToResponse(request, NextResponse.next({ request }));
  }

  const response = handleI18n(request);
  return applySupabaseSessionToResponse(request, response);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
