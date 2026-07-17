"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing, type AppLocale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const LOCALE_LABELS: Record<AppLocale, string> = {
  ca: "CA",
  es: "ES",
  en: "EN",
  fr: "FR",
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div
      role="group"
      aria-label={t("switchLanguage")}
      className={cn("flex items-center gap-1 text-sm font-medium", className)}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            loc === locale
              ? "bg-foreground/10 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  )
}
