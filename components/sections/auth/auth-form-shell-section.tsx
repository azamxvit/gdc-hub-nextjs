import { ThemeSwitcher } from "@/components/widgets/theme/theme-switcher";

export function AuthFormShellSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      data-section="auth-form-shell"
      className="relative flex min-h-screen flex-col bg-background px-5 py-6 sm:px-8 lg:px-12"
    >
      <div className="flex shrink-0 justify-end">
        <ThemeSwitcher />
      </div>
      <div className="flex flex-1 flex-col justify-center py-8">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
      <p className="shrink-0 pb-4 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} GDC Hub
      </p>
    </section>
  );
}
