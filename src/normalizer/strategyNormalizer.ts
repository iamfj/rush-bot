export interface IStrategyModule {
  name: string;
  label: string;
  options: { [key: string]: any };

  beforeStart(): void;
  onTick(): void;
}

export class StrategyNormalizer {
  public normalize(module: any): IStrategyModule {
    return {
      name: '',
      label: '',
      options: {},
      beforeStart: () => {},
      onTick: () => {},
      ...module,
    };
  }
}
