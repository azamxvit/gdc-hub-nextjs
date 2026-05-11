type AppModulePageSectionProps = {
  module: string;
  title: string;
  description: string;
};

export function AppModulePageSection({ module, title, description }: AppModulePageSectionProps) {
  return (
    <section data-module={module} className="mx-auto max-w-4xl px-6 py-14 sm:py-16">
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.4em] text-primary">
        {module}
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.12em] text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
      <div className="portal-bevel-border mt-10 rounded-xl border border-border/70 bg-card/50 p-8 ring-1 ring-primary/10">
        <p className="text-sm text-muted-foreground">
          Раздел в миграции с legacy gdc_frontend. Подключим данные FastAPI по мере готовности бэка.
        </p>
      </div>
    </section>
  );
}
