import { ValueObject } from '../../../../core/domain/value-objects';
import { InvalidWishTitleError, WishTitleIsTooLongError } from '..';

export class WishTitle extends ValueObject<string> {
  public static readonly MaxLength = 200;

  protected validate(value: string): void {
    if (!value) throw new InvalidWishTitleError();

    if (value.length > WishTitle.MaxLength) throw new WishTitleIsTooLongError();
  }

  static create(value: string): WishTitle {
    return new WishTitle(value);
  }

  public get getTitle(): string {
    return this.value;
  }
}
