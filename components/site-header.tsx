"use client"

import { useGSAP } from "@gsap/react"
import type Lenis from "lenis"
import { useTranslations } from "next-intl"
import * as React from "react"
import { CartDrawer } from "@/components/cart-drawer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MobileMenu, type NavItem } from "@/components/mobile-menu"
import { useSmoothScroll } from "@/components/smooth-scroll-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link, usePathname } from "@/i18n/navigation"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"

const SCROLL_THRESHOLD = 24

export function SiteHeader() {
  const t = useTranslations("nav")
  const { lenis } = useSmoothScroll()
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = React.useState(false)
  const navRef = React.useRef<HTMLUListElement>(null)

  const items = React.useMemo<NavItem[]>(
    () => [
      { id: "home", label: t("home") },
      { id: "about", label: t("about") },
      { id: "products", label: t("products"), href: "/productes" },
      { id: "contact", label: t("contact") },
    ],
    [t]
  )

  React.useEffect(() => {
    if (!lenis) return
    const onScroll = (instance: Lenis) =>
      setScrolled(instance.scroll > SCROLL_THRESHOLD)
    lenis.on("scroll", onScroll)
    return () => lenis.off("scroll", onScroll)
  }, [lenis])

  useGSAP(
    () => {
      if (!navRef.current) return
      gsap.from(navRef.current.children, {
        opacity: 0,
        y: -12,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.2,
        ease: "power3.out",
      })
    },
    { scope: navRef }
  )

  const handleNavClick = (id: string) => {
    lenis?.scrollTo(`#${id}`, { offset: -96 })
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        {isHome ? (
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault()
              handleNavClick("home")
            }}
            className="font-heading text-xl tracking-tight text-foreground"
          >
            Arrels
          </a>
        ) : (
          <Link
            href="/"
            className="font-heading text-xl tracking-tight text-foreground"
          >
            Arrels
          </Link>
        )}

        <ul ref={navRef} className="hidden items-center gap-8 md:flex">
          {items.map((item) => {
            const linkClassName =
              "group relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            const underline = (
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            )

            return (
              <li key={item.id}>
                {item.href ? (
                  <Link href={item.href} className={linkClassName}>
                    {item.label}
                    {underline}
                  </Link>
                ) : isHome ? (
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNavClick(item.id)
                    }}
                    className={linkClassName}
                  >
                    {item.label}
                    {underline}
                  </a>
                ) : (
                  <Link href={`/#${item.id}`} className={linkClassName}>
                    {item.label}
                    {underline}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher className="hidden md:flex" />
          <CartDrawer />
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  )
}
