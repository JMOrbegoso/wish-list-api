import { InvalidSecondsDurationError, SecondsDurationIsTooLongError } from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class SecondsDuration extends ValueObject<number> {
  public static readonly Max = 315360000; // 10 years in seconds

  static zero(): SecondsDuration {
    return new SecondsDuration(0);
  }

  static oneWeek(): SecondsDuration {
    return new SecondsDuration(604800);
  }

  static twoWeeks(): SecondsDuration {
    return new SecondsDuration(1209600);
  }

  protected validate(value: number): void {
    if (!value) throw new InvalidSecondsDurationError();

    if (!Number.isInteger(value)) throw new InvalidSecondsDurationError();

    if (value > SecondsDuration.Max) throw new SecondsDurationIsTooLongError();
  }

  static create(value: number): SecondsDuration {
    return new SecondsDuration(value);
  }

  public get getDuration(): number {
    return this.value;
  }
}
