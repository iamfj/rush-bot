import * as fs from 'fs';
import * as path from 'path';
import { Logger } from 'tslog';
import { injectable, inject } from 'tsyringe';
import { StrategyNormalizer } from '../normalizer/strategyNormalizer';
import { StrategyResolver } from '../resolver/strategyResolver';
import { StrategyValidator } from '../validator/strategyValidator';

@injectable()
export class StrategyManager {
  public constructor(
    @inject(Logger) private readonly logger: Logger,
    @inject(StrategyValidator) private readonly validator: StrategyValidator,
    @inject(StrategyNormalizer) private readonly normalizer: StrategyNormalizer,
    @inject(StrategyResolver) private readonly resolver: StrategyResolver,
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
