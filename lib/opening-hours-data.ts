export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

export type TimeRange = { open: string; close: string }

/** Real weekly schedule for Arrels Fruita i Verdura (Av. de Mistral, 24). Times are Europe/Madrid local time, 24h "HH:mm". */
export const weeklySchedule: Record<Weekday, TimeRange[]> = {
  mon: [
    { open: "09:00", close: "14:00" },
    { open: "17:00", close: "20:30" },
  ],
  tue: [
    { open: "09:00", close: "14:00" },
    { open: "17:00", close: "20:30" },
  ],
  wed: [
    { open: "09:00", close: "14:00" },
    { open: "17:00", close: "20:30" },
  ],
  thu: [
    { open: "09:00", close: "14:00" },
    { open: "17:00", close: "20:30" },
  ],
  fri: [
    { open: "09:00", close: "14:00" },
    { open: "17:00", close: "20:30" },
  ],
  sat: [{ open: "09:00", close: "14:30" }],
  sun: [],
}

export const weekdayOrder: Weekday[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
]

function toMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(":").map(Number)
  return hours * 60 + minutes
}

/**
 * Resolves the Europe/Madrid weekday + minutes-since-midnight for a given
 * instant, regardless of the visitor's (or server's) own timezone.
 */
function madridPart(date: Date): { weekday: Weekday; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  const weekday = get("weekday").toLowerCase().slice(0, 3) as Weekday
  const hour = Number(get("hour")) % 24
  const minute = Number(get("minute"))

  return { weekday, minutes: hour * 60 + minute }
}

export function getWeekday(date: Date = new Date()): Weekday {
  return madridPart(date).weekday
}

export function getTodayRanges(date: Date = new Date()): TimeRange[] {
  return weeklySchedule[madridPart(date).weekday]
}

export function isOpenAt(date: Date = new Date()): boolean {
  const { weekday, minutes } = madridPart(date)
  return weeklySchedule[weekday].some(
    (range) => minutes >= toMinutes(range.open) && minutes < toMinutes(range.close)
  )
}
