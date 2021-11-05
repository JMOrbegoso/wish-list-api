import { ValueObject } from '../../../../core/domain/value-objects';

export class Biography extends ValueObject<string> {
  public static readonly MaxLength = 500;

  protected validate(value: string): void {
    if (!value) throw new Error('Invalid biography.');

    if (value.length > Biography.MaxLength)
      throw new Error('Invalid biography.');
  }

  static create(value: string): Biography {
    return new Biography(value);
  }

  public get getBiography(): string {
    return this.value;
  }
}
