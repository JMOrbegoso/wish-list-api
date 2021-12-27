import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { PrivacyLevel } from '../../../domain/value-objects';
import { WishRepositoryMongoDb } from '../repositories';
import { WishStageEntity, WisherEntity } from '.';

@Entity({ collection: 'wishes' })
export class WishEntity {
  [EntityRepositoryType]?: WishRepositoryMongoDb;

  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  title: string;

  @Property()
  description: string;

  @Enum(() => PrivacyLevel)
  privacyLevel!: PrivacyLevel;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;

  @ManyToOne(() => WisherEntity, { nullable: false })
  wisher: WisherEntity;

  @Property()
  urls: string[];

  @Property()
  imageUrls: string[];

  @Property()
  categories: string[];

  @OneToMany(() => WishStageEntity, (stage) => stage.wish)
  stages = new Collection<WishStageEntity>(this);

  @Property({ nullable: true })
  startedAt?: Date;

  @Property({ nullable: true })
  deletedAt?: Date;

  @Property({ nullable: true })
  completedAt?: Date;
}
