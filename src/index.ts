//Imports
import { LcdDisplay } from './classes/LcdDisplay';

const args: string[] = process.argv.slice(2);
const collectedNumbers: number = Number(args[0]);
let xSize: number = args[1] ? Number(args[1]) : 1;
let ySize: number = args[2] ? Number(args[2]) : 1;

((): void => {
  if (isNaN(collectedNumbers)) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Please enter a correct format to convert the number to LCD format');
    console.info(
      '\x1b[34m%s\x1b[0m',
      '\nArgs:\n- 1: Positive<number> The number to convert\n- 2: Positive<number> X size (optional)\n- 3: Positive<number> Y size (optional)\n\nExample: npm start 1234567890 3 2'
    );
    return;
  }
  if (xSize <= 0 || isNaN(xSize)) {
    console.warn('\x1b[33m%s\x1b[0m', 'Note: X size must be a positive number to work, using default value (1)');
    xSize = 1;
  }
  if (ySize <= 0 || isNaN(ySize)) {
    console.warn('\x1b[33m%s\x1b[0m', 'Note: Y size must be a positive number to work, using default value (1)');
    ySize = 1;
  }
  const lcdDisplay: LcdDisplay = new LcdDisplay({
    collectedNumbers,
    xSize,
    ySize,
  });
  console.log(lcdDisplay.generate());
  return;
})();
