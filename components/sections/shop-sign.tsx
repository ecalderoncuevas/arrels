"use client"

import { useGSAP } from "@gsap/react"
import { Apple, Citrus, Leaf } from "lucide-react"
import * as React from "react"
import { gsap } from "@/lib/gsap"

const PLAQUE_BG = "#131210"
const PLAQUE_FG = "#f3efe4"

/**
 * Decorative nod to the shop's real storefront sign: a dark plaque with the
 * script wordmark and a scalloped awning strip, echoing the physical facade
 * regardless of the site's light/dark theme.
 */
export function ShopSign() {
  const wrapRef = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.5 })
      tl.from(".shop-sign-plaque", {
        opacity: 0,
        y: 28,
        rotate: -3,
        duration: 1,
        ease: "back.out(1.6)",
      }).to(
        ".shop-sign-plaque",
        {
          rotate: 1.5,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        "-=0.15"
      )

      gsap.to(".shop-sign-fruit", {
        y: -8,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
      })
    },
    { scope: wrapRef }
  )

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-60 md:mx-0">
      <div
        className="shop-sign-plaque relative overflow-hidden rounded-2xl shadow-xl"
        style={{ backgroundColor: PLAQUE_BG, transformOrigin: "50% 0%" }}
      >
        <div aria-hidden className="h-5 bg-accent" />
        <div
          aria-hidden
          className="h-3 bg-accent"
          style={{
            backgroundImage: `radial-gradient(circle at 10px 0, ${PLAQUE_BG} 9px, transparent 9.5px)`,
            backgroundSize: "20px 12px",
            backgroundRepeat: "repeat-x",
          }}
        />
        <div className="px-8 pt-6 pb-10 text-center">
          <p
            className="font-script text-5xl leading-none"
            style={{ color: PLAQUE_FG }}
          >
            Arrels
          </p>
          <p
            className="mt-4 text-[0.65rem] font-medium tracking-[0.35em] uppercase"
            style={{ color: PLAQUE_FG, opacity: 0.7 }}
          >
            Fruita i Verdura
          </p>
        </div>
      </div>

      <Citrus
        aria-hidden
        className="shop-sign-fruit absolute -top-5 -left-6 size-9 text-accent drop-shadow-sm"
      />
      <Leaf
        aria-hidden
        className="shop-sign-fruit absolute top-10 -right-6 size-7 text-primary drop-shadow-sm"
      />
      <Apple
        aria-hidden
        className="shop-sign-fruit absolute -bottom-6 left-10 size-8 text-accent drop-shadow-sm"
      />
    </div>
  )
}
