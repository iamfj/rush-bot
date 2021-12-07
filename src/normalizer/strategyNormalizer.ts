import { IStrategy } from '../interface/strategyInterface';

export class StrategyNormalizer {
  public normalize(module: any): IStrategy {
    return {
      name: '',
      label: '',
      schema: 1,
      options: {},
      onStart: () => {},
      onTick: () => {},
      ...module,
    };
  }
}
