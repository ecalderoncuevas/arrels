import type { Metadata } from "next"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Fraunces, Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { routing } from "@/i18n/routing"
import "../globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "footer" })

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <NextIntlClientProvider>
          <SmoothScrollProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border/60 px-6 py-10 text-sm text-muted-foreground">
              <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
                <p>{t("tagline")}</p>
                <p>
                  © {new Date().getFullYear()} Arrels Fruita i Verdura —{" "}
                  {t("rights")}
                </p>
              </div>
            </footer>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
