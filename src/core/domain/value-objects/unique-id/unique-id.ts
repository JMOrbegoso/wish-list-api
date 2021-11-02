import { ValueObject } from '..';
import { v4 as createUuid } from 'uuid';

export class UniqueId extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new Error('Invalid id.');
  }

  static create(value?: string): UniqueId {
    if (!value) return new UniqueId(createUuid());

    return new UniqueId(value);
  }

  public get getId(): string {
    return this.value;
  }
}
