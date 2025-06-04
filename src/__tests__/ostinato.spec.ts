jest.mock('tone', () => ({
  Part: class { clear(){} loop=false; },
  Time: (v:string) => ({ toSeconds: () => 0.5 }),
  Transport: {},
  Frequency: () => ({ toFrequency: () => 440 })
}));

import { Voice } from '../audio/evolution';

const sampler = { triggerAttackRelease: jest.fn() } as any;

test('ostinato length bounds', () => {
  const v = new Voice(sampler, [0, 1], '8n');
  for (let i = 0; i < 20; i++) v.grow();
  expect(v.ost.pattern.length).toBeLessThanOrEqual(8);
  v.cut();
  expect(v.ost.pattern.length).toBe(2);
});
