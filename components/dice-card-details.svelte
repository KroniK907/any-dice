<script lang="ts">
  import { Button } from "~lib/components/ui/button"
  import * as Select from "~lib/components/ui/select/index"
</script>

<div class="grid grid-flow-row gap-y-4">
  <Select.Root>
    <Select.Trigger class="w-5/6 justify-self-center">
      <Select.Value placeholder="Select a Style" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="set-1">Set 1</Select.Item>
      <Select.Item value="set-2">Set 2</Select.Item>
    </Select.Content>
  </Select.Root>
  <p>
    The description for the selected set goes here. It might be a fairly long
    set of sentences so I'm going to add more text than I think is necessary
    here
  </p>
  <Button
    class="bg-san-juan-950 hover:bg-san-juan-700 text-san-juan-100 hover:text-san-juan-950 font-semibold"
    >Select & Reload</Button>
</div>
