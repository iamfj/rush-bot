import { Options, StrategyOptions } from '../types/strategyTypes';
import { INamed } from './namedInterface';

export interface IStrategy extends INamed {
  label: string;
  options: StrategyOptions;
  onStart(options: Options): void;
  onTick(): void;
}