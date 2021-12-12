import { InvalidIpAddressError } from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class IpAddress extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new InvalidIpAddressError();
  }

  static create(value: string): IpAddress {
    return new IpAddress(value);
  }

  public get getIpAddress(): string {
    return this.value;
  }
}
