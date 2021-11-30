import { Server, Socket } from 'socket.io';
import { Logger } from 'tslog';

export class ServerHandler {
  public constructor(private readonly server: Server, private readonly logger: Logger) {
    this.server.on('connection', this.onConnect);

    this.logger.info(`Server started`)
  }

  private onConnect(socket: Socket): void {
    this.logger.info(`On connection ${socket}`);
  }
}
