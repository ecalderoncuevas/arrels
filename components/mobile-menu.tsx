"use client"

import { useGSAP } from "@gsap/react"
import { Drawer } from "@base-ui/react/drawer"
import { Menu, X } from "lucide-react"
import { useTranslations } from "next-intl"
import * as React from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useSmoothScroll } from "@/components/smooth-scroll-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { gsap } from "@/lib/gsap"

type NavItem = { id: string; label: string }

export function MobileMenu({ items }: { items: NavItem[] }) {
  const t = useTranslations("nav")
  const { lenis } = useSmoothScroll()
  const [open, setOpen] = React.useState(false)
  const listRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    if (open) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [open, lenis])

  useGSAP(
    () => {
      if (!open || !listRef.current) return
      gsap.from(listRef.current.children, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.06,
        delay: 0.15,
        ease: "power3.out",
      })
    },
    { dependencies: [open], scope: listRef }
  )

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
      <Drawer.Trigger
        aria-label={t("openMenu")}
        className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 md:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Drawer.Viewport className="fixed inset-0 flex justify-end">
          <Drawer.Popup className="flex h-full w-full flex-col bg-background px-6 pt-6 pb-10 text-foreground outline-none transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:translate-x-full data-starting-style:translate-x-full">
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg">Arrels</span>
              <Drawer.Close
                aria-label={t("closeMenu")}
                className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-foreground/5"
              >
                <X className="size-5" aria-hidden />
              </Drawer.Close>
            </div>

            <Drawer.Content className="flex flex-1 flex-col justify-center">
              <ul ref={listRef} className="flex flex-col gap-6">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault()
                        setOpen(false)
                        lenis?.start()
                        lenis?.scrollTo(`#${item.id}`, { offset: -96 })
                      }}
                      className="font-heading text-4xl leading-tight text-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Drawer.Content>

            <div className="flex items-center justify-between pt-6">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
