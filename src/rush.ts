import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Logger } from 'tslog';
import { container } from 'tsyringe';
import { StrategyManager } from './manager/strategyManager';

dotenv.config();

// Define variables from environment
const rushPort: number = parseInt(process.env.RUSH_PORT ?? '3000');
const strategyDir: string = path.join(process.cwd(), 'strategies');

// Configure logger instance
const logger: Logger = new Logger({
  displayFilePath: 'hidden',
  displayFunctionName: false
});

// Register container objects
container.register<Logger>(Logger, {useValue: logger});

// Define main components
const strategyManager = container.resolve(StrategyManager);
strategyManager.load(strategyDir);
