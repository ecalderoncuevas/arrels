"use client"

import { useTranslations } from "next-intl"
import { PlaceholderBlock } from "@/components/ui/placeholder-block"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const VALUE_KEYS = ["proximity", "freshness", "roots"] as const

export function About() {
  const t = useTranslations("about")
  const introRef = useScrollReveal<HTMLDivElement>({ selector: "[data-reveal]" })
  const valuesRef = useScrollReveal<HTMLDivElement>({
    selector: "[data-reveal-card]",
  })
  const paragraphs = t.raw("paragraphs") as string[]

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div ref={introRef} className="grid gap-12 md:grid-cols-2 md:items-center">
        <div data-reveal className="space-y-6">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="font-heading text-4xl leading-tight tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("lead")}</p>
          <div className="space-y-4 text-foreground/80">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div data-reveal>
          <PlaceholderBlock variant="leaf" aspect="portrait" />
        </div>
      </div>

      <div ref={valuesRef} className="mt-16 grid gap-6 sm:grid-cols-3">
        {VALUE_KEYS.map((key) => (
          <div
            key={key}
            data-reveal-card
            className="space-y-2 rounded-xl border border-border/60 p-6"
          >
            <h3 className="font-heading text-xl">{t(`values.${key}.title`)}</h3>
            <p className="text-sm text-muted-foreground">
              {t(`values.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
