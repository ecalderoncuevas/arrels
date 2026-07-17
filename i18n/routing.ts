import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["ca", "es", "en", "fr"],
  defaultLocale: "ca",
  localePrefix: "always",
})

export type AppLocale = (typeof routing.locales)[number]
