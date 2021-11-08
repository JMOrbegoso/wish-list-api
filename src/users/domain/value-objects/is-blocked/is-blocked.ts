import { ValueObject } from '../../../../core/domain/value-objects';
import { InvalidIsBlockedStatus } from './invalid-is-blocked-status';

export class IsBlocked extends ValueObject<boolean> {
  static blocked(): IsBlocked {
    return new IsBlocked(true);
  }

  static notBlocked(): IsBlocked {
    return new IsBlocked(false);
  }

  protected validate(value: boolean): void {
    if (value === undefined) throw new InvalidIsBlockedStatus();

    if (value === null) throw new InvalidIsBlockedStatus();
  }

  static create(value: boolean): IsBlocked {
    return new IsBlocked(value);
  }

  public get getStatus(): boolean {
    return this.value;
  }
}
