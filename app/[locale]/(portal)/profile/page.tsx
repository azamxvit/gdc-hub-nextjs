import { getTranslations } from "next-intl/server";

import { AppModulePageSection } from "@/components/sections/app/app-module-page-section";
import { ProfilePasswordSection } from "@/components/widgets/profile/profile-password-section";

export default async function ProfilePage() {
  const t = await getTranslations("dashboard.screens.profile");

  return (
    <>
      <AppModulePageSection
        module={t("module")}
        title={t("title")}
        description={t("description")}
      />
      <div className="mx-auto max-w-4xl px-6 pb-14 sm:pb-16">
        <ProfilePasswordSection />
      </div>
    </>
  );
}
