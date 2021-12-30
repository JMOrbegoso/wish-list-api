import { Db, ObjectId } from 'mongodb';
import { WisherEntity } from '../../../src/wishes/infrastructure/persistence/entities';

export type WisherDb = { _id: ObjectId };

export async function seedWisher(database: Db, id: string): Promise<WisherDb> {
  const wisher = new WisherEntity();
  wisher.id = id;

  const record = { ...wisher };
  await database.collection('wishers').insertOne(record);
  return record;
}
