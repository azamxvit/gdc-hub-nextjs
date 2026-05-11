/**
 * Разрешённые пути после OAuth / email-линков (только относительные, без open-redirect).
 */
export function safeAuthRedirectPath(raw: string | null, fallback: string): string {
  if (!raw || raw.length === 0) return fallback;
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return fallback;
  if (trimmed.includes("://") || trimmed.includes("\\")) return fallback;
  return trimmed;
}
