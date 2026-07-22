import { setRequestLocale } from "next-intl/server"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Products } from "@/components/sections/products"
import { HashScrollRestore } from "@/components/hash-scroll-restore"

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HashScrollRestore />
      <Hero />
      <About />
      <Products />
      <Contact />
    </>
  )
}
