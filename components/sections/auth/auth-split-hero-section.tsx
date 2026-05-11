import Link from "next/link";

type AuthSplitHeroSectionProps = {
  variant?: "login" | "register";
};

export function AuthSplitHeroSection({ variant = "login" }: AuthSplitHeroSectionProps) {
  const tagline =
    variant === "login"
      ? "Резидентский портал: квесты, награды и сообщество в одном клиенте."
      : "Создай аккаунт — Таверна, Лавка и квесты уже ждут.";

  return (
    <section
      data-section="auth-hero"
      className="relative hidden min-h-screen flex-col overflow-hidden border-r border-border/60 lg:flex"
    >
      {/* Base wash — как Plaindesk: мягкий tri-tone по бренду */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/12 to-accent/18 dark:from-primary/17 dark:via-secondary/10 dark:to-accent/16"
        aria-hidden
      />

      {/* Радиальные пятна: розовый верх слева + бирюза/тёплый низ справа */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_52%),radial-gradient(circle_at_72%_82%,color-mix(in_oklch,var(--accent)_20%,transparent),transparent_50%),radial-gradient(circle_at_85%_35%,oklch(0.62_0.12_55_/_0.08),transparent_45%)] dark:bg-[radial-gradient(circle_at_30%_18%,color-mix(in_oklch,var(--primary)_30%,transparent),transparent_52%),radial-gradient(circle_at_72%_82%,color-mix(in_oklch,var(--accent)_26%,transparent),transparent_50%),radial-gradient(circle_at_85%_35%,oklch(0.62_0.12_55_/_0.1),transparent_45%)]"
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
          <span className="text-xl font-semibold tracking-tight text-foreground">GDC Hub</span>
        </Link>

        {/* Центр — «парящая» тройная карточка + орбы (как Plaindesk) */}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="relative">
            <div className="absolute -top-20 -left-20 h-40 w-40 animate-pulse rounded-full bg-primary/25 blur-3xl" />
            <div
              className="absolute -right-20 -bottom-20 h-40 w-40 animate-pulse rounded-full bg-accent/25 blur-3xl"
              style={{ animationDelay: "0.6s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-chart-3/20 blur-3xl"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative h-72 w-72">
              <div className="absolute inset-0 rotate-6 rounded-3xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm" />
              <div className="absolute inset-0 -rotate-3 rounded-3xl border border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm" />
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-border bg-card shadow-2xl backdrop-blur-sm">
                <div className="space-y-4 p-6 text-center">
                  <div className="flex justify-center gap-2">
                    <div className="h-3 w-3 animate-bounce rounded-full bg-primary" />
                    <div
                      className="h-3 w-3 animate-bounce rounded-full bg-muted-foreground/55"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-3 w-3 animate-bounce rounded-full bg-accent"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{tagline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Цитата внизу */}
        <div className="max-w-lg space-y-4">
          <blockquote className="text-lg font-medium leading-relaxed text-foreground">
            «GDC Hub собрал наши джемы, сертификаты и внутреннюю экономику — наконец-то всё в одном
            месте.»
          </blockquote>
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent ring-2 ring-border/60"
              aria-hidden
            />
            <div>
              <p className="text-sm font-medium text-foreground">Анна К.</p>
              <p className="text-xs text-muted-foreground">Резидент, Game Dev Center</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
