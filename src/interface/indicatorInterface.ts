import { ILabeled } from './labeledInterface';
import { INamed } from './namedInterface';

export interface IIndicator extends INamed, ILabeled {
  execute(...args: any[]): any;
}
