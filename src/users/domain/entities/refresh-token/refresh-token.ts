import { AggregateRoot } from '../../../../shared/domain/entities';
import {
  MillisecondsDate,
  UniqueId,
} from '../../../../shared/domain/value-objects';
import { IpAddress, SecondsDuration } from '../../value-objects';

export class RefreshToken extends AggregateRoot {
  public static readonly defaultDuration = SecondsDuration.twoWeeks();

  private _userId: UniqueId;
  private _createdAt: MillisecondsDate;
  private _secondsDuration: SecondsDuration;
  private _ipAddress: IpAddress;
  private _replacedAt?: MillisecondsDate;
  private _replacedBy?: UniqueId;
  private _revokedAt?: MillisecondsDate;

  private constructor(
    id: UniqueId,
    userId: UniqueId,
    createdAt: MillisecondsDate,
    secondsDuration: SecondsDuration,
    ipAddress: IpAddress,
    replacedAt?: MillisecondsDate,
    replacedBy?: UniqueId,
    revokedAt?: MillisecondsDate,
  ) {
    super(id);

    this._userId = userId;
    this._createdAt = createdAt;
    this._secondsDuration = secondsDuration;
    this._ipAddress = ipAddress;
    this._replacedAt = replacedAt;
    this._replacedBy = replacedBy;
    this._revokedAt = revokedAt;
  }

  public static create(
    id: UniqueId,
    userId: UniqueId,
    ipAddress: IpAddress,
    createdAt: MillisecondsDate = MillisecondsDate.create(),
    secondsDuration: SecondsDuration = RefreshToken.defaultDuration,
    replacedAt: MillisecondsDate = null,
    replacedBy: UniqueId = null,
    revokedAt: MillisecondsDate = null,
  ): RefreshToken {
    return new RefreshToken(
      id,
      userId,
      createdAt,
      secondsDuration,
      ipAddress,
      replacedAt,
      replacedBy,
      revokedAt,
    );
  }

  public get id(): UniqueId {
    return this._id;
  }

  public get userId(): UniqueId {
    return this._userId;
  }

  public get createdAt(): MillisecondsDate {
    return this._createdAt;
  }

  public get duration(): number {
    return this._secondsDuration.getDuration;
  }

  public get expireAt(): MillisecondsDate {
    return MillisecondsDate.createFromMilliseconds(
      this.createdAt.getMilliseconds + this.duration,
    );
  }

  public get isExpired(): boolean {
    return new Date() > this.expireAt.getDate;
  }

  public get ipAddress(): string {
    return this._ipAddress.getIpAddress;
  }

  public get replacedAt(): MillisecondsDate {
    return this._replacedAt;
  }

  public get replacedBy(): UniqueId {
    return this._replacedBy;
  }

  public replace(replacedByTokenId: UniqueId): void {
    this._replacedBy = replacedByTokenId;
    this._replacedAt = MillisecondsDate.create();
  }

  public get wasReplaced(): boolean {
    return !!this._replacedBy;
  }

  public get revokedAt(): MillisecondsDate {
    return this._revokedAt;
  }

  public revoke(): void {
    this._revokedAt = MillisecondsDate.create();
  }

  public get isRevoked(): boolean {
    return !!this._revokedAt;
  }

  public get isValid(): boolean {
    return !this.isExpired && !this.wasReplaced && !this.isRevoked;
  }
}
