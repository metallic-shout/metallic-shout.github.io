import { err, ok, type IError, type Result } from '../../shared/result-type';

class ArgStringNotAlphabetError implements IError {
  kind = 'ArgStringNotAlphabetError';
  message = 'The arg is not only alphabet.';
}

// double-struck A
const base = 0x1d538;

// valueはUTF-16の二重線文字
// 特殊な数学記号はUnicodeがずれるため、別途Mapを用意
const jumps = {
  2: 'ℂ',
  7: 'ℍ',
  13: 'ℕ',
  15: 'ℙ',
  16: 'ℚ',
  17: 'ℝ',
  25: 'ℤ',
} as Record<number, string | undefined>;

// 大文字小文字合わせての二重線文字取得
const doubleStrucks = Array.from(Array(52).keys()).map(
  (e) => jumps[e] ?? String.fromCodePoint(e + base),
);

const codeUpperA = 0x41;
const codeLowera = 0x61;

const makeCharTransMap = () => {
  // 各通常アルファベットのコードポイント取得
  const base = Array.from(Array(26).keys());
  const codesUpper = base.map((e) => e + codeUpperA);
  const codesLower = base.map((e) => e + codeLowera);
  const codes = [...codesUpper, ...codesLower].map((e) => String.fromCodePoint(e));

  // 各通常アルファベットと二重線アルファベットのペアを作成
  const pairs = codes.map((e, i) => [e, doubleStrucks[i]!] as const);
  return new Map(pairs);
};

const charTransMap = makeCharTransMap();

const string2chars = (target: string) => {
  return target.split('');
};

export const string2DoubleStrucks = (target: string): Result<string, ArgStringNotAlphabetError> => {
  const chars = string2chars(target);
  const isOnlyAlphabet = chars.every((code) => charTransMap.has(code));
  if (!isOnlyAlphabet) return err(new ArgStringNotAlphabetError());
  const trans = chars.map((e) => charTransMap.get(e)!).join('');
  return ok(trans);
};
