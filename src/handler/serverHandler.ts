import { Server, Socket } from 'socket.io';

export class ServerHandler {
  public constructor(private readonly server: Server) {
    this.server.on('connection', this.onConnect);
  }

  private onConnect(socket: Socket): void {
    console.log(`On connection ${socket}`);
  }
}
