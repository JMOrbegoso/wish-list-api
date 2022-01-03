import { Db as MongoDatabase } from 'mongodb';

export async function dropDatabase(database: MongoDatabase): Promise<void> {
  await database.dropDatabase();
}
