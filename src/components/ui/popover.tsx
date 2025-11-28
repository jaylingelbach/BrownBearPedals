"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * Renders a popover root element and forwards all received props while adding `data-slot="popover"`.
 *
 * @param props - Props forwarded to the underlying popover root element.
 * @returns The popover root element with the provided props applied.
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * Renders a Radix Popover Trigger and attaches a slot attribute for styling.
 *
 * @param props - Props forwarded to the underlying Radix Popover Trigger element
 * @returns The Popover Trigger element with the provided props and a `data-slot="popover-trigger"` attribute
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Renders the popover's content inside a portal with default alignment, offset, and styling.
 *
 * The component applies a composed default className for layout, animation, and visual styling,
 * attaches `data-slot="popover-content"`, and forwards remaining props to the Radix Content primitive.
 *
 * @param className - Additional CSS class names to merge with the component's default classes.
 * @param align - Horizontal alignment of the content relative to the trigger (defaults to `"center"`).
 * @param sideOffset - Distance in pixels between the content and the trigger (defaults to `4`).
 * @returns The rendered popover content element.
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

/**
 * Renders a Radix Popover Anchor and forwards all received props.
 *
 * The rendered element includes a `data-slot="popover-anchor"` attribute.
 *
 * @param props - Props to forward to the underlying Radix Popover Anchor element.
 * @returns The Popover Anchor element with forwarded props.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }