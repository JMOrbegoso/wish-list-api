import { Db, ObjectId } from 'mongodb';
import { RefreshTokenEntity } from '../../../src/users/infrastructure/persistence/entities';

export type RefreshTokenDb = {
  _id: ObjectId;
  user: ObjectId;
  createdAt: Date;
  duration: number;
  ipAddress: string;
  replacedAt?: Date;
  replacedBy?: string;
  revokedAt?: Date;
};

export async function seedRefreshToken(
  database: Db,
  userId: string,
  createdAt: Date = new Date(),
  duration = 1000,
  ipAddress = '::ffff:127.0.0.1',
  replacedAt?: Date,
  replacedBy?: string,
  revokedAt?: Date,
): Promise<RefreshTokenDb> {
  const refreshToken = new RefreshTokenEntity();

  refreshToken.id = new ObjectId().toString();
  refreshToken.createdAt = createdAt;
  refreshToken.duration = duration;
  refreshToken.ipAddress = ipAddress;
  refreshToken.replacedAt = replacedAt;
  refreshToken.replacedBy = replacedBy;
  refreshToken.revokedAt = revokedAt;

  const record = { ...refreshToken, user: new ObjectId(userId) };
  await database.collection('refresh-tokens').insertOne(record);
  return record;
}
