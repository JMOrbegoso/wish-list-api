import { MongoClient } from 'mongodb';

export async function dropDatabase(
  mongoClient: MongoClient,
  dbName: string,
): Promise<void> {
  const database = mongoClient.db(dbName);

  await database.dropDatabase();
}
