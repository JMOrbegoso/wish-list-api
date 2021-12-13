import { Entity, PrimaryKey, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ collection: 'wishers' })
export class WisherEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;
}
