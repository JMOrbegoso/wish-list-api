import { ValueObject } from '..';

export class UniqueId extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new Error('Invalid id.');
  }

  static create(value: string): UniqueId {
    return new UniqueId(value);
  }

  public get getId(): string {
    return this.value;
  }
}
