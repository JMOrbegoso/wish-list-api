import {
  InvalidUserNameError,
  UserNameIsTooShortError,
  UserNameIsTooLongError,
  MalformedUserNameError,
} from '..';
import { ValueObject } from '../../../../core/domain/value-objects';
import { normalizeString } from '../../../../core/helpers';

export class UserName extends ValueObject<string> {
  public static readonly MinLength = 6;
  public static readonly MaxLength = 20;
  public static readonly Regex = /^[a-zA-Z0-9\_\-]*$/;

  protected validate(value: string): void {
    if (!value) throw new InvalidUserNameError();

    if (value.length < UserName.MinLength) throw new UserNameIsTooShortError();

    if (value.length > UserName.MaxLength) throw new UserNameIsTooLongError();

    if (!UserName.Regex.test(value)) throw new MalformedUserNameError();
  }

  static create(value: string): UserName {
    return new UserName(value);
  }

  public get getUserName(): string {
    return this.value;
  }

  public get getNormalizedUserName(): string {
    return normalizeString(this.value);
  }
}
