"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

import type { Session } from "@supabase/supabase-js";

const SEP = "\u001e";

export type AuthBrowserSnapshot = {
  status: "signedOut" | "signedIn";
  email: string | null;
  avatarLetter: string;
};

const serverSnapshot: AuthBrowserSnapshot = {
  status: "signedOut",
  email: null,
  avatarLetter: "?",
};

let snapshot: AuthBrowserSnapshot = { ...serverSnapshot };
const listeners = new Set<() => void>();
let listenerAttached = false;

function emit() {
  listeners.forEach((cb) => cb());
}

function computeLetter(email: string | null, fullName: string | null): string {
  const name = fullName?.trim();
  if (name && name.length > 0) return name[0]!.toUpperCase();
  const em = email?.trim();
  if (em && em.length > 0) return em[0]!.toUpperCase();
  return "?";
}

function applySession(session: Session | null) {
  const u = session?.user;
  if (!u) {
    snapshot = { status: "signedOut", email: null, avatarLetter: "?" };
  } else {
    const email = u.email ?? null;
    const fullName = (u.user_metadata?.full_name as string | undefined) ?? null;
    snapshot = {
      status: "signedIn",
      email,
      avatarLetter: computeLetter(email, fullName),
    };
  }
  emit();
}

function attachOnce() {
  if (listenerAttached) return;
  listenerAttached = true;
  try {
    const supabase = createSupabaseBrowserClient();
    void supabase.auth.getSession().then(({ data }) => {
      applySession(data.session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });
  } catch {
    snapshot = { status: "signedOut", email: null, avatarLetter: "?" };
    emit();
  }
}

/** Строка для useSyncExternalStore (стабильное сравнение по значению). */
export function getAuthBrowserSnapshotString(): string {
  return `${snapshot.status}${SEP}${snapshot.email ?? ""}${SEP}${snapshot.avatarLetter}`;
}

export function parseAuthBrowserSnapshotString(raw: string): AuthBrowserSnapshot {
  const [status, email = "", letter = "?"] = raw.split(SEP);
  if (status === "signedIn" || status === "signedOut") {
    return {
      status,
      email: email || null,
      avatarLetter: letter || "?",
    };
  }
  return { ...serverSnapshot };
}

export function subscribeAuthBrowserState(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  attachOnce();
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getAuthBrowserServerSnapshotString(): string {
  return `${serverSnapshot.status}${SEP}${serverSnapshot.email ?? ""}${SEP}${serverSnapshot.avatarLetter}`;
}
