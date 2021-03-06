import { InvalidEmailError, MalformedEmailError } from '..';
import { normalizeString } from '../../../../core/helpers';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class Email extends ValueObject<string> {
  public static readonly Regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  protected validate(value: string): void {
    if (!value) throw new InvalidEmailError();

    if (!Email.Regex.test(value.toLowerCase())) throw new MalformedEmailError();
  }

  static create(value: string): Email {
    return new Email(value);
  }

  public get getEmail(): string {
    return this.value;
  }

  public get getNormalizedEmail(): string {
    return normalizeString(this.value);
  }
}
