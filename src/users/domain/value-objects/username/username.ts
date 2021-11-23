import {
  InvalidUsernameError,
  MalformedUsernameError,
  UsernameIsTooLongError,
  UsernameIsTooShortError,
} from '..';
import { ValueObject } from '../../../../core/domain/value-objects';
import { normalizeString } from '../../../../core/helpers';

export class Username extends ValueObject<string> {
  public static readonly MinLength = 6;
  public static readonly MaxLength = 20;
  public static readonly Regex = /^[a-zA-Z0-9\_\-]*$/;

  protected validate(value: string): void {
    if (!value) throw new InvalidUsernameError();

    if (value.length < Username.MinLength) throw new UsernameIsTooShortError();

    if (value.length > Username.MaxLength) throw new UsernameIsTooLongError();

    if (!Username.Regex.test(value)) throw new MalformedUsernameError();
  }

  static create(value: string): Username {
    return new Username(value);
  }

  public get getUsername(): string {
    return this.value;
  }

  public get getNormalizedUsername(): string {
    return normalizeString(this.value);
  }
}
