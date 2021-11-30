import * as path from 'path';
import * as fs from 'fs';
import { Logger } from 'tslog';
import { OnRequestDataCallback, OnTickCallback, OptionDefinition, Strategy } from './strategyLoader.types';

export class StrategyLoader {
  public strategies: Strategy[] = [];

  public constructor(private readonly logger: Logger) {
    this.register = this.register.bind(this);
  }

  public load(): void {
    for (const file of this.getExecuteableFilesFromDirectory()) {
      const moduleName = path.basename(file);
      try {
        const module = require(file);

        if (typeof module.onInit === 'undefined') {
          throw new Error(`Method onInit is not defined in module ${moduleName}`);
        }

        this.logger.debug(`Loaded strategy module ${moduleName}`);
        module.onInit(this.register);
      } catch (err) {
        this.logger.error(err);
        this.logger.error(`Could not load strategy module ${moduleName}`);
      }
    }
  }

  private register(name: string, label: string, options: OptionDefinition, onRequestData: OnRequestDataCallback, onTick: OnTickCallback) {
    if (name === undefined || label === undefined || options === undefined || onRequestData === undefined || onTick === undefined) {
      throw new Error('Could not register strategy without required parameters');
    }

    this.strategies.push({ name, label, options, onRequestData, onTick });
    this.logger.info(`Strategy ${label} was registred successfully`);
  }

  private getExecuteableFilesFromDirectory(): string[] {
    const absoluteDirectory = path.join(process.cwd(), 'strategies');
    return fs
      .readdirSync(absoluteDirectory)
      .filter((file) => {
        return file.endsWith('.js');
      })
      .map((file) => {
        return path.join(process.cwd(), `strategies`, file);
      });
  }
}
