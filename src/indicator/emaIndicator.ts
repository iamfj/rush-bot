import { IIndicator } from '../interface/indicatorInterface';

export class EMAIndicator implements IIndicator {
  public name: string = 'ema';
  public label: string = 'Exponential Moving Average';

  public execute(originalArray: number[], length: number): number[] {
    let array = originalArray.slice().reverse();
    let iPos = 0;
    let ema;

    // trim initial NaN values
    for (iPos = 0; iPos < array.length && isNaN(array[iPos]); iPos++) {}
    array = array.slice(iPos); // trim initial NaN values from array
    ema = [];
    const k = 2 / (length + 1);
    for (let i = 0; i < length - 1; i++) {
      ema[i] = NaN;
    }
    ema[length - 1] =
      array.slice(0, length).reduce(function (a, b) {
        return a + b;
      }) / length;
    for (let i = length; i < array.length; i++) {
      ema[i] = array[i] * k + ema[i - 1] * (1 - k);
    }
    ema.reverse(); // reverse back for main consumption
    for (let i = 0; i < iPos; i++) {
      ema.push(NaN);
    }
    return ema;
  }
}
