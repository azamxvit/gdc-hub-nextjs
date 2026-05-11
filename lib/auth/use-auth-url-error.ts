"use client";

import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ERROR_PARAM = "error";

/** Показать ошибку из query (?error=) и убрать её из адресной строки (OAuth / magic link). */
export function useAuthUrlError(setMessage: (msg: string | null) => void) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const encoded = searchParams.get(ERROR_PARAM);
    if (!encoded) return;
    try {
      setMessage(decodeURIComponent(encoded.replace(/\+/g, " ")));
    } catch {
      setMessage("Не удалось войти. Попробуйте ещё раз.");
    }
    const next = new URLSearchParams(searchParams.toString());
    next.delete(ERROR_PARAM);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router, searchParams, setMessage]);
}
