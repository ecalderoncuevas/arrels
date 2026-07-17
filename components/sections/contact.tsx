"use client"

import { MapPin, Phone } from "lucide-react"
import { useTranslations } from "next-intl"
import { OpeningHours } from "@/components/opening-hours"
import { buttonVariants } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const COORDINATES = { lat: 41.377076, lng: 2.15714 }
const PHONE_TEL = "+34936787010"
const PHONE_DISPLAY = "+34 936 78 70 10"

export function Contact() {
  const t = useTranslations("contact")
  const ref = useScrollReveal<HTMLDivElement>({ selector: "[data-reveal]" })

  const mapSrc = `https://www.google.com/maps?q=${COORDINATES.lat},${COORDINATES.lng}&z=16&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${COORDINATES.lat},${COORDINATES.lng}`

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div ref={ref} className="grid gap-12 md:grid-cols-2">
        <div data-reveal className="space-y-6">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="font-heading text-4xl leading-tight tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("intro")}</p>

          <dl className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <dt className="text-sm text-muted-foreground">
                  {t("addressLabel")}
                </dt>
                <dd>{t("address")}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <dt className="text-sm text-muted-foreground">
                  {t("phoneLabel")}
                </dt>
                <dd>
                  <a href={`tel:${PHONE_TEL}`} className="hover:text-primary">
                    {PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <div className="pt-2">
            <p className="mb-3 text-sm text-muted-foreground">
              {t("hoursLabel")}
            </p>
            <OpeningHours />
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "mt-2 w-fit")}
          >
            {t("ctaDirections")}
          </a>
        </div>

        <div
          data-reveal
          className="min-h-[320px] overflow-hidden rounded-xl ring-1 ring-foreground/10"
        >
          <iframe
            src={mapSrc}
            title={t("mapTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[320px] w-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
