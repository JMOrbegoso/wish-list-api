import { ValueObject } from '..';

export class MillisecondsDate extends ValueObject<number> {
  validate(value: number): void {
    if (!value) throw new Error('Invalid date.');
  }

  static create(value?: number): MillisecondsDate {
    if (!value) {
      const milliseconds = Date.now();
      return new MillisecondsDate(milliseconds);
    }

    return new MillisecondsDate(value);
  }
}
