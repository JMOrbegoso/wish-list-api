import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ collection: 'wish-stages' })
export class WishStageEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

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
