import { CategoryNameIsTooLongError, InvalidCategoryNameError } from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class CategoryName extends ValueObject<string> {
  public static readonly MaxLength = 100;

  protected validate(value: string): void {
    if (!value) throw new InvalidCategoryNameError();

    if (value.length > CategoryName.MaxLength)
      throw new CategoryNameIsTooLongError();
  }

  static create(value: string): CategoryName {
    return new CategoryName(value);
  }

  public get getName(): string {
    return this.value;
  }
}
