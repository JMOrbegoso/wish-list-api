import { ValueObject } from '../../../../core/domain/value-objects';

export class LastName extends ValueObject<string> {
  public static readonly MaxLength = 100;

  protected validate(value: string): void {
    if (!value) throw new Error('Invalid last name.');

    if (value.length > LastName.MaxLength)
      throw new Error('Invalid last name.');
  }

  static create(value: string): LastName {
    return new LastName(value);
  }

  public get getLastName(): string {
    return this.value;
  }
}
