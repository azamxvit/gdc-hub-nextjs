import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

type AppLocale = (typeof routing.locales)[number];

const MESSAGE_NAMESPACES = [
  "auth",
  "common",
  "dashboard",
  "errors",
  "forms",
  "inbox",
  "pricing",
  "settings",
] as const;

type MessageNamespace = (typeof MESSAGE_NAMESPACES)[number];

async function loadMessages(locale: AppLocale) {
  const bundles = await Promise.all(
    MESSAGE_NAMESPACES.map(async (name: MessageNamespace) => {
      const mod = await import(`../messages/${locale}/${name}.json`);
      return [name, mod.default] as const;
    }),
  );
  return Object.fromEntries(bundles);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
