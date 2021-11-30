import { Server } from 'socket.io';
import { ServerHandler } from './handler/serverHandler';
import { Logger } from 'tslog';
import * as dotenv from 'dotenv';

dotenv.config();

const logger: Logger = new Logger();
const server = new Server(3000, {});
const serverHandler = new ServerHandler(server, logger);
