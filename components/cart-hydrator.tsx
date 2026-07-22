"use client"

import * as React from "react"
import { useCartStore } from "@/lib/cart-store"

/**
 * Triggers the persisted cart's rehydration once on mount. The store uses
 * `skipHydration: true` precisely so this runs client-side only, keeping the
 * very first client render identical to the server's (empty-cart) output.
 */
export function CartHydrator() {
  React.useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  return null
}
