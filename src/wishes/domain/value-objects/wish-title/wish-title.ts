import { ValueObject } from '../../../../core/domain/value-objects';

export class WishTitle extends ValueObject<string> {
  public static readonly MaxLength = 200;

  validate(value: string): void {
    if (!value) throw new Error('Invalid wish title.');

    if (value.length > WishTitle.MaxLength)
      throw new Error('Invalid wish title.');
  }

  static create(value: string): WishTitle {
    return new WishTitle(value);
  }
}
