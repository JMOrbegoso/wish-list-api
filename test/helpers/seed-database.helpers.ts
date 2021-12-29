import { Db, ObjectId } from 'mongodb';
import { PrivacyLevel } from '../../src/wishes/domain/value-objects';
import {
  WishEntity,
  WishStageEntity,
  WisherEntity,
} from '../../src/wishes/infrastructure/persistence/entities';

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

export type WisherDb = { _id: ObjectId };

export type WishStageDb = {
  _id: ObjectId;
  wish: ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  urls: string[];
  imageUrls: string[];
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

export async function seedWisher(database: Db, id: string): Promise<WisherDb> {
  const wisher = new WisherEntity();
  wisher.id = id;

  const record = { ...wisher };
  await database.collection('wishers').insertOne(record);
  return record;
}

export async function seedWishStage(
  database: Db,
  id: string,
  wishId: string,
  title = 'wish stage title',
  description = 'wish stage description',
  createdAt: Date = new Date(),
  urls: string[] = [],
  imageUrls: string[] = [],
): Promise<WishStageDb> {
  const wishStage = new WishStageEntity();
  wishStage.id = id;
  wishStage.title = title;
  wishStage.description = description;
  wishStage.createdAt = createdAt;
  wishStage.urls = urls;
  wishStage.imageUrls = imageUrls;

  const record = { ...wishStage, wish: new ObjectId(wishId) };
  await database.collection('wish-stages').insertOne(record);
  return record;
}
