import { MessageSquareText } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";

export function TavernFeedPlaceholder() {
  return (
    <section data-widget="tavern-feed" className="mx-auto max-w-3xl px-6 py-12">
      <Card className="portal-bevel-border border-border/70 bg-card/60 shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_12%,transparent)]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <MessageSquareText className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <CardTitle className="font-heading text-lg uppercase tracking-[0.12em]">
                Лента скоро оживёт
              </CardTitle>
              <CardDescription>
                Переносим посты и вложения из legacy gdc_frontend → Next.js. API остаётся на
                FastAPI.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border/80 bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
            Пустой таймлайн — заглушка для вёрстки и навигации.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
