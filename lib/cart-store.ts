import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { catalogProducts } from "@/lib/catalog-data"

export type CartItem = { productId: string; quantity: number }

type CartState = {
  items: CartItem[]
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === productId
          )
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return { items: [...state.items, { productId, quantity }] }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) =>
                  item.productId === productId ? { ...item, quantity } : item
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "arrels-cart",
      storage: createJSONStorage(() => localStorage),
      // Rehydration is triggered manually (see CartHydrator) so the first
      // client render matches the server's empty-cart output.
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

/** Total number of units across the cart, 0 until the persisted cart has loaded. */
export function useCartItemCount() {
  return useCartStore((state) =>
    state.hasHydrated
      ? state.items.reduce((sum, item) => sum + item.quantity, 0)
      : 0
  )
}

/** Quantity currently in the cart for a given product id. */
export function useCartQuantity(productId: string) {
  return useCartStore((state) => {
    if (!state.hasHydrated) return 0
    return state.items.find((item) => item.productId === productId)?.quantity ?? 0
  })
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const product = catalogProducts.find((p) => p.id === item.productId)
    return product ? sum + product.price * item.quantity : sum
  }, 0)
}
