import { InvalidIpError } from '..';
import { ValueObject } from '../../../../core/domain/value-objects';

export class Ip extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new InvalidIpError();
  }

  static create(value: string): Ip {
    return new Ip(value);
  }

  public get getIp(): string {
    return this.value;
  }
}
