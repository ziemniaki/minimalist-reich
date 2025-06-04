/** Generate chord roots using a random walk on the circle of fifths. */
export class Progression {
  private lastRoot = 0;
  constructor(private pool: number[]) {}

  next(): number {
    let step = 0;
    while (step === 0) step = (Math.floor(Math.random() * 3) + 1) * (Math.random() < 0.5 ? -1 : 1);
    const idx = (this.pool.indexOf(this.lastRoot) + step + this.pool.length) % this.pool.length;
    const root = this.pool[idx];
    if (root === this.lastRoot) return this.next();
    this.lastRoot = root;
    return root;
  }
}
