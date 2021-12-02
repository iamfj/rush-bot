import * as dotenv from 'dotenv';
import * as path from 'path';
import { Logger } from 'tslog';
import { StrategyManager } from './manager/strategyManager';
import { StrategyValidator } from './validator/strategyValidator';
import { StrategyNormalizer } from './normalizer/strategyNormalizer';
import { StrategyResolver } from './resolver/strategyResolver';

dotenv.config();

// Define variables from environment
const rushPort: number = parseInt(process.env.RUSH_PORT ?? '3000');
const strategyDir: string = path.join(process.cwd(), 'strategies');

// Define components
const logger: Logger = new Logger();

const strategyValidator = new StrategyValidator();
const strategyNormalizer = new StrategyNormalizer();
const strategyResolver = new StrategyResolver();
const strategyManager = new StrategyManager(logger, strategyValidator, strategyNormalizer, strategyResolver);

strategyManager.load(strategyDir);
