"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * Wrapper around Radix's TooltipProvider that applies a default `delayDuration` and a `data-slot` attribute.
 *
 * @param delayDuration - Delay in milliseconds before the tooltip appears; defaults to `0`.
 * @returns A React element rendering the tooltip provider with the supplied props.
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * Composes a tooltip root wrapped with the default tooltip provider.
 *
 * Forwards all received props to `TooltipPrimitive.Root` and ensures the root is
 * rendered inside a `TooltipProvider` that applies the default provider behavior.
 *
 * @returns A `TooltipPrimitive.Root` element wrapped in `TooltipProvider`, with all props forwarded.
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

/**
 * Renders a tooltip trigger element.
 *
 * @param props - Props forwarded to the underlying trigger element
 * @returns A trigger element configured to activate the tooltip with the provided props
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * Tooltip content rendered inside a portal with themed styling, positioning, animations, and an attached arrow.
 *
 * @param className - Additional CSS classes merged with the component's default styling.
 * @param sideOffset - Distance in pixels to offset the content from the trigger along the tooltip's side (defaults to 0).
 * @param props - Additional props are forwarded to `TooltipPrimitive.Content`.
 * @returns The `TooltipPrimitive.Content` element wrapped in a `TooltipPrimitive.Portal`, containing children and a styled arrow.
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }