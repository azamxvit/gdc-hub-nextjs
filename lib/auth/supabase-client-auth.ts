"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

import { mapAuthError } from "./map-auth-error";
import { safeAuthRedirectPath } from "./safe-auth-redirect";

function getClient() {
  return createSupabaseBrowserClient();
}

export async function signInWithEmailPassword(email: string, password: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(mapAuthError(error));
}

/** Возвращает true, если нужно подтвердить email (сессии ещё нет). */
export async function signUpWithEmailPassword(
  email: string,
  password: string,
  fullName: string,
): Promise<{ needsEmailConfirmation: boolean }> {
  const supabase = getClient();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });
  if (error) throw new Error(mapAuthError(error));
  return { needsEmailConfirmation: !data.session };
}

export async function signOutClient(): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(mapAuthError(error));
}

/** Установить или сменить пароль у текущей сессии (в т.ч. после входа только через Google). */
export async function updatePasswordForCurrentUser(password: string): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(mapAuthError(error));
}

export type SignInWithGoogleOptions = {
  /** Куда редиректнуть после успешного OAuth (только внутренний путь). */
  successNext?: string;
  /** Страница с формой — туда вернём `?error=` при отмене или ошибке. */
  errorReturnPath?: string;
};

/** Редирект на Google; после успеха Supabase вернёт на `/auth/callback`. */
export async function signInWithGoogle(options: SignInWithGoogleOptions = {}): Promise<void> {
  const supabase = getClient();
  const origin = window.location.origin;
  const successNext = safeAuthRedirectPath(options.successNext ?? "/", "/");
  const errorTo = safeAuthRedirectPath(options.errorReturnPath ?? "/auth", "/auth");

  const callback = new URL(`${origin}/auth/callback`);
  callback.searchParams.set("next", successNext);
  callback.searchParams.set("error_to", errorTo);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callback.toString(),
      queryParams: { prompt: "select_account" },
      scopes: "email profile",
    },
  });
  if (error) throw new Error(mapAuthError(error));
  if (data.url) {
    window.location.assign(data.url);
    return;
  }
  throw new Error("Не удалось начать вход через Google");
}
