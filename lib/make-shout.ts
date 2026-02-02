import { Board } from './board';
import { string2DoubleStrucks } from './string2double-struck';

const prefix = string2DoubleStrucks('Punch  out  the  ');

const leftBoard = Board.make4Param(
  `      ${prefix}`,
  9,
  (frame) => `◤${frame}`,
  (frame) => `◣${frame}`,
);

const rightBoard = Board.make4Param(
  '',
  1,
  (frame) => `${frame}◥`,
  (frame) => `${frame}◢`,
);

// 小文字３：フレーム棒２
// 余りが出たらもう一本
// 長い単語であればもう一本
const ratioFrame4chars = (charLength: number) => {
  const result = ((charLength / 3) | 0) * 2;
  const remain = charLength % 3 > 0 ? 1 : 0;
  const extender = charLength > 4 ? 1 : 0;
  return result + remain + extender;
};

const getFrameLength = (charLength: number) => {
  const upper = 1;
  const lower = ratioFrame4chars(charLength - 1);
  return upper + lower;
};

export const makeShout = (label: string, originLength: number) => {
  const frameLength = getFrameLength(originLength);
  const center = Board.make4Param(label, frameLength);
  return leftBoard.merge(center, rightBoard).build();
};
