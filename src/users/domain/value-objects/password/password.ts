import {
  InvalidPasswordError,
  MalformedPasswordError,
  PasswordIsTooLongError,
  PasswordIsTooShortError,
} from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class Password extends ValueObject<string> {
  public static readonly MinLength = 6;
  public static readonly MaxLength = 30;
  public static readonly Regex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]).{6,30}$/;

  protected validate(value: string): void {
    if (!value) throw new InvalidPasswordError();

    if (value.length < Password.MinLength) throw new PasswordIsTooShortError();

    if (value.length > Password.MaxLength) throw new PasswordIsTooLongError();

    if (!Password.Regex.test(value)) throw new MalformedPasswordError();
  }

  static create(value: string): Password {
    return new Password(value);
  }

  public get getPassword(): string {
    return this.value;
  }
}
