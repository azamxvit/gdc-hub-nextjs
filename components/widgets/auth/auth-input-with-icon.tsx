"use client";

import * as React from "react";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/shared/ui/input";
import { cn } from "@/lib/utils";

type AuthInputWithIconProps = React.ComponentProps<typeof Input> & {
  icon: React.ReactNode;
  showPasswordToggle?: boolean;
};

export function AuthInputWithIcon({
  ref,
  icon,
  className,
  id,
  type = "text",
  showPasswordToggle,
  ...inputProps
}: AuthInputWithIconProps) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const isPassword = type === "password";
  const withToggle = Boolean(showPasswordToggle && isPassword);
  const effectiveType = withToggle ? (passwordVisible ? "text" : "password") : type;

  const toggleLabel = passwordVisible ? "Скрыть пароль" : "Показать пароль";

  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-muted-foreground [&_svg]:size-4"
        aria-hidden
      >
        {icon}
      </span>
      <Input
        ref={ref}
        id={id}
        type={effectiveType}
        className={cn("h-11 pl-10", withToggle && "pr-11", className)}
        {...inputProps}
      />
      {withToggle ? (
        <button
          type="button"
          className="absolute right-2 top-1/2 z-[1] -translate-y-1/2 rounded-md p-1.5 text-muted-foreground outline-none transition hover:bg-muted/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={toggleLabel}
          aria-pressed={passwordVisible}
          onClick={() => setPasswordVisible((v) => !v)}
        >
          {passwordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      ) : null}
    </div>
  );
}
