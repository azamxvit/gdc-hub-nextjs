import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

/**
 * Tron-подобная 2D-сетка (перспектива + неон), без внешних ассетов.
 * Свой арт: слой с `background-image: url(/auth/hero-game.webp)` поверх базы.
 */
function AuthHeroGameBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(175deg,oklch(0.055_0.06_285)_0%,oklch(0.045_0.07_305)_48%,oklch(0.07_0.11_12)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_58%_at_50%_110%,color-mix(in_oklch,var(--primary)_48%,transparent)_0%,transparent_62%)] opacity-95 dark:opacity-100" />

      {/* Перспективная неоновая сетка «пол» */}
      <div
        className="absolute inset-x-[-38%] bottom-[-12%] top-[14%]"
        style={{ perspective: "560px", perspectiveOrigin: "50% 0%" }}
      >
        <div
          className="absolute inset-0 opacity-[0.92]"
          style={{
            transform: "rotateX(58deg)",
            transformOrigin: "center top",
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent 0px, transparent 22px, rgba(34, 211, 238, 0.34) 22px, rgba(34, 211, 238, 0.34) 23px),
              repeating-linear-gradient(0deg, transparent 0px, transparent 28px, rgba(244, 114, 182, 0.2) 28px, rgba(244, 114, 182, 0.2) 29px)
            `,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)",
          }}
        />
      </div>

      <div className="absolute inset-x-[-25%] bottom-[28%] h-[40%] bg-[linear-gradient(to_top,color-mix(in_oklch,var(--primary)_42%,transparent)_0%,transparent_90%)]" />
      <div className="absolute inset-x-[-12%] bottom-[27%] h-[2px] bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--accent)_85%,transparent),transparent)] opacity-95 shadow-[0_0_12px_color-mix(in_oklch,var(--accent)_70%,transparent)]" />
      <div className="absolute left-[8%] top-[14%] h-16 w-16 rotate-12 rounded-xl bg-primary/28 blur-md dark:bg-primary/52" />
      <div className="absolute right-[10%] top-[26%] h-12 w-12 -rotate-6 rounded-lg bg-chart-3/35 blur-md dark:bg-chart-3/52" />
      <div className="absolute bottom-[32%] left-1/2 h-2 w-32 -translate-x-1/2 rounded-full bg-primary/22 blur-sm dark:bg-primary/38" />
      <div className="absolute left-[22%] top-[10%] h-[36%] w-px bg-gradient-to-b from-cyan-400/55 via-primary/35 to-transparent opacity-80 blur-[0.5px]" />
      <div className="absolute right-[26%] top-[14%] h-[32%] w-px bg-gradient-to-b from-fuchsia-400/50 via-transparent to-transparent opacity-75 blur-[0.5px]" />

      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay dark:opacity-[0.17]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.05) 3px,
            rgba(255,255,255,0.05) 5px
          )`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_22%,oklch(0.035_0.035_285)_90%)] opacity-78 dark:opacity-88" />
    </div>
  );
}

type AuthSplitHeroSectionProps = {
  variant?: "login" | "register";
};

export async function AuthSplitHeroSection({ variant = "login" }: AuthSplitHeroSectionProps) {
  const t = await getTranslations("auth.hero");
  const tBrand = await getTranslations("common.brand");
  const tagline = variant === "login" ? t("loginTagline") : t("registerTagline");

  return (
    <section
      data-section="auth-hero"
      className="relative hidden min-h-screen flex-col overflow-hidden border-r border-border/60 lg:flex"
    >
      {/* Base wash — как Plaindesk: мягкий tri-tone по бренду */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/12 to-accent/18 dark:from-primary/22 dark:via-secondary/12 dark:to-accent/18"
        aria-hidden
      />

      {/* Радиальные пятна: розовый верх слева + бирюза/тёплый низ справа (тёмная тема — ярче неон) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_52%),radial-gradient(circle_at_72%_82%,color-mix(in_oklch,var(--accent)_20%,transparent),transparent_50%),radial-gradient(circle_at_85%_35%,oklch(0.62_0.12_55_/_0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_28%_14%,color-mix(in_oklch,var(--primary)_42%,transparent),transparent_48%),radial-gradient(circle_at_78%_88%,color-mix(in_oklch,var(--accent)_34%,transparent),transparent_46%),radial-gradient(circle_at_88%_28%,oklch(0.72_0.14_55_/_0.14),transparent_42%)]"
        aria-hidden
      />

      {/* Сетка — как в Plaindesk (60×60, низкая непрозрачность) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-screen flex-col justify-between p-10">
        {/* Логотип — rounded-xl, градиент primary → глубокий индиго (chart-3), тень */}
        <Link
          href="/"
          className="group flex w-fit items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-3 shadow-lg shadow-primary/25 transition-shadow group-hover:shadow-xl group-hover:shadow-primary/30">
            <span className="text-lg font-bold text-primary-foreground">G</span>
          </div>
          <span className="neon-brand-title text-xl font-semibold tracking-tight text-foreground">
            {tBrand("title")}
          </span>
        </Link>

        {/* Центр — «парящая» тройная карточка + орбы (как Plaindesk) */}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="relative">
            <div className="absolute -top-24 -left-24 h-52 w-52 animate-pulse rounded-full bg-primary/38 blur-3xl dark:bg-primary/48" />
            <div
              className="absolute -right-24 -bottom-24 h-52 w-52 animate-pulse rounded-full bg-accent/35 blur-3xl dark:bg-accent/45"
              style={{ animationDelay: "0.6s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-chart-3/28 blur-3xl dark:bg-chart-3/38"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative h-[min(85vw,26rem)] w-[min(85vw,26rem)] sm:h-[28rem] sm:w-[28rem]">
              <div className="absolute inset-0 rotate-6 rounded-3xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm" />
              <div className="absolute inset-0 -rotate-3 rounded-3xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm" />
              <div className="absolute inset-0 overflow-hidden rounded-3xl border border-border shadow-2xl backdrop-blur-sm">
                {/* Абстрактный «игровой» фон (без внешнего арта — можно заменить слоем с url(...)) */}
                <AuthHeroGameBackdrop />
                <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between sm:min-h-[320px]">
                  <div className="flex justify-center gap-2 pt-6">
                    <div className="h-3 w-3 animate-bounce rounded-full bg-primary shadow-[0_0_12px_color-mix(in_oklch,var(--primary)_70%,transparent)]" />
                    <div
                      className="h-3 w-3 animate-bounce rounded-full bg-muted-foreground/55"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-3 w-3 animate-bounce rounded-full bg-accent shadow-[0_0_12px_color-mix(in_oklch,var(--accent)_65%,transparent)]"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <div className="border-t border-white/5 bg-gradient-to-t from-background/95 via-background/75 to-transparent px-4 py-4 backdrop-blur-md">
                    <p className="text-center text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
                      {tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Цитата внизу */}
        <div className="max-w-lg space-y-4">
          <blockquote className="text-lg font-medium leading-relaxed text-foreground">
            {t("quote")}
          </blockquote>
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent ring-2 ring-border/60"
              aria-hidden
            />
            <div>
              <p className="text-sm font-medium text-foreground">{t("quoteAuthor")}</p>
              <p className="text-xs text-muted-foreground">{t("quoteRole")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
