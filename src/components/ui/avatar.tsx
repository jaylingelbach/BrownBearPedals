import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * Renders a styled avatar root using Radix UI's Avatar primitive.
 *
 * The component applies default sizing, rounding, and overflow styles and sets `data-slot="avatar"`.
 *
 * @param className - Additional class names to merge with the component's default styling.
 * @param props - Additional props forwarded to the underlying Radix `AvatarPrimitive.Root`.
 * @returns The Avatar root element with default styles and any provided props applied.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders an avatar image element that applies default sizing and merges any provided classes.
 *
 * @param className - Additional CSS classes to merge with the component's default `aspect-square size-full` styles
 * @returns The avatar image element with merged `className`, `data-slot="avatar-image"`, and all other props applied
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Renders an avatar fallback element shown when an avatar image is unavailable.
 *
 * @returns The AvatarPrimitive.Fallback element with default sizing, centered content, rounded shape, and any provided `className` and props merged in.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }