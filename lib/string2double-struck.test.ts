import assert from 'node:assert/strict';
import test from 'node:test';

import { string2DoubleStrucks } from './string2double-struck';

test('アルファベットがダブルストラック体に変換される', () => {
  const res = string2DoubleStrucks('ABa');

  assert.equal(res.ok, true);
  assert.equal(res.value, '\u{1D538}\u{1D539}\u{1D552}');
});

test('アルファベット以外が混ざるとエラーになる', () => {
  const res = string2DoubleStrucks('A1');

  assert.equal(res.ok, false);
  assert.equal(res.error.kind, 'ArgStringNotAlphabetError');
});
