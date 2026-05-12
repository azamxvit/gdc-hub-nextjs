"use client";

import { useSyncExternalStore } from "react";

import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "@/components/widgets/locale/locale-switcher";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  getAuthBrowserServerSnapshotString,
  getAuthBrowserSnapshotString,
  parseAuthBrowserSnapshotString,
  signOutClient,
  subscribeAuthBrowserState,
} from "@/lib/auth";
import { PORTAL_NAV } from "@/lib/navigation/routes";
import { cn } from "@/lib/utils";

const showMasterNav = process.env.NEXT_PUBLIC_SHOW_MASTER_NAV === "true";

export function PortalHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const tCommon = useTranslations("common");
  const tNav = useTranslations("dashboard.nav");
  const authRaw = useSyncExternalStore(
    subscribeAuthBrowserState,
    getAuthBrowserSnapshotString,
    getAuthBrowserServerSnapshotString,
  );
  const auth = parseAuthBrowserSnapshotString(authRaw);
  const hasSession = auth.status === "signedIn";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    try {
      await signOutClient();
    } catch {
      /* всё равно уходим на форму входа */
    }
    router.push("/auth");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground shadow-[0_0_24px_-4px_var(--color-primary)]">
            <span className="font-heading text-lg font-bold tracking-tight">G</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-sm font-semibold uppercase tracking-[0.35em] text-foreground">
              {tCommon("brand.title")}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {tCommon("brand.subtitle")}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <Link
            href="/profile"
            className="flex items-center gap-2 border border-transparent px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[11px] font-bold text-primary">
              {auth.avatarLetter}
            </span>
            <span className="hidden sm:inline">{tCommon("header.profile")}</span>
          </Link>

          {showMasterNav ? (
            <Link
              href="/admin"
              className="border border-primary/60 bg-primary/15 px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              {tCommon("header.master")}
            </Link>
          ) : null}

          {hasSession ? (
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="border border-border px-3 py-2 text-[11px] uppercase tracking-wider text-muted-foreground transition hover:border-destructive/50 hover:text-destructive"
            >
              {tCommon("header.logout")}
            </button>
          ) : (
            <Link
              href="/auth"
              className="border border-primary bg-primary px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
            >
              {tCommon("header.login")}
            </Link>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-0 overflow-x-auto border-t border-border/60 px-2 sm:px-6">
        {PORTAL_NAV.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "shrink-0 border-b-2 px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition sm:px-4",
              isActive(link.href)
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
            )}
          >
            {tNav(link.labelKey)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
