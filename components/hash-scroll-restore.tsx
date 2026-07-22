"use client"

import * as React from "react"
import { useSmoothScroll } from "@/components/smooth-scroll-provider"

/**
 * When arriving at this page via a link carrying a hash (e.g. navigating
 * from /productes to /#about), smooth-scrolls to that section through Lenis
 * once it's ready, instead of leaving the browser's instant native jump.
 */
export function HashScrollRestore() {
  const { lenis } = useSmoothScroll()

  React.useEffect(() => {
    if (!lenis || !window.location.hash) return
    const raf = requestAnimationFrame(() => {
      lenis.scrollTo(window.location.hash, { offset: -96 })
    })
    return () => cancelAnimationFrame(raf)
  }, [lenis])

  return null
}
