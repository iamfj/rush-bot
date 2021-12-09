export interface IObserver {
  observe(symbol: string): void;
  unobserve(symbol: string): void;
}