//Imports
import { LcdNumber } from './LcdNumber';
import { ILcdDisplay } from '../interfaces/ILcdDisplay';
import { ILcdLines } from '../interfaces/ILcdLines';
import { ILcdNumber } from '../interfaces/ILcdNumber';
export class LcdDisplay {
  public collectedNumbers;
  public xSize;
  public ySize;
  public result: string;
  constructor({ collectedNumbers, xSize, ySize }: ILcdDisplay) {
    this.collectedNumbers = collectedNumbers;
    this.xSize = xSize;
    this.ySize = ySize;
    this.result = '';
  }
  private get lcdNumbers(): string[] {
    let lcdNumbers: string[] = [];
    for (const [i, number] of Array.from(
      Array.from(this.collectedNumbers.toString().split(''), Number),
      Number
    ).entries()) {
      let lines = {
        top: '',
        middle: '',
        bottom: '',
      };
      const lcdNumber: LcdNumber = new LcdNumber({
        number: number as ILcdNumber['number'],
        xSize: this.xSize,
        ySize: this.ySize,
      });
      const generatedLcdNumber: ILcdLines = lcdNumber.generate();
      lines.top = `${generatedLcdNumber.top}`;
      lines.middle = `${generatedLcdNumber.middle}`;
      lines.bottom = `${generatedLcdNumber.bottom}`;
      lcdNumbers.push(`${lines.top}\n${lines.middle}\n${lines.bottom}`);
    }
    return lcdNumbers;
  }
  private get destructedLcdNumbers(): string[][] {
    let destructedLcdNumbers: string[][] = [];
    for (const [i, lcdNumber] of this.lcdNumbers.entries()) {
      destructedLcdNumbers.push(lcdNumber.split('\n'));
    }
    return destructedLcdNumbers;
  }
  public generate(): string {
    for (let i = 0; i <= Math.max(...this.destructedLcdNumbers.map((array) => array.length)) - 1; i++) {
      for (let j = 0; j < this.lcdNumbers.length; j++) {
        this.result += this.destructedLcdNumbers[j][i];
      }
      if (i < Math.max(...this.destructedLcdNumbers.map((array) => array.length)) - 1) {
        this.result += '\n';
      }
    }
    return this.result;
  }
}

export default LcdDisplay;
