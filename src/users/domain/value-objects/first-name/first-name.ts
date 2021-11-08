import { ValueObject } from '../../../../core/domain/value-objects';

export class FirstName extends ValueObject<string> {
  public static readonly MaxLength = 100;

  protected validate(value: string): void {
    if (!value) throw new Error('Invalid first name.');

    if (value.length > FirstName.MaxLength)
      throw new Error('Invalid first name.');
  }

  static create(value: string): FirstName {
    return new FirstName(value);
  }

  public get getFirstName(): string {
    return this.value;
  }
}
