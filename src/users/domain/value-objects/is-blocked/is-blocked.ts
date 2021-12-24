import { InvalidBlockedStatusError } from '..';
import { ValueObject } from '../../../../shared/domain/value-objects';

export class IsBlocked extends ValueObject<boolean> {
  static blocked(): IsBlocked {
    return new IsBlocked(true);
  }

  static notBlocked(): IsBlocked {
    return new IsBlocked(false);
  }

  protected validate(value: boolean): void {
    if (value === undefined) throw new InvalidBlockedStatusError();

    if (value === null) throw new InvalidBlockedStatusError();
  }

  static create(value: boolean): IsBlocked {
    return new IsBlocked(value);
  }

  public get getStatus(): boolean {
    return this.value;
  }
}
