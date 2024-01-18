<script lang="ts">
    import { Storage } from '@plasmohq/storage';

    const storage = new Storage({area: 'local'});

    async function blackSet() {
        await storage.set('selectedSet', 'diceSet-00101');
    }
    async function glacialSet() {
        await storage.set('selectedSet', 'diceSet-00701')
    }
</script>

<style>
    .container {
        min-width: 470px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 47px;
    }
    .action {
        color: #470;
        font-weight: bold;
    }
    .text-center {
        text-align: center;
    }
</style>

<div>
    <h2 class="text-center">
      Welcome to your <a href="https://www.plasmo.com" target="_blank">Plasmo</a> Extension!
    </h2>
    <div class="container">
        <button on:click={blackSet}>Black Dice</button>
        <button on:click={glacialSet}>Glacial Dice</button>
    </div>
</div>
