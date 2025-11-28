import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Renders the container for an empty-state layout.
 *
 * @param className - Additional CSS classes appended to the component's default classes
 * @returns The rendered div element for the empty state
 */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a centered header container for an empty-state layout.
 *
 * @returns A `div` element used as the empty-state header slot with centered layout and gap spacing.
 */
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Renders the media/icon container for the Empty slot with variantable styling.
 *
 * Adds a `data-slot="empty-icon"` attribute and a `data-variant` attribute matching the selected variant.
 *
 * @param variant - Visual variant for the media container; `"default"` (transparent background) or `"icon"` (muted background, foreground text, rounded and sized for icons). Default is `"default"`.
 * @returns A `div` element used as the empty-state media/icon container.
 */
function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/**
 * Renders the title element for an empty-state layout.
 *
 * @param className - Additional CSS classes to apply to the title container.
 * @param props - Other attributes forwarded to the underlying `div`.
 * @returns A `div` element with `data-slot="empty-title"` and predefined typography classes.
 */
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

/**
 * Renders the description block for an empty state.
 *
 * @returns A paragraph element styled for empty-state descriptions, including muted foreground text and link underline and hover behavior.
 */
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the container for empty-state content.
 *
 * Renders a div with data-slot="empty-content" that composes default layout and typography classes with any provided `className`.
 *
 * @returns A `div` element used as the empty-state content container
 */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}