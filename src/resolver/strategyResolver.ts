import { IStrategyModule } from '../normalizer/strategyNormalizer';

export class StrategyResolver {
  private strategies: { [key: string]: IStrategyModule } = {};

  public register(strategy: IStrategyModule): void {
    if (this.strategies[strategy.name] !== undefined) {
      throw new Error(`An strategy with the name ${strategy.name} is already registered`);
    }

    this.strategies[strategy.name] = strategy;
  }

  public resolve(name: string): IStrategyModule {
    const strategy: IStrategyModule | undefined = this.strategies[name];

    if (strategy === undefined) {
      throw new Error(`An strategy with the name ${name} is not registered`);
    }

    return strategy;
  }
}
