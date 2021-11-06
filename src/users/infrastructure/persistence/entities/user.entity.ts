import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  SerializedPrimaryKey,
  Property,
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

  @Property({ nullable: true })
  biography?: string;

  @Property({ nullable: true })
  profilePicture?: string;

  @Property({ nullable: true })
  deletedAt?: Date;
}
