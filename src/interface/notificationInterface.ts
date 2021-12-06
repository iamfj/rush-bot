import { INamed } from './namedInterface';

export interface INotification<O> extends INamed {
  label: string;

  notify(message: string, options: O): void;
}
