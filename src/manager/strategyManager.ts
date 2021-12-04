import * as fs from 'fs';
import * as path from 'path';
import { Logger } from 'tslog';
import { injectable, inject } from 'tsyringe';
import { StrategyNormalizer } from '../normalizer/strategyNormalizer';
import { StrategyResolver } from '../resolver/strategyResolver';
import { OptionValidator } from '../validator/optionValidator';
import { StrategyValidator } from '../validator/strategyValidator';

@injectable()
export class StrategyManager {
  public constructor(
    @inject(Logger) private readonly logger: Logger,
    @inject(StrategyValidator) private readonly strategyValidator: StrategyValidator,
    @inject(OptionValidator) private readonly optionValidator: OptionValidator,
    @inject(StrategyNormalizer) private readonly normalizer: StrategyNormalizer,
    @inject(StrategyResolver) private readonly resolver: StrategyResolver,
  ) {}

  public load(directory: string) {
    for (const file of this.getFilesFromDirectory(directory, '.js')) {
      const filename = path.basename(file);
      try {
        // This must be run with eval to hide it from the webpack compiler :)
        const module = eval('require')(file);
        this.strategyValidator.validate(module);
        const normalizedModule = this.normalizer.normalize(module);
        this.optionValidator.validate(normalizedModule.options);
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
