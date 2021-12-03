import { INamed } from './namedInterface';

export interface IIndicator extends INamed {
  label: string;
  execute(...args: any[]): any;
}
