<script>
  import DiceCardDetails from "~components/dice-card-details.svelte"
  import * as Accordion from "~lib/components/ui/accordion/index"
  import * as Avatar from "~lib/components/ui/avatar/index"
  import * as Card from "~lib/components/ui/card/index"
</script>

<Card.Root class="rounded-xl mx-4">
  <Card.Content class="grid grid-flow-row auto-rows-max gap-y-2 items-center">
    <div class="flex gap-x-4 items-start">
      <Avatar.Root class="">
        <Avatar.Image
          src="https://images.dndbeyond.com/dice/images/avatars/clockwork.png" />
        <Avatar.Fallback>034</Avatar.Fallback>
      </Avatar.Root>
      <div class="self-center">
        <h2 class="text-left">Clockwork Dice Set</h2>
      </div>
    </div>
    <Accordion.Root class="">
      <Accordion.Item value="details">
        <Accordion.Trigger>Click for more Detail</Accordion.Trigger>
        <Accordion.Content>
          <DiceCardDetails />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  </Card.Content>
</Card.Root>
