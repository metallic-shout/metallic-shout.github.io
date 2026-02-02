import assert from 'node:assert/strict';
import test from 'node:test';

import { makeShout } from './make-shout';

test('makeShoutは3行の装飾付き文字列を返す', () => {
  const label = 'PUNCH';
  const result = makeShout(label, label.length);
  const [top, middle, bottom] = result.split('\n') as [string, string, string];

  assert.equal(typeof top, 'string');
  assert.equal(typeof middle, 'string');
  assert.equal(typeof bottom, 'string');
});

test('makeShoutの中央行はラベルを含み**で囲まれる', () => {
  const label = 'POWER';
  const result = makeShout(label, label.length);
  const lines = result.split('\n') as [string, string, string];

  assert.equal(lines.length, 3);
  assert.equal(lines[1].startsWith('**'), true);
  assert.equal(lines[1].endsWith('**'), true);
  assert.equal(lines[1].includes(label), true);
});

test('makeShoutの上下行は装飾記号で囲まれる', () => {
  const label = 'HIT';
  const result = makeShout(label, label.length);
  const [top, , bottom] = result.split('\n') as [string, string, string];

  assert.equal(top.startsWith('◤'), true);
  assert.equal(top.endsWith('◥'), true);
  assert.equal(bottom.startsWith('◣'), true);
  assert.equal(bottom.endsWith('◢'), true);
});
