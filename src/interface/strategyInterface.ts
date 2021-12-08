import { Options, StrategyOptions } from '../types/strategyTypes';
import { ILabeled } from './labeledInterface';
import { INamed } from './namedInterface';

export interface IStrategy extends INamed, ILabeled {
  readonly version: number;
  readonly options: StrategyOptions;
  onStart(options: Options): void;
  onTick(): void;
}
