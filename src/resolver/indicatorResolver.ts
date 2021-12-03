import { singleton } from 'tsyringe';
import { IIndicator } from '../interface/indicatorInterface';
import { NamedResolver } from './namedResolver';

@singleton()
export class InidicatorResolver extends NamedResolver<IIndicator> {
  public constructor() {
    super('indicator');
  }
}
