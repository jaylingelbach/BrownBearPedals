import { cn } from "@/lib/utils"

/**
 * Renders a styled keyboard key element.
 *
 * Applies default keyboard-like styling, merges any provided `className`, sets `data-slot="kbd"`, and forwards remaining props to the underlying `<kbd>` element.
 *
 * @param className - Additional CSS class names to merge with the component's default classes
 * @param props - Additional props forwarded to the rendered `<kbd>` element
 * @returns The rendered `<kbd>` element with merged classes and `data-slot="kbd"`
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a grouped keyboard key container.
 *
 * Applies a base "inline-flex items-center gap-1" class and merges any provided `className`,
 * then forwards all other props to the underlying `<kbd>` element which is rendered with `data-slot="kbd-group"`.
 *
 * @param className - Additional classes to merge with the component's base classes
 * @param props - Additional HTML attributes forwarded to the rendered `<kbd>` element
 * @returns The rendered `<kbd>` element representing a grouped keyboard hint with combined classes and forwarded props
 */
function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }