import { Server } from 'socket.io';
import { ServerHandler } from './handler/serverHandler';
import { Logger } from 'tslog';
import { StrategyResolver } from './resolver/strategyResolver';
import * as dotenv from 'dotenv';

dotenv.config();

// Define variables from environment
const rushPort: number = parseInt(process.env.RUSH_PORT ?? '3000');

// Define components
const logger: Logger = new Logger();

const strategyResolver = new StrategyResolver(logger);
const serverHandler = new ServerHandler(new Server(rushPort, {}), logger);
