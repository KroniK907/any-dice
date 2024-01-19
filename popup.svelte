<script lang="ts">
  import "~/style.css"

  import * as Tabs from "~/lib/components/ui/tabs/index"
</script>

<div>
  <h1 class="text-center font-bold mb-2">Any Dice</h1>
  <Tabs.Root value="dice" class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="dice">Select Dice</Tabs.Trigger>
      <Tabs.Trigger value="options">Options</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="dice">This is for dice</Tabs.Content>
    <Tabs.Content value="options">this is for options</Tabs.Content>
  </Tabs.Root>
</div>
