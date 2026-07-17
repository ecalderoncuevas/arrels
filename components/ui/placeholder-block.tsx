import { cn } from "@/lib/utils"
import { placeholderVariants, type PlaceholderVariant } from "@/lib/placeholders"

const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>"

type PlaceholderBlockProps = {
  variant: PlaceholderVariant
  aspect?: "portrait" | "video" | "square"
  className?: string
}

const aspectClass: Record<NonNullable<PlaceholderBlockProps["aspect"]>, string> = {
  portrait: "aspect-[4/5]",
  video: "aspect-video",
  square: "aspect-square",
}

/**
 * Fixed-aspect mood block used until real product photography is
 * available. Each usage site is a single swap point for a real
 * `next/image` later (drop it inside this same wrapper).
 */
export function PlaceholderBlock({
  variant,
  aspect = "portrait",
  className,
}: PlaceholderBlockProps) {
  const { gradient, icon: Icon } = placeholderVariants[variant]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br ring-1 ring-foreground/10",
        gradient,
        aspectClass[aspect],
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          aria-hidden
          strokeWidth={1.25}
          className="size-10 text-foreground/20 md:size-14"
        />
      </div>
    </div>
  )
}
