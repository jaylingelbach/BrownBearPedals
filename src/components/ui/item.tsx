import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

/**
 * Renders a semantic list container used to group Item components.
 *
 * The element has role="list", data-slot="item-group", and default layout classes that stack children vertically; additional div props and className are applied to the container.
 *
 * @returns A div element with role="list", data-slot="item-group", and base classes for a vertical item group
 */
function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

/**
 * Renders a horizontal separator tailored for item lists.
 *
 * @returns A separator element with `data-slot="item-separator"`, `orientation="horizontal"`, and the provided `className` merged with the default spacing class.
 */
function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Render a composable item container with configurable visual variant and spacing size.
 *
 * @param variant - Visual style variant for the item (e.g., "default", "outline", "muted")
 * @param size - Spacing size for the item (e.g., "default", "sm")
 * @param asChild - If true, render a Radix `Slot` so the item props are forwarded to a child element; otherwise render a `div`
 * @returns The rendered item element with data-slot attributes and computed variant/size classes applied
 */
function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Renders the media area for an Item with selectable visual variants.
 *
 * Used to display an icon, image, or other media inside an Item; applies variant-specific classes and forwards standard div props.
 *
 * @param variant - One of `"default"`, `"icon"`, or `"image"` that controls size and styling of the media area
 * @returns A `div` element configured as the item's media slot with the chosen variant classes applied
 */
function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the content area for an Item with vertical layout and spacing between children.
 *
 * @returns A `div` element with `data-slot="item-content"`, layout classes that arrange children in a vertical column with gap, and any additional `div` props forwarded.
 */
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the title area for an Item, providing compact typography and horizontal layout.
 *
 * @returns A `div` element with `data-slot="item-title"` and classes for a single-line, compact title layout (gap, font weight, and tight leading).
 */
function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a paragraph element styled for item descriptions.
 *
 * The element applies muted text, two-line clamping, compact typography, balanced text wrapping,
 * and built-in link styles (underline and primary color on hover). All additional props are
 * forwarded to the underlying `<p>` element and `className` is merged with the default styles.
 *
 * @returns A `<p>` element with item description styling and forwarded props
 */
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a horizontal container for action controls associated with an item.
 *
 * @returns A `div` element that groups item action controls and applies layout classes (`flex items-center gap-2`).
 */
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/**
 * Renders a header container for an Item, arranging children with space-between alignment.
 *
 * @returns A div element with data-slot="item-header" and layout classes for a flexible header (space-between alignment).
 */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a flexible footer area for an Item, aligning children with space between.
 *
 * Accepts standard div props and merges `className` with internal layout classes.
 *
 * @param className - Additional class names to merge with the footer's base classes
 * @returns The rendered footer element with `data-slot="item-footer"` and layout classes applied
 */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}