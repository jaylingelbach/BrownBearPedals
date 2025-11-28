import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a responsive, horizontally-scrollable table container with a styled table.
 *
 * @returns The table element (with `data-slot="table"`) wrapped in a responsive container div.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

/**
 * Renders a table header element with a `data-slot="table-header"` attribute and default row bottom-border styling.
 *
 * @param className - Additional CSS class names to merge with the component's default styling.
 * @returns The rendered `<thead>` element with merged classes and passed-through props.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

/**
 * Renders a table body (`tbody`) element with default styling that removes the bottom border from the last row.
 *
 * @param className - Additional CSS class names to merge with the component's default styles
 * @returns The rendered `tbody` element with applied classes and passed-through props
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

/**
 * Renders a table footer (<tfoot>) element with slot attributes and default footer styling.
 *
 * @param props - Standard `<tfoot>` element props. `className`, if provided, is merged with the component's default footer classes.
 * @returns A `<tfoot>` element with `data-slot="table-footer"` and the merged `className`.
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table row element with a slot attribute and default row styling.
 *
 * @returns A `<tr>` element with `data-slot="table-row"`, default hover, selected-state, border, and transition styles; any additional props are forwarded to the element.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table header cell (<th>) with preset header styling and a `data-slot="table-head"` attribute.
 *
 * Applies alignment, spacing, typography, nowrap behavior, and special layout adjustments for checkbox children.
 *
 * @param className - Additional CSS class names to merge with the component's default classes
 * @returns A `th` element with the merged `className`, `data-slot="table-head"`, and all other passed props
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table cell (<td>) with standardized padding, vertical alignment, and checkbox-aware spacing.
 *
 * @param className - Additional CSS class names to merge with the component's default classes
 * @param props - Other props are spread onto the underlying `<td>` element
 * @returns The rendered `<td>` element with `data-slot="table-cell"` and merged class names
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a table caption with muted foreground styling and top spacing.
 *
 * @param className - Additional class names to merge with the component's default styles
 * @returns The caption element configured for use as a table caption
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}