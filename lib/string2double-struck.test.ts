import { it, expect } from 'vitest';

import { string2DoubleStrucks } from './string2double-struck';

it('アルファベットがダブルストラック体に変換される', () => {
  const res = string2DoubleStrucks('ABa');

  expect(res.ok).toBe(true);
  expect(res.value).toBe('\u{1D538}\u{1D539}\u{1D552}');
});

it('アルファベット以外が混ざるとエラーになる', () => {
  const res = string2DoubleStrucks('A1');

  expect(res.ok).toBe(false);
  expect(res.error.kind).toBe('ArgStringNotAlphabetError');
});
