import { Server } from 'socket.io';
import { ServerHandler } from './handler/serverHandler';

const server = new Server(3000, {});
const serverHandler = new ServerHandler(server);
