import { ValueObject } from '../value-objects';
import { v4 as createUuid, validate as isUuidValid } from 'uuid';

export class UniqueId extends ValueObject<string> {
  validate(value: string): void {
    if (!value) throw new Error('Invalid id.');

    if (!isUuidValid(value)) throw new Error('Invalid id.');
  }

  static create(value?: string): UniqueId {
    if (!value) return new UniqueId(createUuid());

    return new UniqueId(value);
  }
}
