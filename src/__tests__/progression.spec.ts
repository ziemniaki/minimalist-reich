import { Progression } from '../audio/harmony';

test('no equal consecutive roots', () => {
  const prog = new Progression([0, 7, 2, 9]);
  let last = prog.next();
  for (let i = 0; i < 10; i++) {
    const n = prog.next();
    expect(n).not.toBe(last);
    last = n;
  }
});
