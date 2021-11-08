import { ValueObject, InvalidUniqueIdError } from '..';

export class UniqueId extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new InvalidUniqueIdError();
  }

  static create(value: string): UniqueId {
    return new UniqueId(value);
  }

  public get getId(): string {
    return this.value;
  }
}
