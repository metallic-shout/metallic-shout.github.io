import assert from 'node:assert/strict';
import test from 'node:test';

import { Board } from './board';

const unpackBoard = (board: Board) => {
  const [top, middleWithStars, bottom] = board.build().split('\n');
  const middle = middleWithStars.replace(/^\*\*/, '').replace(/\*\*$/, '');
  return { top, middle, bottom };
};

test('buildは中央行を**で囲んだ3行文字列を返す', () => {
  const board = Board.make4Param('CENTER', 3);
  const built = board.build();
  const lines = built.split('\n');

  assert.equal(lines.length, 3);
});

test('buildの返り値は3行で構成される', () => {
  const board = Board.make4Param('TEST', 2);
  const built = board.build();
  const lines = built.split('\n');

  assert.equal(lines.length, 3);
  assert.equal(lines[1], '**CENTER**');
});

test('mergeは各行を横方向に連結する', () => {
  const left = Board.make4Param('L', 2);
  const right = Board.make4Param('R', 2);
  const merged = left.merge(right);

  const leftParts = unpackBoard(left);
  const rightParts = unpackBoard(right);
  const mergedParts = unpackBoard(merged);

  assert.equal(mergedParts.top, leftParts.top + rightParts.top);
  assert.equal(mergedParts.middle, leftParts.middle + rightParts.middle);
  assert.equal(mergedParts.bottom, leftParts.bottom + rightParts.bottom);
});

test('make4Paramは指定したフレーム長の上下行を生成する', () => {
  const frameLength = 4;
  const board = Board.make4Param('X', frameLength);
  const { top, bottom } = unpackBoard(board);

  assert.equal(top.length, bottom.length);
  assert.equal(top.length % frameLength, 0);
});
