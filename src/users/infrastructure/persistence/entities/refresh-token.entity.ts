import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ collection: 'refresh-tokens' })
export class RefreshTokenEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  userId!: string;

  @Property()
  createdAt: Date;

  @Property()
  duration!: number;

  @Property()
  ip!: string;

  @Property()
  replacedAt?: Date;

  @Property()
  replacedBy?: string;

  @Property()
  revokedAt?: Date;
}
