
export type NumberOption = {
  type: 'number';
  default: number;
};

export type Timeframe = '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1m';
export type TimeframeOption = {
  type: 'timeframe';
  default: Timeframe;
};

export type CandlePrice = 'open' | 'low' | 'high' | 'close';
export type CandlePriceOption = {
  type: 'candlePrice';
  default: CandlePrice;
};

export type Option = NumberOption | TimeframeOption | CandlePriceOption;
export type OptionValues = number | Timeframe | CandlePrice;
export type OptionDefinition = { [key: string]: Option };
export type Options = { [key: string]: OptionValues };

export type SignalDirection = 'long' | 'short';
export type DataRequest = {};
export type DataRequests = { [key: string]: DataRequest };
export type Data = { [key: string]: number | Date };
export type OnRequestDataCallback = (options: Options) => DataRequests;
export type OnTickCallback = (data: Data, triggerSignal: (direction: SignalDirection) => void) => void;

export type Strategy = {
  name: string;
  label: string;
  options: OptionDefinition;
  onRequestData: OnRequestDataCallback,
  onTick: OnTickCallback
};

export interface IStrategy {
  onInit(register: (name: string, label: string, options: OptionDefinition, onRequestData: OnRequestDataCallback, onTick: OnTickCallback) => void): void;
}