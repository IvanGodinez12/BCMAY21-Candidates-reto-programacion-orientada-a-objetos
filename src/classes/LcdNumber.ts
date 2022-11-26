import { LcdNumberStructure } from '../constants/LcdNumberStructure';
import { ILcdLines } from '../interfaces/ILcdLines';
import { ILcdNumber } from '../interfaces/ILcdNumber';
import { ILcdNumberStructure } from '../interfaces/ILcdNumberStructure';

export class LcdNumber {
  public number;
  public xSize;
  public ySize;
  public lines: ILcdLines;
  constructor({ number, xSize, ySize }: ILcdNumber) {
    this.number = number;
    this.xSize = xSize;
    this.ySize = ySize;
    this.lines = {
      top: '',
      middle: '',
      bottom: '',
    };
  }
  private get structure(): ILcdNumberStructure {
    return LcdNumberStructure[this.number];
  }
  private generateTopLine(): void {
    this.lines.top = ` ${this.structure.cellOne ? '_'.repeat(this.xSize) : ' '.repeat(this.xSize)} `;
  }
  private generateMiddleLine(): void {
    for (let i = 0; i < this.ySize; i++) {
      if (i != 0) {
        this.lines.middle += '\n';
      }
      if (i != this.ySize - 1) {
        this.lines.middle += `${this.structure.cellTwo ? '|' : ' '}${' '.repeat(this.xSize)}${
          this.structure.cellThree ? '|' : ' '
        }`;
      } else {
        this.lines.middle += `${this.structure.cellTwo ? '|' : ' '}${
          this.structure.cellFour ? '_'.repeat(this.xSize) : ' '.repeat(this.xSize)
        }${this.structure.cellThree ? '|' : ' '}`;
      }
    }
  }
  private generateBottomLine(): void {
    for (let i = 0; i < this.ySize; i++) {
      if (i != 0) {
        this.lines.bottom += '\n';
      }
      if (i != this.ySize - 1) {
        this.lines.bottom += `${this.structure.cellFive ? '|' : ' '}${' '.repeat(this.xSize)}${
          this.structure.cellSix ? '|' : ' '
        }`;
      } else {
        this.lines.bottom += `${this.structure.cellFive ? '|' : ' '}${
          this.structure.cellSeven ? '_'.repeat(this.xSize) : ' '.repeat(this.xSize)
        }${this.structure.cellSix ? '|' : ' '}`;
      }
    }
  }
  public generate(): ILcdLines {
    this.generateTopLine();
    this.generateMiddleLine();
    this.generateBottomLine();
    return this.lines;
  }
}

export default LcdNumber;
