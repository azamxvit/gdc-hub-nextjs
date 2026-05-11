import { type NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@supabase/ssr";

import { safeAuthRedirectPath } from "@/lib/auth/safe-auth-redirect";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/config/env";

function decodeOAuthParam(raw: string): string {
  try {
    return decodeURIComponent(raw.replace(/\+/g, " "));
  } catch {
    return raw;
  }
}

/**
 * OAuth (Google) и magic-link: обмен `code` на сессию в cookie.
 *
 * Supabase Dashboard → Auth → URL: Redirect URLs должны включать
 * `http://localhost:3000/auth/callback` и продакшен-URL.
 *
 * При ошибке провайдера в query часто приходят `error` / `error_description` без `code`.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const oauthErrorRaw =
    url.searchParams.get("error_description")?.trim() || url.searchParams.get("error")?.trim();

  const nextPath = safeAuthRedirectPath(url.searchParams.get("next"), "/");
  const errorReturnPath = safeAuthRedirectPath(url.searchParams.get("error_to"), "/auth");

  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabasePublishableKey();

  const redirectWithError = (message: string) => {
    const target = new URL(errorReturnPath, url.origin);
    target.searchParams.set("error", encodeURIComponent(message));
    return NextResponse.redirect(target);
  };

  if (!supabaseUrl || !supabaseKey) {
    return redirectWithError("Не заданы NEXT_PUBLIC_SUPABASE_URL или ключ в .env.local.");
  }

  if (!code) {
    if (oauthErrorRaw) {
      return redirectWithError(decodeOAuthParam(oauthErrorRaw));
    }
    return redirectWithError("Вход отменён или ссылка недействительна. Попробуйте снова.");
  }

  const redirectResponse = NextResponse.redirect(new URL(nextPath, url.origin));

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          redirectResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return redirectWithError(mapAuthErrorMessage(error.message));
  }

  return redirectResponse;
}

function mapAuthErrorMessage(raw: string): string {
  if (/invalid request/i.test(raw)) {
    return "Ошибка OAuth: проверьте Redirect URL в Supabase и Google Cloud Console.";
  }
  if (/exchange/i.test(raw)) {
    return "Сессия не создана. Откройте вход снова или очистите куки для этого сайта.";
  }
  return raw || "Не удалось завершить вход.";
}
