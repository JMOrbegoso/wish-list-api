import { Db, ObjectId } from 'mongodb';
import { WishStageEntity } from '../../../src/wishes/infrastructure/persistence/entities';

export type WishStageDb = {
  _id: ObjectId;
  wish: ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  urls: string[];
  imageUrls: string[];
};

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
