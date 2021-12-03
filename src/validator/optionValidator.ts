import { IOptionValidator } from '../interface/optionValidatorInterface';
import { IValidator } from '../interface/validatorInterface';
import { StrategyOptions } from '../types/strategyTypes';
import { CandleSourceValidator } from './option/candleSourceValidator';
import { NumberValidator } from './option/numberValidator';
import { TimeframeValidator } from './option/timeframeValidator';

export class OptionValidator implements IValidator {
  private validators: IOptionValidator[] = [];

  public constructor() {
    this.validators.push(new TimeframeValidator());
    this.validators.push(new CandleSourceValidator());
    this.validators.push(new NumberValidator());
  }

  public validate(options: StrategyOptions): void {
    for (const name of Object.keys(options)) {
      const option = options[name];
      const validators = this.validators.filter((validator) => validator.type === option.type);

      if (validators.length === 0) {
        throw new Error(`Unknown option type for option ${name}`);
      }

      if (option.default !== undefined) {
        for (const validator of validators) {
          try {
            validator.validate(option.default);
          } catch (err) {
            throw new Error(`Validation for default of option ${name} failed. ${err}`);
          }
        }
      }

      if (option.value !== undefined) {
        for (const validator of validators) {
          try {
            validator.validate(option.value);
          } catch (err) {
            throw new Error(`Validation for value of option ${name} failed. ${err}`);
          }
        }
      }
    }
  }
}
