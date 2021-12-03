import { IOptionValidator } from '../../interface/optionValidatorInterface';

export class NumberValidator implements IOptionValidator {
  public type: string = 'number';

  public validate(option: any): void {
    if (isNaN(option)) {
      throw new Error('Number option is not valid');
    }
  }
}
