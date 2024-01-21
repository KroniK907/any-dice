<script lang="ts">
  import "~/style.css"

  import { onMount } from "svelte"

  import * as Tabs from "~/lib/components/ui/tabs/index"
  import DiceCard from "~components/dice-card.svelte"
  import type { DiceFamily } from "~interfaces"
  import { log, storage } from "~lib/utils"

  let diceFamilies: { [key: string]: DiceFamily } = {}

  onMount(async () => {
    diceFamilies = await getFamilies()
    log("diceFamilies: ", diceFamilies)
    storage.watch({
      diceFamilies: (c) => {
        diceFamilies = c.newValue
        log("diceFamiliesUpdated:", c.newValue)
      }
    })
  })

  async function getFamilies() {
    let diceFamilies: { [key: string]: DiceFamily } =
      await storage.get("diceFamilies")
    return diceFamilies
  }
</script>

<div class="bg-san-juan-700 w-[400px]">
  <h1 class="text-center font-bold text-slate-200 mb-2 pt-2">Any Dice</h1>
  <Tabs.Root value="dice" class="w-full grid grid-flow-row auto-rows-max">
    <Tabs.List
      class="grid grid-cols-2 bg-san-juan-950 w-5/6 justify-center self-center item-center justify-self-center">
      <Tabs.Trigger value="dice">Select Dice</Tabs.Trigger>
      <Tabs.Trigger value="options">Options</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="dice">
      <div class="grid grid-cols-1 gap-2 bg-san-juan-700 py-4">
        {#each Object.entries(diceFamilies) as [key, diceFamily]}
          <DiceCard {diceFamily} />
        {/each}
      </div>
    </Tabs.Content>
    <Tabs.Content value="options">this is for options</Tabs.Content>
  </Tabs.Root>
</div>
