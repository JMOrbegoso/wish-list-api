import { Db, ObjectId } from 'mongodb';
import { VerificationCode } from '../../../src/users/domain/entities';
import { VerificationCodeEntity } from '../../../src/users/infrastructure/persistence/entities';

export type VerificationCodeDb = {
  _id: ObjectId;
  user: ObjectId;
  createdAt: Date;
  duration: number;
};

export async function seedVerificationCode(
  database: Db,
  userId: string,
  createdAt: Date = new Date(),
  duration = VerificationCode.defaultDuration.getDuration,
): Promise<VerificationCodeDb> {
  const verificationCode = new VerificationCodeEntity();

  verificationCode.id = new ObjectId().toString();
  verificationCode.createdAt = createdAt;
  verificationCode.duration = duration;

  const record = { ...verificationCode, user: new ObjectId(userId) };
  await database.collection('user-verification-codes').insertOne(record);
  return record;
}
