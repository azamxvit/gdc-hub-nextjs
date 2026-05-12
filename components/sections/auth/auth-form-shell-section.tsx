import { getTranslations } from "next-intl/server";

import { LocaleSwitcher } from "@/components/widgets/locale/locale-switcher";
import { ThemeSwitcher } from "@/components/widgets/theme/theme-switcher";

export async function AuthFormShellSection({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("common.footer");

  return (
    <section
      data-section="auth-form-shell"
      className="relative flex min-h-screen flex-col bg-background px-5 py-6 sm:px-8 lg:px-12"
    >
      <div className="flex shrink-0 items-center justify-end gap-3">
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
      <div className="flex flex-1 flex-col justify-center py-8">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
      <p className="shrink-0 pb-4 text-center text-[11px] text-muted-foreground">
        {t("copyright", { year: new Date().getFullYear() })}
      </p>
    </section>
  );
}
