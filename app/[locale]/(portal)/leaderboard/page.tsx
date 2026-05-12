import { getTranslations } from "next-intl/server";

import { AppModulePageSection } from "@/components/sections/app/app-module-page-section";

export default async function LeaderboardPage() {
  const t = await getTranslations("dashboard.screens.leaderboard");

  return (
    <AppModulePageSection module={t("module")} title={t("title")} description={t("description")} />
  );
}
