import { getTranslations } from "next-intl/server";

import { AppModulePageSection } from "@/components/sections/app/app-module-page-section";

export default async function AdminPage() {
  const t = await getTranslations("dashboard.screens.admin");

  return (
    <AppModulePageSection module={t("module")} title={t("title")} description={t("description")} />
  );
}
