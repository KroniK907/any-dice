<script lang="ts">
  import type { DiceSet } from "~interfaces"
  import { Button } from "~lib/components/ui/button"
  import * as Select from "~lib/components/ui/select/index"
  import { log, storage } from "~lib/utils"

  export let selectedSet: string = ""
  export let description: string = ""
  export let sets: { [key: string]: DiceSet } = {}

  async function selectSet() {
    log("Set Selected:", selectedSet)
    if (selectedSet) {
      await storage.set("selectedSet", selectedSet)
    }
    reloadCharacterSheets()
  }

  function reloadCharacterSheets() {
    chrome.tabs.query(
      { url: "https://www.dndbeyond.com/characters/*" },
      (tabs) => {
        if (tabs) {
          for (let tab of tabs) {
            chrome.tabs.reload(tab.id)
          }
        }
      }
    )
  }
</script>

<div class="grid grid-flow-row gap-y-4">
  {#if Object.keys(sets).length > 1}
    <Select.Root>
      <Select.Trigger class="w-5/6 justify-self-center">
        <Select.Value value={selectedSet} />
      </Select.Trigger>
      <Select.Content>
        {#each Object.entries(sets) as [setId, diceSet]}
          <Select.Item
            on:click={() => {
              selectedSet = setId
            }}
            value={setId}>{diceSet.name}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  {/if}
  <p>{description}</p>
  <Button
    on:click={selectSet}
    class="bg-san-juan-950 hover:bg-san-juan-700 text-san-juan-100 hover:text-san-juan-950 font-semibold"
    >Select & Reload</Button>
</div>
