import { Suspense } from "react";

import { getTranslations } from "next-intl/server";

import { AuthFormShellSection } from "@/components/sections/auth/auth-form-shell-section";
import { AuthSplitHeroSection } from "@/components/sections/auth/auth-split-hero-section";
import { RegisterFormWidget } from "@/components/widgets/auth/register-form";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.register");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function AuthRegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <AuthSplitHeroSection variant="register" />
      <AuthFormShellSection>
        <Suspense fallback={<div className="min-h-[320px]" aria-hidden />}>
          <RegisterFormWidget />
        </Suspense>
      </AuthFormShellSection>
    </div>
  );
}
