import { FirstNameIsTooLongError, InvalidFirstNameError } from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class FirstName extends ValueObject<string> {
  public static readonly MaxLength = 100;

  protected validate(value: string): void {
    if (!value) throw new InvalidFirstNameError();

    if (value.length > FirstName.MaxLength) throw new FirstNameIsTooLongError();
  }

  static create(value: string): FirstName {
    return new FirstName(value);
  }

  public get getFirstName(): string {
    return this.value;
  }
}
