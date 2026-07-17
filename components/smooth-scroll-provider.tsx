"use client"

import Lenis from "lenis"
import * as React from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

type SmoothScrollContextValue = {
  lenis: Lenis | null
}

const SmoothScrollContext = React.createContext<SmoothScrollContextValue>({
  lenis: null,
})

export function useSmoothScroll() {
  return React.useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null)

  React.useEffect(() => {
    const instance = new Lenis({ autoRaf: false })
    // Lenis touches window/document, so it can only be constructed in an
    // effect. It's stored in state (not a ref) so that consumers depending
    // on `lenis` (e.g. the header's scroll subscription) re-run once it
    // exists — child effects fire before this provider's, so the instance
    // isn't available yet on their first pass.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance)

    const onScroll = () => ScrollTrigger.update()
    instance.on("scroll", onScroll)

    const raf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      instance.off("scroll", onScroll)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
