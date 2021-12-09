import { IObserver } from '../interface/observerInterface';
import { ClientRequest, IncomingMessage } from 'http';
import WebSocket from 'ws';

export abstract class WebSocketObserver implements IObserver {
  public constructor(private readonly webSocket: WebSocket, public readonly heartbeatInterval?: number) {
    this.webSocket.on('open', this.onOpen);
    this.webSocket.on('upgrade', this.onUpgrade);
    this.webSocket.on('message', this.onMessage);
    this.webSocket.on('ping', this.onPing);
    this.webSocket.on('pong', this.onPong);
    this.webSocket.on('error', this.onError);
    this.webSocket.on('unexpected-response', this.onUnexpectedResponse);
    this.webSocket.on('close', this.onClose);

    // Set timer for heartbeat interval
    if (heartbeatInterval !== undefined) {
      setInterval(() => this.onHeartbeatTick(this.webSocket), heartbeatInterval);
    }
  }

  // All these event methods can be overridden in the child observer
  public onHeartbeatTick(webSocket: WebSocket): void {}
  public onOpen(webSocket: WebSocket): void {}
  public onUpgrade(webSocket: WebSocket, request: IncomingMessage): void {}
  public onMessage(webSocket: WebSocket, data: WebSocket.RawData, isBinary: boolean): void {}
  public onPing(webSocket: WebSocket, data: Buffer): void {}
  public onPong(webSocket: WebSocket, data: Buffer): void {}
  public onError(webSocket: WebSocket, err: Error): void {}
  public onUnexpectedResponse(webSocket: WebSocket, request: ClientRequest, response: IncomingMessage): void {}
  public onClose(webSocket: WebSocket, code: number, reason: Buffer): void {}

  // These methods must be handled by all observers
  public abstract observe(symbol: string): void;
  public abstract unobserve(symbol: string): void;
}
