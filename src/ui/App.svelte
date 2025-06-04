<script lang="ts">
  import { onMount } from 'svelte';
  import { Scheduler } from '../audio/scheduler';
  import { Voice } from '../audio/evolution';
  import { loadInstrument } from '../audio/instruments';
  import type { InstrumentName } from '../audio/instruments';
  import * as Tone from 'tone';

  let scheduler: Scheduler | null = null;
  let started = false;
  let ready = false;
  let voices: Voice[] = [];

  async function init() {
    const vib = await loadInstrument('vibraphone');
    const mar = await loadInstrument('marimba');
    const bass = await loadInstrument('contrabass');
    const choices: InstrumentName[] = ['kalimba', 'flute', 'harp'];
    const highInst = await loadInstrument(choices[Math.floor(Math.random() * choices.length)]);

    voices = [
      new Voice(bass, [0, 7], '4n'),
      new Voice(vib, [0, 4, 7, 11], '8n'),
      new Voice(mar, [0, 2, 7, 9], '8n'),
      new Voice(highInst, [0, 2, 4, 9, 11], '8n')
    ];
    scheduler = new Scheduler(voices);
    ready = true;
  }

  onMount(init);

  function start() {
    if (!scheduler) return;
    Tone.start().then(() => {
      scheduler!.start();
      started = true;
    });
  }

  function grow(i: number) {
    voices[i].grow();
    voices = [...voices];
  }

  function cut(i: number) {
    voices[i].cut();
    voices = [...voices];
  }
</script>

<main class="p-4 text-center">
  {#if !ready}
    <p>Loading…</p>
  {:else if !started}
    <button class="p-4 bg-blue-500 text-white rounded" on:click={start}>Start</button>
  {:else}
    <div class="grid grid-cols-2 gap-4">
      {#each ['Bass','Mid1','Mid2','High'] as label, i}
        <div class="flex flex-col items-center">
          <svg width="120" height="120" class="cursor-pointer">
            <circle cx="60" cy="60" r="{20 + voices[i].ost.pattern.length * 10}" fill="#8bc34a" on:click={() => grow(i)} on:dblclick={() => cut(i)} />
            <text x="60" y="60" text-anchor="middle" dy=".3em" fill="white">{label}</text>
          </svg>
        </div>
      {/each}
    </div>
  {/if}
</main>
