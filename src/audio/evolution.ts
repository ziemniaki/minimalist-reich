import { Part, Time, Transport, Frequency } from 'tone';

export interface Ostinato {
  pattern: number[];
  dur: string; // e.g. '8n'
  mutateRate: number;
  density: number;
}

export class Voice {
  part: Part;
  seed: number[];
  ost: Ostinato;

  constructor(public sampler: any, seed: number[], dur: string) {
    this.seed = [...seed];
    this.ost = { pattern: [...seed], dur, mutateRate: 0.2, density: 1 };
    this.part = new Part();
    this.part.loop = true;
  }

  /** Reschedule Tone.Part events based on current ostinato pattern. */
  reschedule(root: number) {
    this.part.clear();
    this.part.callback = (time) => {
      this.ost.pattern.forEach((st, i) => {
        if (Math.random() < this.ost.density) {
          const note = Frequency(root + st, "midi").toFrequency();
          this.sampler.triggerAttackRelease(note, this.ost.dur, time + Time(this.ost.dur).toSeconds() * i);
        }
      });
    };
    const totalDur = Time(this.ost.dur).toSeconds() * this.ost.pattern.length;
    this.part.loopEnd = totalDur;
  }

  mutate() {
    if (Math.random() < this.ost.mutateRate) {
      const idx = Math.floor(Math.random() * this.ost.pattern.length);
      const amt = Math.random() < 0.5 ? -1 : 1;
      this.ost.pattern[idx] += amt;
    }
  }

  grow() {
    if (this.ost.pattern.length < 8) {
      const step = this.seed[this.ost.pattern.length % this.seed.length];
      this.ost.pattern.push(step);
    }
  }

  cut() {
    this.ost.pattern = [...this.seed];
  }
}

/** Start all parts on the Transport. */
export function start(voices: Voice[]) {
  voices.forEach(v => v.part.start(0));
  Transport.start();
}

/** Stop the transport and clear parts. */
export function stop(voices: Voice[]) {
  Transport.stop();
  voices.forEach(v => v.part.stop());
}
