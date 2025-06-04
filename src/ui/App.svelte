<script lang="ts">
  import { onMount } from 'svelte';
  import { Scheduler } from '../audio/scheduler';
  import { Voice } from '../audio/evolution';
  import { loadInstrument } from '../audio/instruments';
  import * as Tone from 'tone';

  let scheduler: Scheduler;
  let started = false;

  async function init() {
    const vib = await loadInstrument('vibraphone');
    const mar = await loadInstrument('marimba');
    const kal = await loadInstrument('kalimba');
    const bass = await loadInstrument('contrabass');
    const highInst = Math.random() < 0.5 ? await loadInstrument('flute') : await loadInstrument('harp');

    const voices = [
      new Voice(bass, [0,7], '4n'),
      new Voice(vib, [0,4,7,11], '8n'),
      new Voice(mar, [0,2,7,9], '8n'),
      new Voice(highInst, [0,2,4,9,11], '8n'),
    ];
    scheduler = new Scheduler(voices);
  }

  onMount(init);

  function start() {
    Tone.start();
    scheduler.start();
    started = true;
  }
</script>

<main class="p-4 text-center">
  {#if !started}
  <button class="p-4 bg-blue-500 text-white rounded" on:click={start}>Start</button>
  {/if}
</main>
