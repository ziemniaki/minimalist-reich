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
    Transport.bpm.value = 80 + Math.random() * 40;
    Transport.timeSignature = 4;
    this.mutateInterval = 8 + Math.floor(Math.random() * 9); // 8-16
  }

  start() {
    this.voices.forEach(v => v.part.start(0));
    Transport.scheduleRepeat(this.tick.bind(this), '1m');
    Transport.start();
  }

  tick() {
    this.barCount++;
    const root = this.progression.next();
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
