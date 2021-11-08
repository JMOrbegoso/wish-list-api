import { ValueObject, InvalidMillisecondsDateError } from '..';

export class MillisecondsDate extends ValueObject<number> {
  protected validate(value: number): void {
    if (!value) throw new InvalidMillisecondsDateError();
  }

  static create(): MillisecondsDate {
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
}
