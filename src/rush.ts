import { Server } from 'socket.io';
import { ServerHandler } from './handler/serverHandler';
import { Logger } from 'tslog';
import { StrategyLoader } from './strategyLoader';
import * as dotenv from 'dotenv';

dotenv.config();

const logger: Logger = new Logger();

const strategyLoader = new StrategyLoader(logger);
strategyLoader.load();

const serverHandler = new ServerHandler(new Server(3000, {}), logger);
