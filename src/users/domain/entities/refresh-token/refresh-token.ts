import { Entity } from '../../../../shared/domain/entities';
import {
  MillisecondsDate,
  UniqueId,
} from '../../../../shared/domain/value-objects';
import { IpAddress, SecondsDuration } from '../../value-objects';
import {
  InvalidRefreshTokenCreatedAtError,
  InvalidRefreshTokenDurationError,
  InvalidRefreshTokenError,
  InvalidRefreshTokenIpAddressError,
} from './exceptions';

export class RefreshToken extends Entity {
  public static readonly defaultDuration = SecondsDuration.twoWeeks();

  private _createdAt: MillisecondsDate;
  private _secondsDuration: SecondsDuration;
  private _ipAddress: IpAddress;
  private _replacedAt?: MillisecondsDate;
  private _replacedBy?: UniqueId;
  private _revokedAt?: MillisecondsDate;

  private constructor(
    id: UniqueId,
    createdAt: MillisecondsDate,
    secondsDuration: SecondsDuration,
    ipAddress: IpAddress,
    replacedAt?: MillisecondsDate,
    replacedBy?: UniqueId,
    revokedAt?: MillisecondsDate,
  ) {
    super(id);

    if (!createdAt) throw new InvalidRefreshTokenCreatedAtError();
    if (!secondsDuration) throw new InvalidRefreshTokenDurationError();
    if (!ipAddress) throw new InvalidRefreshTokenIpAddressError();
    if (!replacedAt) replacedAt = null;
    if (!replacedBy) replacedBy = null;
    if (!revokedAt) revokedAt = null;

    this._createdAt = createdAt;
    this._secondsDuration = secondsDuration;
    this._ipAddress = ipAddress;
    this._replacedAt = replacedAt;
    this._replacedBy = replacedBy;
    this._revokedAt = revokedAt;
  }

  public static create(
    id: UniqueId,
    ipAddress: IpAddress,
    createdAt: MillisecondsDate = MillisecondsDate.create(),
    secondsDuration: SecondsDuration = RefreshToken.defaultDuration,
    replacedAt: MillisecondsDate = null,
    replacedBy: UniqueId = null,
    revokedAt: MillisecondsDate = null,
  ): RefreshToken {
    return new RefreshToken(
      id,
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

  public get createdAt(): MillisecondsDate {
    return this._createdAt;
  }

  public get duration(): number {
    return this._secondsDuration.getDuration;
  }

  public get expireAt(): MillisecondsDate {
    return MillisecondsDate.createFromMilliseconds(
      this.createdAt.getMilliseconds + 1000 * this.duration,
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

  public replace(replacedByToken: RefreshToken): void {
    if (!replacedByToken) throw new InvalidRefreshTokenError();

    this._replacedBy = replacedByToken.id;
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
