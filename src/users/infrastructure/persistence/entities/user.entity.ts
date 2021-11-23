import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  SerializedPrimaryKey,
  Unique,
  Property,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { UserRepositoryMongoDb } from '../repositories';

@Entity({ collection: 'users' })
export class UserEntity {
  [EntityRepositoryType]?: UserRepositoryMongoDb;

  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Unique()
  @Property()
  email: string;

  @Unique()
  @Property()
  normalizedEmail: string;

  @Unique()
  @Property()
  username: string;

  @Unique()
  @Property()
  normalizedUsername: string;

  @Property()
  passwordHash: string;

  @Property()
  isVerified: boolean;

  @Property()
  isBlocked: boolean;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  birthday: Date;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;

  @Property()
  biography: string;

  @Property({ nullable: true })
  profilePicture?: string;

  @Property({ nullable: true })
  deletedAt?: Date;
}
