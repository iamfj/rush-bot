import { Logger } from 'tslog';
import { inject, injectable } from 'tsyringe';
import { INotification } from '../interface/notificationInterface';

@injectable()
export class ConsoleNotification implements INotification<never> {
  public name: string = 'console';
  public label: string = 'Console';

  public constructor(@inject(Logger) private readonly logger: Logger) {}

  public notify(message: string): void {
    this.logger.info(`Notification: ${message}`);
  }
}
