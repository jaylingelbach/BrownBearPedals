import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Render a spinning loader SVG icon for indicating a loading state.
 *
 * @returns An SVG loader icon with `role="status"`, `aria-label="Loading"`, and merged CSS classes (includes `"size-4 animate-spin"`).
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }