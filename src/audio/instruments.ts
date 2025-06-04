import { Sampler } from 'tone';

export type InstrumentName =
  | 'vibraphone'
  | 'marimba'
  | 'kalimba'
  | 'contrabass'
  | 'flute'
  | 'harp';

/** Load a Tone.js Sampler from the tonejs-instruments CDN. */
export async function loadInstrument(name: InstrumentName): Promise<Sampler> {
  const url =
    `https://cdn.jsdelivr.net/npm/tonejs-instrument-${name}-mp3@1.1.1/dist/index.js`;
  try {
    const mod: any = await import(/* @vite-ignore */ url);
    return new mod.default();
  } catch (err) {
    console.warn(`Failed to load ${name} samples, falling back to synth`);
    return new Sampler();
  }
}
