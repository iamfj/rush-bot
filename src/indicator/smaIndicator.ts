import { round } from 'mathjs';
import { IIndicator } from '../interface/indicatorInterface';
import { SMAOptions } from '../types/indicatorTypes';

export class SMAIndicator implements IIndicator {
  public readonly name: string = 'sma';
  public readonly label: string = 'Simple Moving Average';

  public execute(data: number[], options: SMAOptions): number[] {
    if (options.length < 1) {
      throw new Error(`The SMA length should be greater than zero`);
    }

    if (data.length < options.length) {
      throw new Error(`Not enough data to calculate the SMA of length ${options.length}`);
    }

    let smaData: number[] = [];
    for (let i = options.length - 1; i < data.length; i++) {
      smaData.push(round(data.slice(i - (options.length - 1), i + 1).reduce((a, b) => a + b) / options.length, options.precision ?? 2));
    }

    return smaData;
  }
}
