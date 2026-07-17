"use client"

import { useTranslations } from "next-intl"
import { PlaceholderBlock } from "@/components/ui/placeholder-block"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import type { PlaceholderVariant } from "@/lib/placeholders"

type ProductItem = {
  name: string
  description: string
  variant: PlaceholderVariant
}

export function Products() {
  const t = useTranslations("products")
  const ref = useScrollReveal<HTMLDivElement>({ selector: "[data-reveal-card]" })
  const items = t.raw("items") as ProductItem[]

  return (
    <section id="products" className="bg-secondary/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="font-heading text-4xl leading-tight tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("intro")}</p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <div key={item.name} data-reveal-card className="space-y-4">
              <PlaceholderBlock variant={item.variant} aspect="portrait" />
              <div>
                <h3 className="font-heading text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
