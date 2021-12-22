import {
  Entity,
  EntityRepositoryType,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { RefreshTokenRepositoryMongoDb } from '../repositories';
import { UserEntity } from '.';

@Entity({ collection: 'refresh-tokens' })
export class RefreshTokenEntity {
  [EntityRepositoryType]?: RefreshTokenRepositoryMongoDb;

  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @ManyToOne(() => UserEntity, { wrappedReference: true, nullable: false })
  user: IdentifiedReference<UserEntity>;

  @Property()
  createdAt: Date;

  @Property()
  duration!: number;

  @Property()
  ipAddress!: string;

  @Property({ nullable: true })
  replacedAt?: Date;

  @Property({ nullable: true })
  replacedBy?: string;

  @Property({ nullable: true })
  revokedAt?: Date;
}
