import { ILabeled } from './labeledInterface';
import { INamed } from './namedInterface';

export interface INotification<O> extends INamed, ILabeled {
  notify(message: string, options: O): void;
}
