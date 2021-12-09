export interface IObserver {
  observe(symbol: string, interval: string): void;
  unobserve(symbol: string, interval: string): void;
}