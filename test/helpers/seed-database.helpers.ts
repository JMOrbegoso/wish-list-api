import { Db, ObjectId } from 'mongodb';
import { PrivacyLevel } from '../../src/wishes/domain/value-objects';
import {
  WishEntity,
  WishStageEntity,
  WisherEntity,
} from '../../src/wishes/infrastructure/persistence/entities';

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
): Promise<void> {
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

  await database
    .collection('wishes')
    .insertOne({ ...wish, wisher: new ObjectId(wisherId) });
}

export async function seedWisher(database: Db, id: string): Promise<void> {
  const wisher = new WisherEntity();
  wisher.id = id;

  await database.collection('wishers').insertOne(wisher);
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
): Promise<void> {
  const wishStage = new WishStageEntity();
  wishStage.id = id;
  wishStage.title = title;
  wishStage.description = description;
  wishStage.createdAt = createdAt;
  wishStage.urls = urls;
  wishStage.imageUrls = imageUrls;

  await database
    .collection('wish-stages')
    .insertOne({ ...wishStage, wish: new ObjectId(wishId) });
}
