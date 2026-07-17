"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import * as React from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("nav")
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Resolved theme is unknown on the server (it depends on client-only
  // storage/system preference), so the icon is only rendered post-hydration
  // to avoid a server/client mismatch — the standard next-themes pattern.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t("toggleTheme")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground",
        className
      )}
    >
      {mounted && (
        <>
          <Sun className={cn("size-4", isDark && "hidden")} aria-hidden />
          <Moon className={cn("size-4", !isDark && "hidden")} aria-hidden />
        </>
      )}
    </button>
  )
}
