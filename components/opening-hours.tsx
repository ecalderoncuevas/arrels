"use client"

import { useTranslations } from "next-intl"
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  getWeekday,
  isOpenAt,
  weekdayOrder,
  weeklySchedule,
  type Weekday,
} from "@/lib/opening-hours-data"

const REFRESH_INTERVAL_MS = 30_000

type Status = {
  state: "checking" | "open" | "closed"
  today: Weekday | null
}

export function OpeningHours() {
  const t = useTranslations("openingHours")
  // Neutral on first paint (server + client match exactly), the real
  // Europe/Madrid-based status is computed after mount to avoid any
  // hydration mismatch from timezone/clock differences.
  const [status, setStatus] = React.useState<Status>({
    state: "checking",
    today: null,
  })

  React.useEffect(() => {
    const update = () => {
      const now = new Date()
      setStatus({
        state: isOpenAt(now) ? "open" : "closed",
        today: getWeekday(now),
      })
    }
    update()
    const interval = setInterval(update, REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium transition-colors",
          status.state === "open" && "bg-primary/10 text-primary",
          status.state === "closed" && "bg-destructive/10 text-destructive",
          status.state === "checking" && "bg-muted text-muted-foreground"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "size-2 rounded-full",
            status.state === "open" && "bg-primary",
            status.state === "closed" && "bg-destructive",
            status.state === "checking" && "bg-muted-foreground"
          )}
        />
        {status.state === "checking" && t("checking")}
        {status.state === "open" && t("openNow")}
        {status.state === "closed" && t("closedNow")}
      </div>

      <table className="w-full text-sm">
        <tbody>
          {weekdayOrder.map((day) => {
            const ranges = weeklySchedule[day]
            return (
              <tr
                key={day}
                className={cn(
                  "border-b border-border/60 last:border-0",
                  day === status.today && "font-medium text-foreground"
                )}
              >
                <td className="py-2 pr-6">{t(`days.${day}`)}</td>
                <td className="py-2 text-muted-foreground">
                  {ranges.length === 0
                    ? t("closedDay")
                    : ranges.map((r) => `${r.open}–${r.close}`).join(" · ")}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
