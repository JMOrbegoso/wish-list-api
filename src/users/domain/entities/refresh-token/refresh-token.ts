import { AggregateRoot } from '../../../../core/domain/entities';
import {
  MillisecondsDate,
  UniqueId,
} from '../../../../core/domain/value-objects';
import { Ip, SecondsDuration } from '../../value-objects';

export class RefreshToken extends AggregateRoot {
  private _userId: UniqueId;
  private _createdAt: MillisecondsDate;
  private _secondsDuration: SecondsDuration;
  private _ip: Ip;
  private _replacedAt?: MillisecondsDate;
  private _replacedBy?: UniqueId;
  private _revokedAt?: MillisecondsDate;

  private constructor(
    id: UniqueId,
    userId: UniqueId,
    createdAt: MillisecondsDate,
    secondsDuration: SecondsDuration,
    ip: Ip,
    replacedAt?: MillisecondsDate,
    replacedBy?: UniqueId,
    revokedAt?: MillisecondsDate,
  ) {
    super(id);

    this._userId = userId;
    this._createdAt = createdAt;
    this._secondsDuration = secondsDuration;
    this._ip = ip;
    this._replacedAt = replacedAt;
    this._replacedBy = replacedBy;
    this._revokedAt = revokedAt;
  }

  public static create(
    id: UniqueId,
    userId: UniqueId,
    createdAt: MillisecondsDate,
    secondsDuration: SecondsDuration,
    ip: Ip,
    replacedAt: MillisecondsDate = null,
    replacedBy: UniqueId = null,
    revokedAt: MillisecondsDate = null,
  ): RefreshToken {
    return new RefreshToken(
      id,
      userId,
      createdAt,
      secondsDuration,
      ip,
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

  public get ip(): string {
    return this._ip.getIp;
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
