import { singleton } from 'tsyringe';
import { IStrategy } from '../interface/strategyInterface';
import { NamedResolver } from './namedResolver';

@singleton()
export class StrategyResolver extends NamedResolver<IStrategy> {
  public constructor() {
    super('strategy');
  }
}
