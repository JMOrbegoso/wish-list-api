import { ValueObject } from '..';

export class WishDateMetadata extends ValueObject<number> {
  validate(value: number): void {
    if (!value) throw new Error('Invalid date.');
  }

  static create(value?: number): WishDateMetadata {
    if (!value) {
      const milliseconds = Date.now();
      return new WishDateMetadata(milliseconds);
    }

    return new WishDateMetadata(value);
  }
}
