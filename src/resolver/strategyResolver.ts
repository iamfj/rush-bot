import * as path from 'path';
import * as fs from 'fs';
import { Logger } from 'tslog';
import { OnRequestDataCallback, OnTickCallback, OptionDefinition, Strategy } from './strategyResolver.types';

export class StrategyResolver {
  public strategies: Strategy[] = [];

  public constructor(private readonly logger: Logger, private readonly cwd: string) {
    this.register = this.register.bind(this);

    // Loading strategies from directory
    for (const file of this.getFilesFromDirectory()) {
      const moduleName = path.basename(file);
      try {
        const module = eval('require')(file);

        if (typeof module.onInit === 'undefined') {
          throw new Error(`Method onInit is not defined in module ${moduleName}`);
        }

        this.logger.debug(`Loaded strategy module ${moduleName}`);
        module.onInit(this.register);
      } catch (err) {
        //this.logger.error(err);
        this.logger.error(`Could not load strategy module ${moduleName}`);
      }
    }
  }

  public resolve(name: string): Strategy {
    const matchingStrategies = this.strategies.filter((strategy) => {
      return strategy.name === name;
    })

    if(matchingStrategies.length === 0) {
      throw new Error(`Could not resolve strategy with name ${name}`);
    } else if(matchingStrategies.length > 1) {
      throw new Error(`Multiple strategies with the name ${name} found`);
    }

    return matchingStrategies[0];
  }

  private register(name: string, label: string, options: OptionDefinition, onRequestData: OnRequestDataCallback, onTick: OnTickCallback) {
    if (name === undefined || label === undefined || options === undefined || onRequestData === undefined || onTick === undefined) {
      throw new Error(`Could not register strategy without required parameters`);
    }

    this.strategies.push({ name, label, options, onRequestData, onTick });
    this.logger.info(`Strategy ${label} was registred successfully`);
  }

  private getFilesFromDirectory(): string[] {
    return fs
      .readdirSync(path.join(this.cwd, `strategies`))
      .filter((file) => {
        return file.endsWith(`.js`);
      })
      .map((file) => {
        return path.join(this.cwd, `strategies`, file);
      });
  }
}
