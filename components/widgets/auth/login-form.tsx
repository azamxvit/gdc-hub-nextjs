"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shared/ui/button";
import { Label } from "@/components/shared/ui/label";
import { AuthInputWithIcon } from "@/components/widgets/auth/auth-input-with-icon";
import { AuthOauthDivider } from "@/components/widgets/auth/auth-oauth-divider";
import { Link, useRouter } from "@/i18n/navigation";
import { signInWithEmailPassword, signInWithGoogle, useAuthUrlError } from "@/lib/auth";
import { AUTH_REGISTER } from "@/lib/navigation/routes";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginFormWidget() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth.login");
  const tOauth = useTranslations("auth.oauth");
  const tErrors = useTranslations("errors");
  const [formError, setFormError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  useAuthUrlError(setFormError);

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(tErrors("invalidEmail")),
        password: z.string().min(1, tErrors("passwordRequired")),
      }),
    [tErrors],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const authBase = `/${locale}/auth`;

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await signInWithEmailPassword(values.email, values.password);
      router.push("/");
      router.refresh();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : tErrors("genericLogin"));
    }
  });

  const handleGoogle = async () => {
    setFormError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle({
        errorReturnPath: authBase,
        successNext: "/",
      });
    } catch (e) {
      setFormError(e instanceof Error ? e.message : tErrors("genericGoogle"));
      setGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </header>

      <AuthOauthDivider
        label={tOauth("dividerLogin")}
        googleButtonLabel={tOauth("googleContinue")}
        googleLoadingLabel={tOauth("googleLoading")}
        googleTitle={tOauth("googleTitle")}
        googleDisabledTitle={tOauth("googleDisabled")}
        onGoogle={handleGoogle}
        googleLoading={googleLoading}
      />

      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="login-email">{t("emailLabel")}</Label>
          <AuthInputWithIcon
            id="login-email"
            icon={<Mail />}
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            aria-invalid={Boolean(errors.email)}
            className="bg-background/80"
            {...register("email")}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="login-password">{t("passwordLabel")}</Label>
            <span className="text-xs text-muted-foreground">
              {t("forgotPrompt")}{" "}
              <span className="neon-link-auth font-medium underline-offset-2">
                {t("forgotSoon")}
              </span>
            </span>
          </div>
          <AuthInputWithIcon
            id="login-password"
            icon={<Lock />}
            type="password"
            showPasswordToggle
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.password)}
            className="bg-background/80"
            {...register("password")}
          />
          {errors.password ? (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          ) : null}
        </div>

        {formError ? (
          <div
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {formError}
          </div>
        ) : null}

        <Button
          type="submit"
          className="h-12 w-full rounded-lg bg-foreground text-background font-semibold tracking-wide hover:opacity-90"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t("noAccount")}{" "}
        <Link
          href={AUTH_REGISTER}
          className="neon-link-auth font-semibold underline-offset-4 hover:underline"
        >
          {t("registerLink")}
        </Link>
      </p>
    </div>
  );
}
