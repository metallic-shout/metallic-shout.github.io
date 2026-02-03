import { it, expect } from 'vitest';

import { Board } from './board';

const unpackBoard = (board: Board) => {
  const [top, middleWithStars, bottom] = board
    .build()
    .split('\n') as [string, string, string];
  const middle = middleWithStars.replace(/^\*\*/, '').replace(/\*\*$/, '');
  return { top, middle, bottom };
};

it('buildは中央行を**で囲んだ3行文字列を返す', () => {
  const board = Board.make4Param('CENTER', 3);
  const built = board.build();
  const lines = built.split('\n') as [string, string, string];

  expect(lines.length).toBe(3);
});

it('buildの返り値は3行で構成される', () => {
  const board = Board.make4Param('TEST', 2);
  const built = board.build();
  const lines = built.split('\n') as [string, string, string];

  expect(lines.length).toBe(3);
  expect(lines[1]).toBe('**TEST**');
});

it('mergeは各行を横方向に連結する', () => {
  const left = Board.make4Param('L', 2);
  const right = Board.make4Param('R', 2);
  const merged = left.merge(right);

  const leftParts = unpackBoard(left);
  const rightParts = unpackBoard(right);
  const mergedParts = unpackBoard(merged);

  expect(mergedParts.top).toBe(leftParts.top + rightParts.top);
  expect(mergedParts.middle).toBe(leftParts.middle + rightParts.middle);
  expect(mergedParts.bottom).toBe(leftParts.bottom + rightParts.bottom);
});

it('make4Paramは指定したフレーム長の上下行を生成する', () => {
  const frameLength = 4;
  const board = Board.make4Param('X', frameLength);
  const { top, bottom } = unpackBoard(board);

  expect(top.length).toBe(bottom.length);
  expect(top.length % frameLength).toBe(0);
});
