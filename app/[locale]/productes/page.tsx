import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { CatalogNav } from "@/components/catalog-nav"
import { CatalogCategorySection } from "@/components/sections/catalog-category-section"
import { catalogCategories } from "@/lib/catalog-data"

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "catalog.meta" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ProductesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "catalog" })

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-8 text-center md:text-left">
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mt-2 font-heading text-5xl tracking-tight md:text-6xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:mx-0">
          {t("intro")}
        </p>

        <div className="mt-8">
          <CatalogNav />
        </div>
      </section>

      {catalogCategories.map((category) => (
        <CatalogCategorySection key={category} category={category} />
      ))}
    </div>
  )
}
