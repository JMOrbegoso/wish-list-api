import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ collection: 'refresh-tokens' })
export class RefreshTokenEntity {
  @Property({ persist: false })
  public static readonly Duration = 14 * 24 * 60 * 60; // 14 days

  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  userId!: string;

  @Property()
  createdAt: Date = new Date();

  @Property()
  duration!: number;

  @Property({ persist: false })
  get expireAt(): Date {
    return new Date(this.createdAt.getTime() + this.duration);
  }

  @Property({ persist: false })
  get isExpired(): boolean {
    return this.expireAt > new Date();
  }

  @Property()
  ip!: string;

  @Property()
  replacedAt?: Date = null;

  @Property()
  replacedBy?: string = null;

  @Property({ persist: false })
  replace(replacedByTokenId: string): void {
    this.replacedBy = replacedByTokenId;
    this.replacedAt = new Date();
  }

  @Property({ persist: false })
  get wasReplaced(): boolean {
    return !!this.replacedBy;
  }

  @Property()
  revokedAt?: Date = null;

  @Property({ persist: false })
  revoke(): void {
    this.revokedAt = new Date();
  }

  @Property({ persist: false })
  get isRevoked(): boolean {
    return !!this.revokedAt;
  }

  @Property({ persist: false })
  get isValid(): boolean {
    return !this.isExpired && !this.wasReplaced && !this.isRevoked;
  }

  public static create(
    id: string,
    userId: string,
    ip: string,
    duration: number = RefreshTokenEntity.Duration,
    createdAt: Date = new Date(),
    replacedAt: Date = null,
    replacedBy: string = null,
    revokedAt: Date = null,
  ): RefreshTokenEntity {
    const refreshToken = new RefreshTokenEntity();

    refreshToken.id = id;
    refreshToken.userId = userId;
    refreshToken.createdAt = createdAt;
    refreshToken.duration = duration;
    refreshToken.ip = ip;
    refreshToken.replacedAt = replacedAt;
    refreshToken.replacedBy = replacedBy;
    refreshToken.revokedAt = revokedAt;

    return refreshToken;
  }
}
