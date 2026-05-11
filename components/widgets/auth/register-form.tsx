"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shared/ui/button";
import { Label } from "@/components/shared/ui/label";
import { AuthInputWithIcon } from "@/components/widgets/auth/auth-input-with-icon";
import { AuthOauthDivider } from "@/components/widgets/auth/auth-oauth-divider";
import { signInWithGoogle, signUpWithEmailPassword, useAuthUrlError } from "@/lib/auth";
import { AUTH_LOGIN, AUTH_REGISTER } from "@/lib/navigation/routes";

const registerSchema = z
  .object({
    full_name: z.string().min(2, "Укажите ФИО"),
    email: z.string().email("Некорректный email"),
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterFormWidget() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [confirmEmailHint, setConfirmEmailHint] = useState<string | null>(null);

  useAuthUrlError(setFormError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: "", email: "", password: "", confirmPassword: "" },
  });

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
        setConfirmEmailHint(
          "Мы отправили письмо с подтверждением. Перейдите по ссылке из email, затем войдите.",
        );
        return;
      }
      router.push("/");
      router.refresh();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Не удалось зарегистрироваться");
    }
  });

  const handleGoogle = async () => {
    setFormError(null);
    setConfirmEmailHint(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle({ errorReturnPath: AUTH_REGISTER, successNext: "/" });
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Не удалось войти через Google");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          Создать аккаунт
        </h1>
        <p className="text-sm text-muted-foreground">
          Заполните поля, чтобы присоединиться к порталу.
        </p>
      </header>

      <AuthOauthDivider
        label="или по email"
        onGoogle={handleGoogle}
        googleLoading={googleLoading}
      />

      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="reg-name">ФИО</Label>
          <AuthInputWithIcon
            id="reg-name"
            icon={<User />}
            autoComplete="name"
            placeholder="Иванов Иван Иванович"
            aria-invalid={Boolean(errors.full_name)}
            className="bg-background/80"
            {...register("full_name")}
          />
          <p className="text-[11px] text-muted-foreground">
            Как в паспорте — для свитков. Другие игроки не увидят.
          </p>
          {errors.full_name ? (
            <p className="text-xs text-destructive">{errors.full_name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-email">Email</Label>
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
          <Label htmlFor="reg-password">Пароль</Label>
          <AuthInputWithIcon
            id="reg-password"
            icon={<Lock />}
            type="password"
            showPasswordToggle
            autoComplete="new-password"
            placeholder="Минимум 8 символов"
            aria-invalid={Boolean(errors.password)}
            className="bg-background/80"
            {...register("password")}
          />
          {errors.password ? (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-password2">Подтверждение пароля</Label>
          <AuthInputWithIcon
            id="reg-password2"
            icon={<Lock />}
            type="password"
            showPasswordToggle
            autoComplete="new-password"
            placeholder="Повторите пароль"
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
          Регистрируясь, вы соглашаетесь с{" "}
          <span className="font-medium text-accent underline-offset-2">условиями сервиса</span> и{" "}
          <span className="font-medium text-accent underline-offset-2">политикой данных</span>
          <span className="sr-only"> (тексты появятся позже)</span>.
        </p>

        <Button
          type="submit"
          className="h-12 w-full rounded-lg bg-foreground text-background font-semibold tracking-wide hover:opacity-90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Создаём…" : "Создать аккаунт"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{" "}
        <Link
          href={AUTH_LOGIN}
          className="font-semibold text-accent underline-offset-4 hover:underline"
        >
          Войти
        </Link>
      </p>
    </div>
  );
}
