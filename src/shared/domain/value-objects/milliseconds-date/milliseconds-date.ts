import {
  InvalidMillisecondsDateError,
  MalformedIso8601DateError,
  ValueObject,
} from '..';

export class MillisecondsDate extends ValueObject<number> {
  public static readonly Iso8601Regex =
    /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(.000)(?:Z|[+-][01]\d:[0-5]\d)$/;

  protected validate(value: number): void {
    if (!value) throw new InvalidMillisecondsDateError();
  }

  static now(): MillisecondsDate {
    const milliseconds = Date.now();
    return new MillisecondsDate(milliseconds);
  }

  static createFromMilliseconds(value: number): MillisecondsDate {
    return new MillisecondsDate(value);
  }

  static createFromString(value: string): MillisecondsDate {
    if (!value) throw new InvalidMillisecondsDateError();

    if (!MillisecondsDate.Iso8601Regex.test(value))
      throw new MalformedIso8601DateError();

    const date = new Date(value);
    return new MillisecondsDate(date.getTime());
  }

  static createFromDate(value: Date): MillisecondsDate {
    if (!value) throw new InvalidMillisecondsDateError();

    return new MillisecondsDate(value.getTime());
  }

  public get getMilliseconds(): number {
    return this.value;
  }

  public get getDate(): Date {
    return new Date(this.value);
  }

  public isLesser(other: MillisecondsDate): boolean {
    if (!other) throw new InvalidMillisecondsDateError();

    return this.getMilliseconds < other.getMilliseconds;
  }

  public isGreater(other: MillisecondsDate): boolean {
    if (!other) throw new InvalidMillisecondsDateError();

    return this.getMilliseconds > other.getMilliseconds;
  }

  public isLesserThanNow(): boolean {
    return this.isLesser(MillisecondsDate.now());
  }

  public isGreaterThanNow(): boolean {
    return this.isGreater(MillisecondsDate.now());
  }

  public addSeconds(seconds: number): MillisecondsDate {
    const newMilliseconds = this.getMilliseconds + 1000 * seconds;
    const date = new Date(newMilliseconds);
    return MillisecondsDate.createFromDate(date);
  }
}
