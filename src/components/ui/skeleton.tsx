import { cn } from "@/lib/utils"

/**
 * Renders a skeleton placeholder element for loading states.
 *
 * @param className - Additional CSS classes appended to the base skeleton styles.
 * @param props - Additional props spread onto the root div.
 * @returns A div element with base skeleton styles and a `data-slot="skeleton"` attribute.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }