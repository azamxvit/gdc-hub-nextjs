"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/shared/ui/card";
import { Label } from "@/components/shared/ui/label";
import { AuthInputWithIcon } from "@/components/widgets/auth/auth-input-with-icon";
import {
  hasEmailPasswordIdentity,
  hasGoogleIdentity,
  updatePasswordForCurrentUser,
} from "@/lib/auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const schema = z
  .object({
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type Values = z.infer<typeof schema>;

export function ProfilePasswordSection() {
  const [status, setStatus] = useState<"loading" | "ready" | "signedOut">("loading");
  const [googleOnly, setGoogleOnly] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        if (!user) {
          if (!cancelled) setStatus("signedOut");
          return;
        }
        const ids = user.identities;
        const google = hasGoogleIdentity(ids);
        const emailPwd = hasEmailPasswordIdentity(ids);
        if (!cancelled) {
          setGoogleOnly(google && !emailPwd);
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("signedOut");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    setSuccess(null);
    try {
      await updatePasswordForCurrentUser(values.password);
      reset();
      setSuccess(
        googleOnly
          ? "Пароль сохранён. Теперь можно входить по email и паролю на странице «Вход»."
          : "Пароль обновлён.",
      );
      setGoogleOnly(false);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Не удалось сохранить пароль");
    }
  });

  if (status === "loading" || status === "signedOut") {
    return null;
  }

  return (
    <Card className="border-border/70 bg-card/60">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="font-heading text-lg tracking-tight">Вход по паролю</CardTitle>
        <CardDescription>
          {googleOnly ? (
            <>
              Вы вошли через Google. Задайте пароль для этого же email — тогда на странице входа
              можно использовать <strong className="text-foreground">«Войти по email»</strong>, не
              только Google.
            </>
          ) : (
            <>Смена пароля для входа по email (тот же email, что в аккаунте).</>
          )}
        </CardDescription>
      </CardHeader>

      <form className="space-y-4 px-4 pb-4 pt-2" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="profile-new-password">Новый пароль</Label>
          <AuthInputWithIcon
            id="profile-new-password"
            icon={<Lock />}
            type="password"
            showPasswordToggle
            autoComplete="new-password"
            placeholder="Минимум 8 символов"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password ? (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-confirm-password">Повтор пароля</Label>
          <AuthInputWithIcon
            id="profile-confirm-password"
            icon={<Lock />}
            type="password"
            showPasswordToggle
            autoComplete="new-password"
            placeholder="Ещё раз"
            aria-invalid={Boolean(errors.confirmPassword)}
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

        {success ? (
          <div
            role="status"
            className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-foreground"
          >
            {success}
          </div>
        ) : null}

        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняем…" : googleOnly ? "Сохранить пароль" : "Обновить пароль"}
        </Button>
      </form>
    </Card>
  );
}
