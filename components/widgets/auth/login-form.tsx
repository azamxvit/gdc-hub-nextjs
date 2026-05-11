"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shared/ui/button";
import { Label } from "@/components/shared/ui/label";
import { AuthInputWithIcon } from "@/components/widgets/auth/auth-input-with-icon";
import { AuthOauthDivider } from "@/components/widgets/auth/auth-oauth-divider";
import { signInWithEmailPassword, signInWithGoogle, useAuthUrlError } from "@/lib/auth";
import { AUTH_REGISTER } from "@/lib/navigation/routes";

const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginFormWidget() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  useAuthUrlError(setFormError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    try {
      await signInWithEmailPassword(values.email, values.password);
      router.push("/");
      router.refresh();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Не удалось войти");
    }
  });

  const handleGoogle = async () => {
    setFormError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle({ errorReturnPath: "/auth", successNext: "/" });
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Не удалось войти через Google");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
          С возвращением
        </h1>
        <p className="text-sm text-muted-foreground">Введите данные, чтобы войти в аккаунт.</p>
      </header>

      <AuthOauthDivider
        label="или войти по email"
        onGoogle={handleGoogle}
        googleLoading={googleLoading}
      />

      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
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
            <Label htmlFor="login-password">Пароль</Label>
            <span className="text-xs text-muted-foreground">
              Забыли пароль? <span className="font-medium text-accent">скоро</span>
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
          {isSubmitting ? "Входим…" : "Войти"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Нет аккаунта?{" "}
        <Link
          href={AUTH_REGISTER}
          className="font-semibold text-accent underline-offset-4 hover:underline"
        >
          Регистрация
        </Link>
      </p>
    </div>
  );
}
