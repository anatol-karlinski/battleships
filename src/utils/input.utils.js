import { emitKeypressEvents, createInterface } from 'readline';

export const initializeInputStream = () => {
  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  return createInterface(process.stdin, process.stdout);
};
