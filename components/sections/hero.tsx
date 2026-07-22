"use client"

import { useGSAP } from "@gsap/react"
import { ArrowDown } from "lucide-react"
import { useTranslations } from "next-intl"
import * as React from "react"
import { useSmoothScroll } from "@/components/smooth-scroll-provider"
import { ShopSign } from "@/components/sections/shop-sign"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { gsap, SplitText } from "@/lib/gsap"
import { cn } from "@/lib/utils"

export function Hero() {
  const t = useTranslations("hero")
  const { lenis } = useSmoothScroll()
  const titleRef = React.useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!titleRef.current) return
      const split = new SplitText(titleRef.current, { type: "chars" })
      gsap.from(split.chars, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
        delay: 0.2,
      })
      return () => split.revert()
    },
    { scope: titleRef }
  )

  return (
    <section
      id="home"
      className="mx-auto grid min-h-screen max-w-5xl items-center gap-12 px-6 pt-32 pb-24 md:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="flex flex-col gap-6">
        <Badge className="w-fit bg-accent text-accent-foreground hover:bg-accent">
          {t("badge")}
        </Badge>

        <h1
          ref={titleRef}
          className="font-heading text-6xl leading-[1.05] tracking-tight md:text-8xl"
        >
          {t("title")}
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
          {t("subtitle")}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/productes" className={cn(buttonVariants({ size: "lg" }))}>
            {t("ctaPrimary")}
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => lenis?.scrollTo("#about", { offset: -96 })}
          >
            {t("ctaSecondary")}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => lenis?.scrollTo("#about", { offset: -96 })}
          className="mt-12 flex animate-bounce items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("scrollCue")}
          <ArrowDown className="size-4" aria-hidden />
        </button>
      </div>

      <div className="flex justify-center md:justify-end">
        <ShopSign />
      </div>
    </section>
  )
}
