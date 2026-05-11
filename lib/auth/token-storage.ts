const TOKEN_KEY = "token";

function emitTokenChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("gdc-token-change"));
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  emitTokenChange();
}

export function clearStoredToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  emitTokenChange();
}

export function subscribeTokenChanges(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("gdc-token-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("gdc-token-change", callback);
  };
}

export function getTokenSnapshot(): string {
  return getStoredToken() ?? "";
}
