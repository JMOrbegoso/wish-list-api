import { VerificationCodeId } from '..';
import { Entity } from '../../../../shared/domain/entities';
import { DateTime } from '../../../../shared/domain/value-objects';
import { SecondsDuration } from '../../value-objects';
import {
  InvalidVerificationCodeCreatedAtError,
  InvalidVerificationCodeDurationError,
} from './exceptions';

export class VerificationCode extends Entity<VerificationCodeId> {
  public static readonly defaultDuration = SecondsDuration.oneDay();

  private _createdAt: DateTime;
  private _secondsDuration: SecondsDuration;

  private constructor(
    id: VerificationCodeId,
    createdAt: DateTime,
    secondsDuration: SecondsDuration,
  ) {
    super(id);

    if (!createdAt) throw new InvalidVerificationCodeCreatedAtError();
    if (!secondsDuration) throw new InvalidVerificationCodeDurationError();

    this._createdAt = createdAt;
    this._secondsDuration = secondsDuration;
  }

  public static create(
    id: VerificationCodeId,
    createdAt: DateTime,
    secondsDuration: SecondsDuration,
  ): VerificationCode {
    return new VerificationCode(id, createdAt, secondsDuration);
  }

  public get createdAt(): DateTime {
    return this._createdAt;
  }

  public get duration(): SecondsDuration {
    return this._secondsDuration;
  }

  public get expireAt(): DateTime {
    return this.createdAt.addSeconds(this._secondsDuration.getDuration);
  }

  public get isExpired(): boolean {
    return this.expireAt.isLesserThanNow();
  }
}
