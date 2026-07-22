"use client"

import { useTranslations } from "next-intl"
import { useSmoothScroll } from "@/components/smooth-scroll-provider"
import { catalogCategories } from "@/lib/catalog-data"

export function CatalogNav() {
  const t = useTranslations("catalog")
  const { lenis } = useSmoothScroll()

  return (
    <nav
      aria-label={t("categoriesNav")}
      className="flex flex-wrap justify-center gap-3 md:justify-start"
    >
      {catalogCategories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => lenis?.scrollTo(`#${category}`, { offset: -96 })}
          className="rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-primary hover:text-primary"
        >
          {t(`categories.${category}`)}
        </button>
      ))}
    </nav>
  )
}
