import { it, expect } from 'vitest';

import { makeShout } from './make-shout';

it('makeShoutは3行の装飾付き文字列を返す', () => {
  const label = 'PUNCH';
  const result = makeShout(label, label.length);
  const [top, middle, bottom] = result.split('\n') as [string, string, string];

  expect(typeof top).toBe('string');
  expect(typeof middle).toBe('string');
  expect(typeof bottom).toBe('string');
});

it('makeShoutの中央行はラベルを含み**で囲まれる', () => {
  const label = 'POWER';
  const result = makeShout(label, label.length);
  const lines = result.split('\n') as [string, string, string];

  expect(lines.length).toBe(3);
  expect(lines[1].startsWith('**')).toBe(true);
  expect(lines[1].endsWith('**')).toBe(true);
  expect(lines[1].includes(label)).toBe(true);
});

it('makeShoutの上下行は装飾記号で囲まれる', () => {
  const label = 'HIT';
  const result = makeShout(label, label.length);
  const [top, , bottom] = result.split('\n') as [string, string, string];

  expect(top.startsWith('◤')).toBe(true);
  expect(top.endsWith('◥')).toBe(true);
  expect(bottom.startsWith('◣')).toBe(true);
  expect(bottom.endsWith('◢')).toBe(true);
});
