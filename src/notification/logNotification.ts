import { Logger } from 'tslog';
import { inject, injectable } from 'tsyringe';
import { INotification } from '../interface/notificationInterface';

@injectable()
export class LogNotification implements INotification<never> {
  public readonly name: string = 'log';
  public readonly label: string = 'Log';

  public constructor(@inject(Logger) private readonly logger: Logger) {}

  public notify(message: string): void {
    this.logger.info(`Notification: ${message}`);
  }
}
