"use client"

import { Drawer } from "@base-ui/react/drawer"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import * as React from "react"
import { useSmoothScroll } from "@/components/smooth-scroll-provider"
import { PlaceholderBlock } from "@/components/ui/placeholder-block"
import { catalogProducts } from "@/lib/catalog-data"
import { getCartSubtotal, useCartItemCount, useCartStore } from "@/lib/cart-store"

export function CartDrawer() {
  const t = useTranslations("cart")
  const tCatalog = useTranslations("catalog")
  const locale = useLocale()
  const { lenis } = useSmoothScroll()
  const [open, setOpen] = React.useState(false)

  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const itemCount = useCartItemCount()

  React.useEffect(() => {
    if (open) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
  }, [open, lenis])

  const currency = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }),
    [locale]
  )

  const lines = items
    .map((item) => {
      const product = catalogProducts.find((p) => p.id === item.productId)
      return product ? { ...item, product } : null
    })
    .filter((line): line is NonNullable<typeof line> => line !== null)

  const subtotal = getCartSubtotal(items)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
      <Drawer.Trigger
        aria-label={t("openCart")}
        className="relative inline-flex size-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <ShoppingBag className="size-4" aria-hidden />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-accent text-[0.65rem] font-medium text-accent-foreground">
            {itemCount}
          </span>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Drawer.Viewport className="fixed inset-0 flex justify-end">
          <Drawer.Popup className="flex h-full w-full max-w-sm flex-col bg-background px-6 pt-6 pb-8 text-foreground outline-none transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:translate-x-full data-starting-style:translate-x-full">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl">{t("title")}</h2>
              <Drawer.Close
                aria-label={t("close")}
                className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-foreground/5"
              >
                <X className="size-5" aria-hidden />
              </Drawer.Close>
            </div>

            <Drawer.Content className="mt-6 flex flex-1 flex-col overflow-y-auto">
              {lines.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("empty")}</p>
              ) : (
                <ul className="space-y-5">
                  {lines.map((line) => (
                    <li key={line.productId} className="flex gap-3">
                      <div className="size-16 shrink-0">
                        <PlaceholderBlock
                          variant={line.product.variant}
                          aspect="square"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-heading text-sm leading-snug">
                            {tCatalog(`products.${line.productId}.name`)}
                          </p>
                          <button
                            type="button"
                            aria-label={t("remove")}
                            onClick={() => removeItem(line.productId)}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="size-4" aria-hidden />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {currency.format(line.product.price)} /{" "}
                          {line.product.unit === "kg" ? "kg" : tCatalog("units.unit")}
                        </p>
                        <div className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-border/60 px-1.5 py-0.5">
                          <button
                            type="button"
                            aria-label={t("decrease")}
                            onClick={() =>
                              setQuantity(line.productId, line.quantity - 1)
                            }
                            className="inline-flex size-5 items-center justify-center rounded-full text-foreground/70 hover:bg-foreground/5"
                          >
                            <Minus className="size-3" aria-hidden />
                          </button>
                          <span className="min-w-4 text-center text-xs font-medium tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={t("increase")}
                            onClick={() =>
                              setQuantity(line.productId, line.quantity + 1)
                            }
                            className="inline-flex size-5 items-center justify-center rounded-full text-foreground/70 hover:bg-foreground/5"
                          >
                            <Plus className="size-3" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Drawer.Content>

            {lines.length > 0 && (
              <div className="mt-6 space-y-4 border-t border-border/60 pt-4">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{t("subtotal")}</span>
                  <span>{currency.format(subtotal)}</span>
                </div>
                <button
                  type="button"
                  disabled
                  title={t("comingSoon")}
                  className="w-full cursor-not-allowed rounded-full bg-muted px-4 py-2.5 text-sm font-medium text-muted-foreground"
                >
                  {t("checkout")}
                </button>
              </div>
            )}
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
