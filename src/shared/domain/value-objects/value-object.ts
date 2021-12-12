import { deepEqual } from '../../../core/helpers';

export abstract class ValueObject<T> {
  protected readonly value: T;

  protected constructor(value: T) {
    this.validate(value);
    this.value = Object.freeze(value);
  }

  protected abstract validate(value: T): void;

  public equals(other?: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (other.value === undefined) {
      return false;
    }

    return deepEqual(this, other);
  }
}
