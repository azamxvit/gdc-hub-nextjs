"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
};

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common.locale");

  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {t("label")}
      </span>
      <select
        className="h-9 rounded-md border border-border/80 bg-background/80 px-2 text-xs font-medium text-foreground outline-none transition hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
        value={locale}
        onChange={(e) => {
          const next = e.target.value;
          if (routing.locales.includes(next as (typeof routing.locales)[number])) {
            router.replace(pathname, { locale: next });
          }
        }}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {t(loc as "en" | "kz" | "ru")}
          </option>
        ))}
      </select>
    </label>
  );
}
