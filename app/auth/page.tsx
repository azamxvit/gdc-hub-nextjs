import { Suspense } from "react";

import { AuthFormShellSection } from "@/components/sections/auth/auth-form-shell-section";
import { AuthSplitHeroSection } from "@/components/sections/auth/auth-split-hero-section";
import { LoginFormWidget } from "@/components/widgets/auth/login-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
  description: "Авторизация в GDC Hub",
};

export default function AuthPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <AuthSplitHeroSection variant="login" />
      <AuthFormShellSection>
        <Suspense fallback={<div className="min-h-[280px]" aria-hidden />}>
          <LoginFormWidget />
        </Suspense>
      </AuthFormShellSection>
    </div>
  );
}
