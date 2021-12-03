import { Option } from '../types/strategyTypes';
import { IValidator } from './validatorInterface';

export interface IOptionValidator extends IValidator {
  type: string;
  validate(option: Option): void;
}
