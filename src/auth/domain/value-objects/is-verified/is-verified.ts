import { ValueObject } from '../../../../core/domain/value-objects';

export class IsVerified extends ValueObject<boolean> {
  static verified(): IsVerified {
    return new IsVerified(true);
  }

  static notVerified(): IsVerified {
    return new IsVerified(false);
  }

  protected validate(value: boolean): void {
    if (value === undefined) throw new Error('Invalid verification status.');

    if (value === null) throw new Error('Invalid verification status.');
  }

  static create(value: boolean): IsVerified {
    return new IsVerified(value);
  }

  public get getStatus(): boolean {
    return this.value;
  }
}
