import { IValidator } from '../interface/validatorInterface';

export class StrategyValidator implements IValidator {
  public validate(module: any): void {
    if (module.schema === undefined) {
      module.schema = 1;
    }

    if (module.schema === 1) {
      this.v1(module);
    } else {
      throw new Error(`Could not validate strategy schema with version ${module.schema}`);
    }
  }

  private v1(module: any) {
    if (module.name === undefined) {
      throw new Error('Name is not defined');
    }

    if (module.label === undefined) {
      throw new Error('Label is not defined');
    }

    if (module.onTick === undefined) {
      throw new Error('Method onTick is not defined');
    }
  }
}
