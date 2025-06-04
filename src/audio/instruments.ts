import { Sampler, Synth } from 'tone';

export type InstrumentName =
  | 'vibraphone'
  | 'marimba'
  | 'kalimba'
  | 'contrabass'
  | 'flute'
  | 'harp';

const BASE_URL =
  'https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments@master/samples/';

const MAPS: Record<string, Record<string, string>> = {
  contrabass: {
    'C2': 'C2.mp3',
    'D2': 'D2.mp3',
    'E2': 'E2.mp3',
    'G1': 'G1.mp3',
    'A2': 'A2.mp3'
  },
  flute: {
    'C4': 'C4.mp3',
    'E4': 'E4.mp3',
    'A4': 'A4.mp3',
    'C5': 'C5.mp3',
    'E5': 'E5.mp3',
    'A5': 'A5.mp3'
  },
  harp: {
    'C3': 'C3.mp3',
    'E3': 'E3.mp3',
    'G3': 'G3.mp3',
    'A4': 'A4.mp3',
    'C5': 'C5.mp3',
    'E5': 'E5.mp3'
  },
  xylophone: {
    'C5': 'C5.mp3',
    'G5': 'G5.mp3',
    'C6': 'C6.mp3',
    'G6': 'G6.mp3',
    'C7': 'C7.mp3',
    'C8': 'C8.mp3'
  }
};

function resolveName(name: InstrumentName): string {
  return MAPS[name] ? name : 'xylophone';
}

/** Load a Tone.js Sampler from the CDN or fall back to a simple Synth. */
export async function loadInstrument(name: InstrumentName) {
  const key = resolveName(name);
  const mapping = MAPS[key];
  try {
    const sampler = new Sampler(mapping, {
      baseUrl: `${BASE_URL}${key}/`
    }).toDestination();
    await sampler.loaded;
    return sampler;
  } catch (err) {
    console.warn(`Failed to load ${name}, using synth`, err);
    return new Synth().toDestination();
  }
}
