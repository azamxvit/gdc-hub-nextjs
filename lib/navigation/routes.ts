export const AUTH_LOGIN = "/auth";
export const AUTH_REGISTER = "/auth/register";

export const PORTAL_NAV = [
  { href: "/", labelKey: "tavern" },
  { href: "/leaderboard", labelKey: "leaderboard" },
  { href: "/quests", labelKey: "quests" },
  { href: "/shop", labelKey: "shop" },
  { href: "/inventory", labelKey: "inventory" },
  { href: "/certificates", labelKey: "certificates" },
  { href: "/notifications", labelKey: "notifications" },
] as const;
