/**
 * フレーム生成に使う上下のフィラー文字。
 */
const FILLER = {
  TOP: '￣',
  BOTTOM: '＿',
} as const;

type Filler = (typeof FILLER)[keyof typeof FILLER];
/**
 * フレーム文字列を加工する関数。
 */
type Adder = (frame: string) => string;

/**
 * 加工なしのデフォルト処理。
 * @param frame フレーム文字列。
 * @returns 加工なしのフレーム文字列。
 */
const defaultAdder: Adder = (frame) => frame;

/**
 * 指定長のフレーム文字列を生成する関数を返す。
 * @param frameLength フレームの長さ。
 * @returns フィラーと加工関数を受け取ってフレームを返す関数。
 */
const makeFrame = (frameLength: number) => (filler: Filler, adder?: Adder) => {
  const frame: string = Array(frameLength).fill(filler).join('');
  return (adder ?? defaultAdder)(frame);
};

interface Lines {
  top: string;
  middle: string;
  bottom: string;
}

/**
 * 3 行構成のボードを表すクラス。
 */
export class Board {
  /**
   * 各行の文字列でボードを構築する。
   * @param lines 各行の文字列。
   */
  constructor(private lines: Lines) {}

  /**
   * ボード全体を文字列として出力する。
   * @returns 3 行結合した文字列。
   */
  public build() {
    const lines = this.lines;
    return [lines.top, `**${lines.middle}**`, lines.bottom].join('\n');
  }

  /**
   * 複数ボードの各行を連結するためのヘルパーを返す。
   * @param boards 連結対象のボード配列。
   * @returns 指定行を連結する関数。
   */
  private static getAdded(boards: Board[]) {
    return (key: keyof Lines) => {
      return boards.map((e) => e.lines[key]).join('');
    };
  }

  /**
   * 受け取ったボードを右方向へ連結する。
   * @param boards 連結対象のボード。
   * @returns 連結後の新しいボード。
   */
  public merge(...boards: Board[]) {
    const maker = Board.getAdded(boards);
    const lines = this.lines;
    const top = lines.top + maker('top');
    const middle = lines.middle + maker('middle');
    const bottom = lines.bottom + maker('bottom');
    return new Board({ top, middle, bottom });
  }

  /**
   * 内容とフレーム長から 3 行構成のボードを作成する。
   * @param content 中央行の内容。
   * @param frameLength フレームの長さ。
   * @param topAdder 上フレームの加工関数。
   * @param bottomAdder 下フレームの加工関数。
   * @returns 生成されたボード。
   */
  static make4Param(
    content: string,
    frameLength: number,
    topAdder?: (frame: string) => string,
    bottomAdder?: (frame: string) => string,
  ) {
    const maker = makeFrame(frameLength);
    const top = maker(FILLER.TOP, topAdder);
    const bottom = maker(FILLER.BOTTOM, bottomAdder);
    const lines: Lines = { top, bottom, middle: content };
    return new Board(lines);
  }
}
