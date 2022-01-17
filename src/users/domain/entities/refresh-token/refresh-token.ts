import { RefreshTokenId } from '..';
import { Entity } from '../../../../shared/domain/entities';
import { DateTime } from '../../../../shared/domain/value-objects';
import { IpAddress, SecondsDuration } from '../../value-objects';
import {
  InvalidRefreshTokenCreatedAtError,
  InvalidRefreshTokenDurationError,
  InvalidRefreshTokenError,
  InvalidRefreshTokenIpAddressError,
} from './exceptions';

export class RefreshToken extends Entity<RefreshTokenId> {
  public static readonly defaultDuration = SecondsDuration.twoWeeks();

  private _createdAt: DateTime;
  private _secondsDuration: SecondsDuration;
  private _ipAddress: IpAddress;
  private _replacedAt?: DateTime;
  private _replacedBy?: RefreshTokenId;
  private _revokedAt?: DateTime;

  private constructor(
    id: RefreshTokenId,
    createdAt: DateTime,
    secondsDuration: SecondsDuration,
    ipAddress: IpAddress,
    replacedAt?: DateTime,
    replacedBy?: RefreshTokenId,
    revokedAt?: DateTime,
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
    id: RefreshTokenId,
    ipAddress: IpAddress,
    createdAt: DateTime = DateTime.now(),
    secondsDuration: SecondsDuration = RefreshToken.defaultDuration,
    replacedAt: DateTime = null,
    replacedBy: RefreshTokenId = null,
    revokedAt: DateTime = null,
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

  public get createdAt(): DateTime {
    return this._createdAt;
  }

  public get duration(): number {
    return this._secondsDuration.getDuration;
  }

  public get expireAt(): DateTime {
    return this.createdAt.addSeconds(this.duration);
  }

  public get isExpired(): boolean {
    return this.expireAt.isLesserThanNow();
  }

  public get ipAddress(): string {
    return this._ipAddress.getIpAddress;
  }

  public get replacedAt(): DateTime {
    return this._replacedAt;
  }

  public get replacedBy(): RefreshTokenId {
    return this._replacedBy;
  }

  public replace(replacedByToken: RefreshToken): void {
    if (!replacedByToken) throw new InvalidRefreshTokenError();

    this._replacedBy = replacedByToken.id;
    this._replacedAt = DateTime.now();
  }

  public get wasReplaced(): boolean {
    return !!this._replacedBy;
  }

  public get revokedAt(): DateTime {
    return this._revokedAt;
  }

  public revoke(): void {
    this._revokedAt = DateTime.now();
  }

  public get isRevoked(): boolean {
    return !!this._revokedAt;
  }

  public get isValid(): boolean {
    return !this.isExpired && !this.wasReplaced && !this.isRevoked;
  }
}
