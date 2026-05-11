/** Без верификации подписи — только для буквы в шапке (как в dev-клиентах). */
export function readJwtSubjectInitial(token: string): string {
  try {
    const segment = token.split(".")[1];
    if (!segment) return "?";
    const json = JSON.parse(atob(segment.replace(/-/g, "+").replace(/_/g, "/")));
    const sub = json.sub ?? json.email;
    if (typeof sub === "string" && sub.length > 0) {
      return sub[0]!.toUpperCase();
    }
  } catch {
    /* ignore */
  }
  return "?";
}
