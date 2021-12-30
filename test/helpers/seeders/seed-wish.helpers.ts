import { Db, ObjectId } from 'mongodb';
import { PrivacyLevel } from '../../../src/wishes/domain/value-objects';
import { WishEntity } from '../../../src/wishes/infrastructure/persistence/entities';

export type WishDb = {
  _id: ObjectId;
  wisher: ObjectId;
  title: string;
  description: string;
  privacyLevel: PrivacyLevel;
  createdAt: Date;
  updatedAt: Date;
  urls: string[];
  imageUrls: string[];
  categories: string[];
  deletedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
};

export async function seedWish(
  database: Db,
  id: string,
  wisherId: string,
  title = 'wish title',
  description = 'wish description',
  privacyLevel: PrivacyLevel = PrivacyLevel.Public,
  createdAt: Date = new Date(),
  updatedAt: Date = new Date(),
  urls: string[] = [],
  imageUrls: string[] = [],
  categories: string[] = [],
  deletedAt?: Date,
  startedAt?: Date,
  completedAt?: Date,
): Promise<WishDb> {
  const wish = new WishEntity();
  wish.id = id;
  wish.title = title;
  wish.description = description;
  wish.privacyLevel = privacyLevel;
  wish.createdAt = createdAt;
  wish.updatedAt = updatedAt;
  wish.urls = urls;
  wish.imageUrls = imageUrls;
  wish.categories = categories;
  wish.deletedAt = deletedAt;
  wish.startedAt = startedAt;
  wish.completedAt = completedAt;

  delete wish.stages;

  const record = { ...wish, wisher: new ObjectId(wisherId) };
  await database.collection('wishes').insertOne(record);
  return record;
}
