jest.mock('tone', () => ({
  Transport: {
    state: 'stopped',
    start() { this.state = 'started'; },
    stop() { this.state = 'stopped'; }
  }
}));

import { Transport } from 'tone';

test('starts and stops transport', () => {
  Transport.start();
  expect(Transport.state).toBe('started');
  Transport.stop();
  expect(Transport.state).toBe('stopped');
});
