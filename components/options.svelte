<script lang="ts">
  import { Label } from "~lib/components/ui/label"
  import { Slider } from "~lib/components/ui/slider"
  import { Switch } from "~lib/components/ui/switch"
</script>

<div
  class="grid grid-flow-row auto-rows-max gap-6 bg-san-juan-700 py-4 items-center">
  <div class="flex gap-4 justify-self-center self-center">
    <Label for="disable">Disable Any Dice</Label>
    <Switch id="disable" />
  </div>
  <div class="flex gap-4 justify-self-center self-center">
    <Label for="vibration">Vibration</Label>
    <Switch id="vibration" />
  </div>
  <div class="flex gap-4 justify-self-center self-center">
    <Label for="particles">Particles</Label>
    <Switch id="particles" />
  </div>
  <div class="flex gap-4 justify-self-center self-center">
    <Label for="animation">Animation Quality</Label>
    <Slider value={[3]} max={5} step={1} id="animation" />
  </div>
  <div class="flex gap-4 justify-self-center self-center">
    <Label for="shadow">Shadow Quality</Label>
    <Slider value={[3]} max={5} step={1} id="shadow" />
  </div>
</div>
