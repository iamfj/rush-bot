export class StrategyValidator {
  public validate(module: any): void {
    if (module.name === undefined) {
      throw new Error('Name is not defined');
    }

    if (module.label === undefined) {
      throw new Error('Label is not defined');
    }

    if (module.onTick === undefined) {
      throw new Error('Methos onTick is not defined');
    }
  }
}
