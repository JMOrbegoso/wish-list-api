import { ValueObject } from '../../../../core/domain/value-objects';
import { BiographyIsTooLongError, InvalidBiographyError } from '..';

export class Biography extends ValueObject<string> {
  public static readonly MaxLength = 500;

  protected validate(value: string): void {
    if (!value) throw new InvalidBiographyError();

    if (value.length > Biography.MaxLength) throw new BiographyIsTooLongError();
  }

  static create(value: string): Biography {
    return new Biography(value);
  }

  public get getBiography(): string {
    return this.value;
  }
}
