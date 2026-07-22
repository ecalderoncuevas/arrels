"use client"

import { useLocale, useTranslations } from "next-intl"
import * as React from "react"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { PlaceholderBlock } from "@/components/ui/placeholder-block"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { catalogProducts, type ProductCategory } from "@/lib/catalog-data"

export function CatalogCategorySection({
  category,
}: {
  category: ProductCategory
}) {
  const t = useTranslations("catalog")
  const locale = useLocale()
  const ref = useScrollReveal<HTMLDivElement>({ selector: "[data-reveal-card]" })
  const items = catalogProducts.filter((product) => product.category === category)

  const currency = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }),
    [locale]
  )

  return (
    <section id={category} className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
        {t(`categories.${category}`)}
      </h2>

      <div
        ref={ref}
        className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <div key={item.id} data-reveal-card className="space-y-4">
            <PlaceholderBlock variant={item.variant} aspect="portrait" />
            <div>
              <h3 className="font-heading text-lg">
                {t(`products.${item.id}.name`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`products.${item.id}.description`)}
              </p>
              <p className="mt-2 text-sm font-medium text-primary">
                {currency.format(item.price)} /{" "}
                {item.unit === "kg" ? "kg" : t("units.unit")}
              </p>
              <AddToCartButton productId={item.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
