import { describe, it, expect } from 'vitest';

import { string2DoubleStrucks } from './string2double-struck';

describe('string2DoubleStrucks', () => {
  it('アルファベットがダブルストラック体に変換される', () => {
    const res = string2DoubleStrucks('ABa');

    expect(res.ok).toBe(true);
    if (!res.ok) {
      throw new Error('expected ok result');
    }
    expect(res.value).toBe('\u{1D538}\u{1D539}\u{1D552}');
  });

  it('アルファベット以外が混ざるとエラーになる', () => {
    const res = string2DoubleStrucks('A1');

    expect(res.ok).toBe(false);
    if (res.ok) {
      throw new Error('expected err result');
    }
    expect(res.error.kind).toBe('ArgStringNotAlphabetError');
  });
});
