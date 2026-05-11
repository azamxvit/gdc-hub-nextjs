type TavernLandingSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function TavernLandingSection({
  eyebrow = "Таверна",
  title = "Лента резидентов",
  description = "Микро-блог портала: посты, скриншоты прогресса и объявления. Здесь будет контент из FastAPI.",
}: TavernLandingSectionProps) {
  return (
    <section
      data-section="tavern-landing"
      className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-card/80 to-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-25%,oklch(0.52_0.17_145_/_0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6 py-14 sm:py-20">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.45em] text-primary">
          {eyebrow}
        </p>
        <h1 className="portal-text-gradient mt-4 font-heading text-4xl font-semibold uppercase tracking-[0.08em] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
