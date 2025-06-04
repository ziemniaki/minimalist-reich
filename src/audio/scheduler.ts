import { Transport } from 'tone';
import { Progression } from './harmony';
import { Voice } from './evolution';

export class Scheduler {
  progression: Progression;
  barCount = 0;
  mutateInterval = 8;

  constructor(public voices: Voice[]) {
    const circle = [0, 7, 2, 9];
    this.progression = new Progression(circle);
  }

  start() {
    this.voices.forEach(v => v.part.start(0));
    Transport.scheduleRepeat(this.tick.bind(this), '1m');
    Transport.start();
  }

  tick() {
    this.barCount++;
    const root = this.progression.next() + 60; // C4
    this.voices.forEach(v => v.reschedule(root));
    if (this.barCount % this.mutateInterval === 0) {
      this.voices.forEach(v => v.mutate());
    }
  }

  stop() {
    Transport.cancel();
    Transport.stop();
  }
}
