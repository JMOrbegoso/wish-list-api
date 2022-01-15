import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { UserEntity } from '.';

@Entity({ collection: 'user-verification-codes' })
export class VerificationCodeEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @ManyToOne(() => UserEntity, { wrappedReference: true, nullable: false })
  user: IdentifiedReference<UserEntity>;

  @Property()
  createdAt!: Date;

  @Property()
  duration!: number;
}
