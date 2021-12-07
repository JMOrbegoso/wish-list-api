import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { WishEntity } from '.';

@Entity({ collection: 'wish-stages' })
export class WishStageEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @ManyToOne(() => WishEntity, { wrappedReference: true, nullable: false })
  wish: IdentifiedReference<WishEntity>;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  createdAt: Date;

  @Property()
  urls: string[];

  @Property()
  imageUrls: string[];
}
