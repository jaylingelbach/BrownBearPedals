import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Renders a Collapsible root element with a `data-slot="collapsible"` attribute and forwards all received props.
 *
 * @param props - Props forwarded to the underlying Collapsible root element
 * @returns The rendered Collapsible root React element
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Renders a collapsible trigger element with a `data-slot="collapsible-trigger"` attribute and forwards all received props.
 *
 * @param props - Props to pass through to the underlying trigger element.
 * @returns A React element for the collapsible trigger.
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

/**
 * Renders a wrapper around Radix's CollapsibleContent that forwards all props and sets `data-slot="collapsible-content"`.
 *
 * @returns A React element: Radix `CollapsibleContent` with the `data-slot` attribute and all provided props applied.
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }