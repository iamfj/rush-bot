export type Timeframe = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1M';
export type CandleSource = 'open' | 'low' | 'high' | 'close';
export type Option = number | Timeframe | CandleSource;
export type Options = { [key: string]: Option };

export type StrategyOption = {
  type: string;
  default?: Option;
  value?: Option;
};

export type StrategyOptions = { [key: string]: StrategyOption };
