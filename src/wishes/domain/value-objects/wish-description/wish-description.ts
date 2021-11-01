import { ValueObject } from '../../../../core/domain/value-objects';

export class WishDescription extends ValueObject<string> {
  validate(value: string): void {
    if (!value) throw new Error('Invalid wish description.');
  }

  static create(value: string): WishDescription {
    return new WishDescription(value);
  }
}
