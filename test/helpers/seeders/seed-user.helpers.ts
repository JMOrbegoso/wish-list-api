import { Db, ObjectId } from 'mongodb';
import { normalizeString } from '../../../src/core/helpers';
import { UserEntity } from '../../../src/users/infrastructure/persistence/entities';
import { EncryptionServiceBcrypt } from '../../../src/users/infrastructure/services';

export type UserDb = {
  _id: ObjectId;
  email: string;
  normalizedEmail: string;
  username: string;
  normalizedUsername: string;
  password: string;
  passwordHash: string;
  isVerified: boolean;
  verificationCode: string;
  isBlocked: boolean;
  firstName: string;
  lastName: string;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
  biography: string;
  profilePicture?: string;
  deletedAt?: Date;
  roles: string[];
};

export async function seedUser(
  database: Db,
  email: string,
  username: string,
  password: string,
  isVerified: boolean,
  isBlocked: boolean,
  firstName: string,
  lastName: string,
  birthday: Date,
  createdAt: Date = new Date(),
  updatedAt: Date = new Date(),
  biography: string,
  profilePicture?: string,
  deletedAt?: Date,
  roles: string[] = [],
): Promise<UserDb> {
  const user = new UserEntity();

  user.id = new ObjectId().toString();
  user.email = email;
  user.normalizedEmail = normalizeString(email);
  user.username = username;
  user.normalizedUsername = normalizeString(username);
  user.passwordHash = new EncryptionServiceBcrypt().hashPassword(password);
  user.isVerified = isVerified;
  user.verificationCode = new ObjectId().toString();
  user.isBlocked = isBlocked;
  user.firstName = firstName;
  user.lastName = lastName;
  user.birthday = birthday;
  user.createdAt = createdAt;
  user.updatedAt = updatedAt;
  user.biography = biography;
  user.profilePicture = profilePicture;
  user.deletedAt = deletedAt;
  user.roles = roles;

  delete user.refreshTokens;

  const record = { ...user };
  await database.collection('users').insertOne(record);
  return { ...record, password };
}
