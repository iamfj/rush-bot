import { INamed } from '../interface/namedInterface';

export abstract class NamedResolver<I extends INamed> {
  private namedInterfaces: { [key: string]: I } = {};

  public constructor(private readonly type: string) {}

  public register(namedInterface: I): void {
    if (this.namedInterfaces[namedInterface.name] !== undefined) {
      throw new Error(`The ${this.type} with the name ${namedInterface.name} is already registered`);
    }

    this.namedInterfaces[namedInterface.name] = namedInterface;
  }

  public resolve(name: string): I {
    const namedInterface: I | undefined = this.namedInterfaces[name];

    if (namedInterface === undefined) {
      throw new Error(`The ${this.type} with the name ${name} is not registered`);
    }

    return namedInterface;
  }
}
