"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * Render an element that preserves a specified aspect ratio.
 *
 * @param props - Props forwarded to the underlying AspectRatio root component.
 * @returns A React element for an aspect-ratio container.
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }