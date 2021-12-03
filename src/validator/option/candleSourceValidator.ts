import { IOptionValidator } from '../../interface/optionValidatorInterface';
import { CandleSource } from '../../types/strategyTypes';

export class CandleSourceValidator implements IOptionValidator {
  public type: string = 'candleSource';

  public validate(option: CandleSource): void {
    if (!['open', 'low', 'high', 'close'].includes(option)) {
      throw new Error('Candle source option is not valid');
    }
  }
}
