"use client"

import { useGSAP } from "@gsap/react"
import * as React from "react"
import { gsap } from "@/lib/gsap"

type ScrollRevealOptions = {
  /** Vertical offset (px) the elements travel from. */
  y?: number
  duration?: number
  stagger?: number
  /** ScrollTrigger `start` position. */
  start?: string
  /** If set, animates the matching descendants individually instead of the container as a whole. */
  selector?: string
}

/**
 * Attach the returned ref to a section/container to fade + slide it (or its
 * `selector`-matched children) into view once it scrolls into the viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = React.useRef<T>(null)
  const { y = 32, duration = 0.9, stagger = 0.12, start = "top 85%", selector } = options

  useGSAP(
    () => {
      if (!ref.current) return

      const targets = selector
        ? gsap.utils.toArray<HTMLElement>(selector, ref.current)
        : ref.current

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
        },
      })
    },
    { scope: ref }
  )

  return ref
}
