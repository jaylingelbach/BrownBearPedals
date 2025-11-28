import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Root wrapper for a dialog that renders Radix UI's Dialog primitive.
 *
 * @returns A DialogPrimitive.Root element with `data-slot="dialog"` and all forwarded props
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Renders the dialog trigger element used to open the dialog.
 *
 * @param props - Props forwarded to Radix UI's Dialog Trigger
 * @returns A trigger element with `data-slot="dialog-trigger"` that forwards all provided props
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Portal container for dialog content.
 *
 * Renders a Radix UI Portal element with a `data-slot="dialog-portal"` attribute and forwards all props.
 *
 * @param props - Props to pass through to the underlying Portal element
 * @returns A React element rendering the dialog portal with the provided props
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Renders a dialog close control that closes the dialog when activated.
 *
 * @param props - Props forwarded to the underlying Radix `DialogPrimitive.Close` element
 * @returns A React element rendering the dialog close control with `data-slot="dialog-close"` and all forwarded props
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Renders the dialog backdrop overlay with built-in open/close animations and a translucent black background.
 *
 * @param className - Additional CSS classes to merge with the component's default classes
 * @returns A JSX element that renders the dialog overlay/backdrop
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders dialog content inside a portal with an overlay and optional close button.
 *
 * The component mounts a portal containing the overlay and a positioned content container
 * that forwards props and children to Radix's DialogPrimitive.Content.
 *
 * @param showCloseButton - If `true`, renders a positioned close button inside the content (default: `true`).
 * @returns The dialog content element including its portal and overlay.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * Header container for dialog content that applies vertical spacing and responsive text alignment.
 *
 * @param className - Additional CSS class names appended to the header's default classes
 * @returns A `div` element with `data-slot="dialog-header"`, default layout classes, and any provided `className` applied
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Footer container for dialog actions that provides responsive layout and spacing.
 *
 * @param className - Additional CSS classes merged with the component's default layout and spacing classes.
 * @param props - Additional props forwarded to the underlying `div`.
 * @returns The rendered footer `div` with `data-slot="dialog-footer"`.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Title element for dialog content.
 *
 * Renders a dialog title element with heading typography and forwards all props to the underlying primitive.
 *
 * @returns A React element rendering the dialog title with applied styles and forwarded props.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the dialog's descriptive text element with standardized styling and a data-slot attribute.
 *
 * @param className - Additional CSS class names to merge with the component's default description styles
 * @returns The dialog description element with merged styling and `data-slot="dialog-description"`
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}