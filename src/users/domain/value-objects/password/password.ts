import { ValueObject } from '../../../../core/domain/value-objects';

export class Password extends ValueObject<string> {
  public static readonly MinLength = 6;
  public static readonly MaxLength = 30;
  public static readonly Regex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]).{6,30}$/;

  protected validate(value: string): void {
    if (!value) throw new Error('Invalid password.');

    if (value.length < Password.MinLength) throw new Error('Invalid password.');

    if (value.length > Password.MaxLength) throw new Error('Invalid password.');

    if (!Password.Regex.test(value)) throw new Error('Invalid password.');
  }

  static create(value: string): Password {
    return new Password(value);
  }

  public get getPassword(): string {
    return this.value;
  }
}
