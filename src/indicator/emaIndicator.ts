import { round } from 'mathjs';
import { inject, injectable } from 'tsyringe';
import { IIndicator } from '../interface/indicatorInterface';
import { EMAOptions } from '../types/indicatorTypes';
import { SMAIndicator } from './smaIndicator';

@injectable()
export class EMAIndicator implements IIndicator {
  public readonly name: string = 'ema';
  public readonly label: string = 'Exponential Moving Average';

  public constructor(@inject(SMAIndicator) private readonly smaIndicator: SMAIndicator) {}

  public execute(data: number[], options: EMAOptions): number[] {
    if (options.length < 1) {
      throw new Error(`The EMA length should be greater than zero`);
    }

    if (data.length < options.length) {
      throw new Error(`Not enough data to calculate the EMA of length ${options.length}`);
    }

    let emaData: number[] = [];
    const multiplier = 2 / (options.length + 1);
    for (let i = options.length - 1; i < data.length; i++) {
      if (i === options.length - 1) {
        emaData.push(this.smaIndicator.execute(data.slice(i - (options.length - 1), i + 1), { length: options.length })[0]);
      } else {
        emaData.push(round(data[i] * multiplier + (1 - multiplier) * emaData[emaData.length - 1], options.precision ?? 2));
      }
    }

    return emaData;
  }
}
