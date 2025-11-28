import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Renders a nav element configured as a breadcrumb container.
 *
 * @returns A `nav` element with `aria-label="breadcrumb"` and `data-slot="breadcrumb"`, forwarding any provided props onto the element.
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

/**
 * Render an ordered list that serves as the breadcrumb container.
 *
 * Applies default breadcrumb styling and sets `data-slot="breadcrumb-list"`; any
 * additional `className` is merged with the defaults and remaining props are
 * forwarded to the underlying `<ol>` element.
 *
 * @param className - Optional additional CSS classes to merge with the default styling.
 * @returns The configured `<ol>` element used to group breadcrumb items.
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb list item with the component's slot attribute and default inline-flex styling.
 *
 * @returns A `<li>` element configured as a breadcrumb item (`data-slot="breadcrumb-item"`) with merged `className` and any forwarded `li` props.
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled breadcrumb link as either an anchor element or a provided child component.
 *
 * The component applies breadcrumb link styling and forwards remaining anchor props to the rendered element.
 *
 * @param asChild - If `true`, render the passed child element instead of an `<a>` (enables composition via `Slot`).
 * @returns A JSX element representing the styled breadcrumb link.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

/**
 * Renders the current breadcrumb page as a non-interactive page indicator.
 *
 * @returns A `span` element marked as the current breadcrumb page (`aria-current="page"`) and disabled for interaction (`aria-disabled="true"`). */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

/**
 * Renders a breadcrumb separator as a list item.
 *
 * The element is marked as presentation and hidden from assistive technologies.
 *
 * @param children - Optional custom separator content; defaults to a `ChevronRight` icon when omitted.
 * @param className - Additional class names applied to the list item.
 * @returns A `<li>` element with `role="presentation"` and `aria-hidden="true"` used as the visual separator between breadcrumb items.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/**
 * Renders an ellipsis element used to indicate truncated breadcrumb items.
 *
 * @returns A `span` containing a horizontal-ellipsis icon and a visually hidden "More" label
 */
function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}