import { ValueObject } from '../../../../core/domain/value-objects';

export class WishDescription extends ValueObject<string> {
  public static readonly MaxLength = 1000;

  validate(value: string): void {
    if (!value) throw new Error('Invalid wish description.');

    if (value.length > WishDescription.MaxLength)
      throw new Error('Invalid wish description.');
  }

  static create(value: string): WishDescription {
    return new WishDescription(value);
  }
}
