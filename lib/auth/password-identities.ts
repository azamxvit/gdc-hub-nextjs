import type { UserIdentity } from "@supabase/supabase-js";

/** Есть ли у аккаунта провайдер email+password (не только OAuth). */
export function hasEmailPasswordIdentity(identities: UserIdentity[] | undefined): boolean {
  return identities?.some((i) => i.provider === "email") ?? false;
}

export function hasGoogleIdentity(identities: UserIdentity[] | undefined): boolean {
  return identities?.some((i) => i.provider === "google") ?? false;
}
