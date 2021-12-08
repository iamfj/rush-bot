import axios from 'axios';
import { Logger } from 'tslog';
import { inject } from 'tsyringe';
import { INotification } from '../interface/notificationInterface';
import { WebHockNotificationOptions } from '../types/notificationTypes';

export class WebHookNotification implements INotification<WebHockNotificationOptions> {
  public readonly name: string = 'webhook';
  public readonly label: string = 'WebHook';

  public constructor(@inject(Logger) private readonly logger: Logger) {}

  public notify(message: string, options: WebHockNotificationOptions): void {
    if (options.method === 'POST') {
      axios.post(options.url, message).catch((err) => this.handleError(err, options));
    } else {
      axios
        .get(options.url, {
          params: {
            message,
          },
        })
        .catch((err) => this.handleError(err, options));
    }
  }

  private handleError(err: string, options: WebHockNotificationOptions) {
    this.logger.error(`WebHook ${options.method} Request to ${options.url} failed: ${err}`);
  }
}
