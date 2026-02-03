import { Board } from './board';
import { string2DoubleStrucks } from './string2double-struck';

const makePrefix = () => {
  const punchRes = string2DoubleStrucks('Punch');
  const outRes = string2DoubleStrucks('out');
  const theRes = string2DoubleStrucks('the');
  if (!punchRes.ok || !outRes.ok || !theRes.ok) {
    throw new Error('this error should not occurred.');
  }
  const punch = punchRes.value;
  const out = outRes.value;
  const the = theRes.value;
  return `${punch}  ${out}  ${the}  `;
};

/**
 * 左側ラベル用のプレフィックス（ダブルストラック体）。
 */
const prefix = makePrefix();

/**
 * 左側の装飾ボード。
 */
const leftBoard = Board.make4Param(
  `      ${prefix}`,
  9,
  (frame) => `◤${frame}`,
  (frame) => `◣${frame}`,
);

/**
 * 右側の装飾ボード。
 */
const rightBoard = Board.make4Param(
  '',
  1,
  (frame) => `${frame}◥`,
  (frame) => `${frame}◢`,
);

/**
 * 文字数に応じたフレーム長の比率を計算する。
 * @param charLength 文字数。
 * @returns 比率換算したフレーム長。
 */
const ratioFrame4chars = (charLength: number) => {
  // 小文字３：フレーム棒２
  const result = ((charLength / 3) | 0) * 2;
  // 余りが出たらもう一本
  const remain = charLength % 3 > 0 ? 1 : 0;
  // 長い単語であればもう一本
  const extender = charLength > 4 ? 1 : 0;
  return result + remain + extender;
};

/**
 * 文字数から左右装飾を含むフレーム長を算出する。
 * @param charLength 文字数。
 * @returns フレーム長。
 */
const getFrameLength = (charLength: number) => {
  const upper = 1;
  const lower = ratioFrame4chars(charLength - 1);
  return upper + lower;
};

/**
 * ラベルを左右装飾付きの文字列へ変換する。
 * @param label 中央の表示文字列。
 * @param originLength 元の文字数。
 * @returns 3 行構成の装飾済み文字列。
 */
export const makeShout = (label: string, originLength: number) => {
  const frameLength = getFrameLength(originLength);
  const center = Board.make4Param(label, frameLength);
  return leftBoard.merge(center, rightBoard).build();
};
