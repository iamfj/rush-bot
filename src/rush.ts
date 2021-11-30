import { Server } from 'socket.io';
import { ServerHandler } from './handler/serverHandler';
import * as dotenv from 'dotenv';

dotenv.config();

const server = new Server(3000, {});
const serverHandler = new ServerHandler(server);
