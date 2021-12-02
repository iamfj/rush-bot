import * as fs from 'fs';
import * as path from 'path';
import { Logger } from 'tslog';
import { StrategyNormalizer } from '../normalizer/strategyNormalizer';
import { StrategyResolver } from '../resolver/strategyResolver';
import { StrategyValidator } from '../validator/strategyValidator';

export class StrategyManager {
  public constructor(
    private readonly logger: Logger,
    private readonly validator: StrategyValidator,
    private readonly normalizer: StrategyNormalizer,
    private readonly resolver: StrategyResolver,
  ) {}

  public load(directory: string) {
    for (const file of this.getFilesFromDirectory(directory, '.js')) {
      const filename = path.basename(file);
      try {
        const module = eval('require')(file);
        this.validator.validate(module);
        const normalizedModule = this.normalizer.normalize(module);
        this.resolver.register(normalizedModule);
        this.logger.info(`Loaded strategy ${normalizedModule.label} from file ${filename}`);
      } catch (err) {
        this.logger.warn(`Could not load strategy from file ${filename}! ${err}`);
      }
    }
  }

  private getFilesFromDirectory(directory: string, suffix: string): string[] {
    return fs
      .readdirSync(directory)
      .filter((file) => {
        return file.endsWith(suffix);
      })
      .map((file) => {
        return path.join(directory, file);
      });
  }
}
