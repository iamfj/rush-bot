import { Logger } from 'tslog';
import { inject, injectable } from 'tsyringe';
import WebSocket from 'ws';
import { ILabeled } from '../../interface/labeledInterface';
import { INamed } from '../../interface/namedInterface';
import { BinanceInterval } from '../../types/observerTypes';
import { WebSocketObserver } from '../webSocketObserver';

@injectable()
export class BinanceObserver extends WebSocketObserver implements INamed, ILabeled {
  public readonly name: string = 'binance';
  public readonly label: string = 'Binance';
  private streamIds: { [key: string]: number } = {};

  public constructor(@inject(Logger) private readonly logger: Logger) {
    super(new WebSocket('wss://dex.binance.org/api/ws'));
  }

  public onOpen() {
    this.logger.info(`${this.label} observer connection established`);
  }

  public onClose() {
    this.logger.warn(`${this.label} observer connection lost`);
  }

  public onMessage(webSocket: WebSocket, data: WebSocket.RawData, isBinary: boolean) {
    this.logger.info(`${this.label} observer incomming data: ${data}`);
  }

  public observe(symbol: string, interval: BinanceInterval): void {
    const channel = `${symbol.toLowerCase()}@kline_${interval}`;
    const streamId = Object.values(this.streamIds).length;
    this.streamIds[channel] = streamId;
    this.webSocket.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: [channel],
        id: streamId,
      }),
    );
  }

  public unobserve(symbol: string, interval: BinanceInterval): void {
    const channel = `${symbol.toLowerCase()}@kline_${interval}`;
    const streamId = Object.values(this.streamIds).length;
    this.streamIds[channel] = streamId;
    this.webSocket.send(
      JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: [channel],
        id: streamId,
      }),
    );
  }
}
