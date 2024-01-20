<script lang="ts">
  import { Accordion as AccordionPrimitive } from "bits-ui/dist"

  import { cn } from "~/lib/utils"

  type $$Props = AccordionPrimitive.ItemProps

  let className: $$Props["class"] = undefined
  export let value: $$Props["value"]
  export { className as class }
</script>

<AccordionPrimitive.Item
  {value}
  class={cn("border-t", className)}
  {...$$restProps}>
  <slot />
</AccordionPrimitive.Item>
