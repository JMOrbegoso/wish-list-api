import { InvalidMillisecondsDateError, ValueObject } from '..';

export class MillisecondsDate extends ValueObject<number> {
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
