"use client"

import { Minus, Plus, ShoppingBag } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCartQuantity, useCartStore } from "@/lib/cart-store"

export function AddToCartButton({ productId }: { productId: string }) {
  const t = useTranslations("cart")
  const quantity = useCartQuantity(productId)
  const addItem = useCartStore((state) => state.addItem)
  const setQuantity = useCartStore((state) => state.setQuantity)

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem(productId, 1)}
        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
      >
        <ShoppingBag className="size-4" aria-hidden />
        {t("add")}
      </button>
    )
  }

  return (
    <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-border/60 px-2 py-1">
      <button
        type="button"
        aria-label={t("decrease")}
        onClick={() => setQuantity(productId, quantity - 1)}
        className="inline-flex size-6 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span className="min-w-6 text-center text-sm font-medium tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        aria-label={t("increase")}
        onClick={() => setQuantity(productId, quantity + 1)}
        className="inline-flex size-6 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  )
}
