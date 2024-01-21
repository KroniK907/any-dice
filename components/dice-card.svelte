<script lang="ts">
  import { log } from "console"
  import { onMount } from "svelte"

  import DiceCardDetails from "~components/dice-card-details.svelte"
  import type { DiceFamily, DiceSet } from "~interfaces"
  import * as Accordion from "~lib/components/ui/accordion/index"
  import * as Avatar from "~lib/components/ui/avatar/index"
  import * as Card from "~lib/components/ui/card/index"
  import { storage } from "~lib/utils"

  export let diceFamily: DiceFamily = {
    familyId: "001",
    name: "Basic Black",
    description: "The Original",
    marketplaceUrl: "",
    marketingAvatarUrl: "",
    productBlurb: "",
    sets: {}
  }

  let sets: { [key: string]: DiceSet } = diceFamily.sets
  let selectedSet: string = sets[Object.keys(sets)[0]].setId
  let avatarUrl: string = getAvatar()
  let description: string = diceFamily.description

  $: selectedSet && selectSet(selectedSet)

  function getAvatar(setId: string = null) {
    let sets = diceFamily.sets
    if (setId) {
      return sets[setId].avatarUrl
    }
    for (let [key, set] of Object.entries(sets)) {
      if (set.avatarUrl) {
        return set.avatarUrl
      }
    }
    return null
  }

  function selectSet(setId: string) {
    if (setId) {
      avatarUrl = getAvatar(setId)
    }
  }
</script>

<Card.Root class="rounded-xl mx-4">
  <Card.Content class="grid grid-flow-row auto-rows-max gap-y-2 items-center">
    <div class="flex gap-x-4 items-start">
      <Avatar.Root class="">
        <Avatar.Image src={avatarUrl} />
        <Avatar.Fallback>{diceFamily.familyId}</Avatar.Fallback>
      </Avatar.Root>
      <div class="self-center">
        <h2 class="text-left">{diceFamily.name}</h2>
      </div>
    </div>
    <Accordion.Root class="">
      <Accordion.Item value="details">
        <Accordion.Trigger>Click for more Detail</Accordion.Trigger>
        <Accordion.Content>
          <DiceCardDetails bind:selectedSet {sets} {description} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </Card.Content>
</Card.Root>
