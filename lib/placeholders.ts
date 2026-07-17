import { Citrus, Leaf, Sprout, TreePine } from "lucide-react"

/**
 * Tasteful CSS-only mood/placeholder variants for spots where real
 * photography isn't available yet. Built only from the existing brand
 * theme tokens (@/app/globals.css) so no new colors are introduced.
 * Swap for a real `next/image` inside the same aspect-ratio wrapper later.
 */
export const placeholderVariants = {
  citrus: {
    gradient: "from-accent/25 via-secondary to-background",
    icon: Citrus,
  },
  leaf: {
    gradient: "from-primary/25 via-secondary to-background",
    icon: Leaf,
  },
  earth: {
    gradient: "from-chart-3/25 via-secondary to-background",
    icon: Sprout,
  },
  forest: {
    gradient: "from-foreground/15 via-secondary to-background",
    icon: TreePine,
  },
} as const

export type PlaceholderVariant = keyof typeof placeholderVariants
