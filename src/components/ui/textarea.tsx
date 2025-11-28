import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Render a styled HTML textarea that applies the component's base UI classes, sets `data-slot="textarea"`, and forwards all provided textarea props.
 *
 * @param className - Additional CSS class names that will be merged with the component's default classes.
 * @param props - All other standard textarea attributes and event handlers which are passed through to the underlying element.
 * @returns The rendered textarea element with base styling, the `data-slot="textarea"` attribute, and any supplied props applied.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }