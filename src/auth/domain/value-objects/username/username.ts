import { ValueObject } from '../../../../core/domain/value-objects';

export class UserName extends ValueObject<string> {
  public static readonly MinLength = 6;
  public static readonly MaxLength = 20;
  public static readonly Regex = /^[a-zA-Z0-9\_\-]*$/;

  protected validate(value: string): void {
    if (!value) throw new Error('Invalid username.');

    if (value.length < UserName.MinLength) throw new Error('Invalid username.');

    if (value.length > UserName.MaxLength) throw new Error('Invalid username.');

    if (!UserName.Regex.test(value)) throw new Error('Invalid username.');
  }

  static create(value: string): UserName {
    return new UserName(value);
  }

  public get getUserName(): string {
    return this.value;
  }

  public get getNormalizedUserName(): string {
    return this.value.toLowerCase();
  }
}
