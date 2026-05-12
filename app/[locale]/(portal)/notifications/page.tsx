import { getTranslations } from "next-intl/server";

import { AppModulePageSection } from "@/components/sections/app/app-module-page-section";

export default async function NotificationsPage() {
  const t = await getTranslations("dashboard.screens.notifications");

  return (
    <AppModulePageSection module={t("module")} title={t("title")} description={t("description")} />
  );
}
