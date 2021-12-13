import { InvalidLastNameError, LastNameIsTooLongError } from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class LastName extends ValueObject<string> {
  public static readonly MaxLength = 100;

  protected validate(value: string): void {
    if (!value) throw new InvalidLastNameError();

    if (value.length > LastName.MaxLength) throw new LastNameIsTooLongError();
  }

  static create(value: string): LastName {
    return new LastName(value);
  }

  public get getLastName(): string {
    return this.value;
  }
}
