import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { UserMongoDbRepository } from '../repositories';

@Entity({ collection: 'users' })
export class UserEntity {
  [EntityRepositoryType]?: UserMongoDbRepository;

  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  email: string;

  @Property()
  userName: string;

  @Property()
  passwordHash: string;

  @Property()
  isVerified: boolean;

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
  biography?: string;

  @Property()
  profilePicture?: string;

  @Property()
  deletedAt?: Date;
}
