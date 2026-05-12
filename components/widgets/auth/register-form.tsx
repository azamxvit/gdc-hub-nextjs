"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shared/ui/button";
import { Label } from "@/components/shared/ui/label";
import { AuthInputWithIcon } from "@/components/widgets/auth/auth-input-with-icon";
import { AuthOauthDivider } from "@/components/widgets/auth/auth-oauth-divider";
import { Link, useRouter } from "@/i18n/navigation";
import { signInWithGoogle, signUpWithEmailPassword, useAuthUrlError } from "@/lib/auth";
import { AUTH_LOGIN, AUTH_REGISTER } from "@/lib/navigation/routes";

type RegisterValues = {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterFormWidget() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth.register");
  const tOauth = useTranslations("auth.oauth");
  const tErrors = useTranslations("errors");
  const [formError, setFormError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [confirmEmailHint, setConfirmEmailHint] = useState<string | null>(null);

  useAuthUrlError(setFormError);

  const registerSchema = useMemo(
    () =>
      z
        .object({
          full_name: z.string().min(2, tErrors("fullNameMin")),
          email: z.string().email(tErrors("invalidEmail")),
          password: z.string().min(8, tErrors("passwordMin")),
          confirmPassword: z.string().min(1, tErrors("confirmPasswordRequired")),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: tErrors("passwordMismatch"),
          path: ["confirmPassword"],
        }),
    [tErrors],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: "", email: "", password: "", confirmPassword: "" },
  });

  const authRegisterPath = `/${locale}${AUTH_REGISTER}`;

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    setConfirmEmailHint(null);
    try {
      const { needsEmailConfirmation } = await signUpWithEmailPassword(
        data.email,
        data.password,
        data.full_name,
      );
      if (needsEmailConfirmation) {
        setConfirmEmailHint(t("emailConfirmHint"));
        return;
      }
      router.push("/");
      router.refresh();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : tErrors("genericRegister"));
    }
  });

  const handleGoogle = async () => {
    setFormError(null);
    setConfirmEmailHint(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle({
        errorReturnPath: authRegisterPath,
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
        label={tOauth("dividerRegister")}
        googleButtonLabel={tOauth("googleContinue")}
        googleLoadingLabel={tOauth("googleLoading")}
        googleTitle={tOauth("googleTitle")}
        googleDisabledTitle={tOauth("googleDisabled")}
        onGoogle={handleGoogle}
        googleLoading={googleLoading}
      />

      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="reg-name">{t("fullNameLabel")}</Label>
          <AuthInputWithIcon
            id="reg-name"
            icon={<User />}
            autoComplete="name"
            placeholder={t("fullNamePlaceholder")}
            aria-invalid={Boolean(errors.full_name)}
            className="bg-background/80"
            {...register("full_name")}
          />
          <p className="text-[11px] text-muted-foreground">{t("fullNameHint")}</p>
          {errors.full_name ? (
            <p className="text-xs text-destructive">{errors.full_name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-email">{t("emailLabel")}</Label>
          <AuthInputWithIcon
            id="reg-email"
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
          <Label htmlFor="reg-password">{t("passwordLabel")}</Label>
          <AuthInputWithIcon
            id="reg-password"
            icon={<Lock />}
            type="password"
            showPasswordToggle
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            aria-invalid={Boolean(errors.password)}
            className="bg-background/80"
            {...register("password")}
          />
          {errors.password ? (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-password2">{t("confirmPasswordLabel")}</Label>
          <AuthInputWithIcon
            id="reg-password2"
            icon={<Lock />}
            type="password"
            showPasswordToggle
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            aria-invalid={Boolean(errors.confirmPassword)}
            className="bg-background/80"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
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

        {confirmEmailHint ? (
          <div
            role="status"
            className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-foreground"
          >
            {confirmEmailHint}
          </div>
        ) : null}

        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          {t("legalPrefix")}{" "}
          <span className="neon-link-auth font-medium underline-offset-2">{t("terms")}</span>{" "}
          {t("legalMiddle")}{" "}
          <span className="neon-link-auth font-medium underline-offset-2">{t("privacy")}</span>{" "}
          {t("legalSuffix")}
        </p>

        <Button
          type="submit"
          className="h-12 w-full rounded-lg bg-foreground text-background font-semibold tracking-wide hover:opacity-90"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t("hasAccount")}{" "}
        <Link
          href={AUTH_LOGIN}
          className="neon-link-auth font-semibold underline-offset-4 hover:underline"
        >
          {t("loginLink")}
        </Link>
      </p>
    </div>
  );
}
