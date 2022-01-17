import {
  InvalidDateTimeError,
  MalformedIso8601DateError,
  ValueObject,
} from '..';

export class DateTime extends ValueObject<number> {
  public static readonly Iso8601Regex =
    /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.(\d{1,}))?(?:Z|[+-][01]\d:[0-5]\d)$/;

  protected validate(value: number): void {
    if (!value) throw new InvalidDateTimeError();
  }

  static now(): DateTime {
    const milliseconds = Date.now();
    return new DateTime(milliseconds);
  }

  static createFromString(value: string): DateTime {
    if (!value) throw new InvalidDateTimeError();

    if (!DateTime.Iso8601Regex.test(value))
      throw new MalformedIso8601DateError();

    const date = new Date(value);
    return new DateTime(date.getTime());
  }

  static createFromDate(value: Date): DateTime {
    if (!value) throw new InvalidDateTimeError();

    return new DateTime(value.getTime());
  }

  public get getMilliseconds(): number {
    return this.value;
  }

  public get getDate(): Date {
    return new Date(this.value);
  }

  public get getIso8601(): string {
    return new Date(this.value).toISOString();
  }

  public isLesser(other: DateTime): boolean {
    if (!other) throw new InvalidDateTimeError();

    return this.getMilliseconds < other.getMilliseconds;
  }

  public isGreater(other: DateTime): boolean {
    if (!other) throw new InvalidDateTimeError();

    return this.getMilliseconds > other.getMilliseconds;
  }

  public isLesserThanNow(): boolean {
    return this.isLesser(DateTime.now());
  }

  public isGreaterThanNow(): boolean {
    return this.isGreater(DateTime.now());
  }

  public addSeconds(seconds: number): DateTime {
    const newMilliseconds = this.getMilliseconds + 1000 * seconds;
    const date = new Date(newMilliseconds);
    return DateTime.createFromDate(date);
  }
}
