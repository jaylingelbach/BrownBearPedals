"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

/**
 * Render a styled label element with built-in layout and disabled-state styling.
 *
 * Applies default class names for layout, spacing, typography, and disabled appearance,
 * and forwards any additional props to the rendered label element.
 *
 * @param className - Optional additional class names to merge with the default styles
 * @param props - Additional props forwarded to the label element
 * @returns A React element representing the styled label
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }