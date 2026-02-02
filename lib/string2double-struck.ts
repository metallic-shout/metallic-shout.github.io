import { err, ok, type IError, type Result } from '../shared/result-type';

/**
 * 入力にアルファベット以外が含まれている場合に返すエラー。
 */
class ArgStringNotAlphabetError implements IError {
  kind = 'ArgStringNotAlphabetError';
  message = 'The arg is not only alphabet.';
}

/**
 * ダブルストラック体 "A" の Unicode code point。
 */
const base = 0x1d538;

/**
 * Unicode で連続しない位置を補正するための上書き表。
 * インデックスは A-Z の 0 始まり。
 */
const jumps = {
  2: 'ℂ',
  7: 'ℍ',
  13: 'ℕ',
  15: 'ℙ',
  16: 'ℚ',
  17: 'ℝ',
  25: 'ℤ',
} as Record<number, string | undefined>;

/**
 * A-Z と a-z に対応するダブルストラック体の配列。
 */
const doubleStrucks = Array.from(Array(52).keys()).map(
  (e) => jumps[e] ?? String.fromCodePoint(e + base),
);

/**
 * 'A' と 'a' の Unicode code point。
 */
const codeUpperA = 0x41;
const codeLowera = 0x61;

/**
 * 通常のアルファベットからダブルストラック体への変換マップを作成する。
 * @returns 変換用の文字マップ。
 */
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

/**
 * 文字変換の参照テーブル。
 */
const charTransMap = makeCharTransMap();

/**
 * 文字列を 1 文字ずつの配列に分割する。
 * @param target 分割対象の文字列。
 * @returns 1 文字ずつに分割された配列。
 */
const string2chars = (target: string) => {
  return target.split('');
};

/**
 * 英字文字列をダブルストラック体へ変換する。
 * アルファベット以外が含まれる場合はエラーを返す。
 * @param target 変換対象の英字文字列。
 * @returns 変換結果。成功時は ok、失敗時は err。
 */
export const string2DoubleStrucks = (target: string): Result<string, ArgStringNotAlphabetError> => {
  const chars = string2chars(target);
  const isOnlyAlphabet = chars.every((code) => charTransMap.has(code));
  if (!isOnlyAlphabet) return err(new ArgStringNotAlphabetError());
  const trans = chars.map((e) => charTransMap.get(e)!).join('');
  return ok(trans);
};
