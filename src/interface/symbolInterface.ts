import { IExchange } from './exchangeInterface';
import { INamed } from './namedInterface';

export interface ISymbol extends INamed {
  label: string;
  exchange: IExchange;
}
