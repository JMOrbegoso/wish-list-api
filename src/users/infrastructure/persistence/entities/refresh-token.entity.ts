import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { RefreshTokenRepositoryMongoDb } from '../repositories';

@Entity({ collection: 'refresh-tokens' })
export class RefreshTokenEntity {
  [EntityRepositoryType]?: RefreshTokenRepositoryMongoDb;

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
