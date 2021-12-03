import { Options, StrategyOptions } from "../types/strategyTypes";

export interface IStrategy {
  name: string;
  label: string;
  options: StrategyOptions;
  onStart(options: Options): void;
  onTick(): void;
}
