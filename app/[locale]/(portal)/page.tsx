import { getTranslations } from "next-intl/server";

import { TavernLandingSection } from "@/components/sections/tavern/tavern-landing-section";
import { TavernFeedPlaceholder } from "@/components/widgets/tavern/tavern-feed-placeholder";

export default async function TavernHomePage() {
  const t = await getTranslations("dashboard.screens.home");

  return (
    <>
      <TavernLandingSection
        eyebrow={t("tavernEyebrow")}
        title={t("tavernTitle")}
        description={t("tavernDescription")}
      />
      <TavernFeedPlaceholder
        title={t("feedTitle")}
        description={t("feedBody")}
        emptyHint={t("feedFooter")}
      />
    </>
  );
}
