import type { PlaceholderVariant } from "@/lib/placeholders"

export type ProductCategory = "fruit" | "vegetable" | "pantry"
export type PriceUnit = "kg" | "unit"

export type CatalogProduct = {
  id: string
  category: ProductCategory
  variant: PlaceholderVariant
  price: number
  unit: PriceUnit
}

export const catalogCategories: ProductCategory[] = [
  "fruit",
  "vegetable",
  "pantry",
]

/**
 * Prices/units/categories are locale-independent and live here; the
 * translatable name/description for each id live in messages/*.json under
 * "catalog.products.<id>".
 */
export const catalogProducts: CatalogProduct[] = [
  // Fruita
  { id: "peach-calanda", category: "fruit", variant: "earth", price: 4.5, unit: "kg" },
  { id: "orange-vera", category: "fruit", variant: "citrus", price: 2.1, unit: "kg" },
  { id: "muscat-grape", category: "fruit", variant: "forest", price: 5.4, unit: "kg" },
  { id: "strawberry", category: "fruit", variant: "citrus", price: 4.9, unit: "kg" },
  { id: "apple-golden", category: "fruit", variant: "leaf", price: 2.6, unit: "kg" },
  { id: "pear-conference", category: "fruit", variant: "earth", price: 2.8, unit: "kg" },

  // Verdura
  { id: "tomato-montserrat", category: "vegetable", variant: "citrus", price: 3.2, unit: "kg" },
  { id: "artichoke-prat", category: "vegetable", variant: "leaf", price: 3.8, unit: "kg" },
  { id: "beetroot", category: "vegetable", variant: "forest", price: 2.3, unit: "kg" },
  { id: "potato", category: "vegetable", variant: "earth", price: 1.6, unit: "kg" },
  { id: "onion", category: "vegetable", variant: "earth", price: 1.4, unit: "kg" },
  { id: "pepper", category: "vegetable", variant: "citrus", price: 3.1, unit: "kg" },

  // Complements
  { id: "orange-jam", category: "pantry", variant: "citrus", price: 4.2, unit: "unit" },
  { id: "fig-jam", category: "pantry", variant: "earth", price: 4.5, unit: "unit" },
  { id: "almond-cookies", category: "pantry", variant: "earth", price: 3.6, unit: "unit" },
  { id: "olive-oil", category: "pantry", variant: "forest", price: 8.9, unit: "unit" },
  { id: "honey", category: "pantry", variant: "leaf", price: 6.2, unit: "unit" },
  { id: "dried-fruit-mix", category: "pantry", variant: "forest", price: 5.3, unit: "unit" },
]
