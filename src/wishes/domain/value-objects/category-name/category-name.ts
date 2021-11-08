import { ValueObject } from '../../../../core/domain/value-objects';
import { InvalidCategoryNameError } from '..';

export class CategoryName extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new InvalidCategoryNameError();
  }

  static create(value: string): CategoryName {
    return new CategoryName(value);
  }

  public get getName(): string {
    return this.value;
  }
}
