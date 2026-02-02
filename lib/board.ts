const FILLER = {
  TOP: '￣',
  BOTTOM: '＿',
} as const;

type Filler = (typeof FILLER)[keyof typeof FILLER];
type Adder = (frame: string) => string;

const defaultAdder: Adder = (frame) => frame;

const makeFrame = (frameLength: number) => (filler: Filler, adder?: Adder) => {
  const frame: string = Array(frameLength).fill(filler).join('');
  return (adder ?? defaultAdder)(frame);
};

interface Lines {
  top: string;
  middle: string;
  bottom: string;
}

export class Board {
  constructor(private lines: Lines) {}

  public build() {
    const lines = this.lines;
    return [lines.top, `**${lines.middle}**`, lines.bottom].join('\n');
  }

  private static getAdded(boards: Board[]) {
    return (key: keyof Lines) => {
      return boards.map((e) => e.lines[key]).join('');
    };
  }

  public merge(...boards: Board[]) {
    const maker = Board.getAdded(boards);
    const lines = this.lines;
    const top = lines.top + maker('top');
    const middle = lines.middle + maker('middle');
    const bottom = lines.bottom + maker('bottom');
    return new Board({ top, middle, bottom });
  }

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
