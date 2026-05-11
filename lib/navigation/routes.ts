export const AUTH_LOGIN = "/auth";
export const AUTH_REGISTER = "/auth/register";

export const PORTAL_NAV = [
  { href: "/", label: "Таверна" },
  { href: "/leaderboard", label: "Зал славы" },
  { href: "/quests", label: "Квесты" },
  { href: "/shop", label: "Лавка" },
  { href: "/inventory", label: "Инвентарь" },
  { href: "/certificates", label: "Свитки" },
  { href: "/notifications", label: "Почта" },
] as const;
