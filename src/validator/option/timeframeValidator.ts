import { IOptionValidator } from '../../interface/optionValidatorInterface';
import { Timeframe } from '../../types/strategyTypes';

export class TimeframeValidator implements IOptionValidator {
  public type: string = 'timeframe';

  public validate(option: Timeframe): void {
    if (!['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M'].includes(option)) {
      throw new Error('Timeframe option is not valid');
    }
  }
}
