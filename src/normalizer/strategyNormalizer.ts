import { IStrategy } from '../interface/strategyInterface';

export class StrategyNormalizer {
  public normalize(module: any): IStrategy {
    return {
      name: '',
      label: '',
      options: {},
      onStart: () => {},
      onTick: () => {},
      ...module,
    };
  }
}
