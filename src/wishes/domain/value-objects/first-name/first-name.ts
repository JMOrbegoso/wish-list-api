import { ValueObject } from '../../../../core/domain/value-objects';

export class FirstName extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new Error('Invalid first name.');
  }

  static create(value: string): FirstName {
    return new FirstName(value);
  }
}
