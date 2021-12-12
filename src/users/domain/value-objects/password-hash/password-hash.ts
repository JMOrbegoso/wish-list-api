import { InvalidPasswordHashError } from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class PasswordHash extends ValueObject<string> {
  protected validate(value: string): void {
    if (!value) throw new InvalidPasswordHashError();
  }

  static create(value: string): PasswordHash {
    return new PasswordHash(value);
  }

  public get getPasswordHash(): string {
    return this.value;
  }
}
