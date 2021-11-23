import { InvalidWishDescriptionError, WishDescriptionIsTooLongError } from '..';
import { ValueObject } from '../../../../core/domain/value-objects';

export class WishDescription extends ValueObject<string> {
  public static readonly MaxLength = 1000;

  protected validate(value: string): void {
    if (!value) throw new InvalidWishDescriptionError();

    if (value.length > WishDescription.MaxLength)
      throw new WishDescriptionIsTooLongError();
  }

  static create(value: string): WishDescription {
    return new WishDescription(value);
  }

  public get getDescription(): string {
    return this.value;
  }
}
