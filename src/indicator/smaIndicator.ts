import { IIndicator } from '../interface/indicatorInterface';

export class SMAIndicator implements IIndicator {
  public name: string = 'sma';
  public label: string = 'Simple Moving Average';

  public execute(originalArray: number[], length: number): number[] {
    let array;
    let sma = [];
    for (let i = length - 1; i >= 0; i--) {
      array = originalArray.slice(i, i + length);
      sma[i] = array.reduce((a, b) => a + b) / array.length;
    }
    return sma;
  }
}
