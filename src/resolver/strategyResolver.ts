import { singleton } from 'tsyringe';
import { IStrategy } from '../interface/strategyInterface';

@singleton()
export class StrategyResolver {
  private strategies: { [key: string]: IStrategy } = {};

  public register(strategy: IStrategy): void {
    if (this.strategies[strategy.name] !== undefined) {
      throw new Error(`An strategy with the name ${strategy.name} is already registered`);
    }

    this.strategies[strategy.name] = strategy;
  }

  public resolve(name: string): IStrategy {
    const strategy: IStrategy | undefined = this.strategies[name];

    if (strategy === undefined) {
      throw new Error(`An strategy with the name ${name} is not registered`);
    }

    return strategy;
  }
}
