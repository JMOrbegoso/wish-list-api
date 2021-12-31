import { MongoClient } from 'mongodb';
import { Role } from '../../src/users/domain/value-objects';
import { PrivacyLevel } from '../../src/wishes/domain/value-objects';
import {
  RefreshTokenDb,
  UserDb,
  WishDb,
  WishStageDb,
  WisherDb,
  seedRefreshToken,
  seedUser,
  seedWish,
  seedWishStage,
  seedWisher,
} from './seeders';

export type Seed = {
  deletedUser: UserDb;
  blockedUser: UserDb;
  unverifiedUser: UserDb;
  basicUser: UserDb;

  expiredRefreshToken: RefreshTokenDb;
  validRefreshToken_1: RefreshTokenDb;
  usedRefreshToken: RefreshTokenDb;
  revokedRefreshToken: RefreshTokenDb;
  validRefreshToken_2: RefreshTokenDb;
  validRefreshToken_3: RefreshTokenDb;

  wisher_1: WisherDb;
  wisher_2: WisherDb;
  wish_1: WishDb;
  wish_2: WishDb;
  wish_3: WishDb;
  wish_4: WishDb;
  wishStage_1: WishStageDb;
  wishStage_2: WishStageDb;
  wishStage_3: WishStageDb;
  wishStage_4: WishStageDb;
  wishStage_5: WishStageDb;
};

export async function seedDatabaseItems(
  mongoClient: MongoClient,
  dbName: string,
): Promise<Seed> {
  const database = mongoClient.db(dbName);

  // Seed users

  const deletedUser = await seedUser(
    database,
    'scott@doe.com',
    'Scott_Doe',
    'passworD$_1',
    false,
    false,
    'Scott',
    'Doe',
    new Date(),
    new Date(),
    new Date(),
    'A nice person.',
    'https://www.example.com/scott/',
    new Date(),
    [Role.basic().getRole],
  );

  const blockedUser = await seedUser(
    database,
    'Christobal@doe.com',
    'Christobal_Doe',
    'passworD$_2',
    false,
    true,
    'Christobal',
    'Doe',
    new Date(),
    new Date(),
    new Date(),
    'A nice person.',
    'https://www.example.com/christobal/',
    null,
    [Role.basic().getRole],
  );

  const unverifiedUser = await seedUser(
    database,
    'Shannon@Doe.com',
    'Shannon_Doe',
    'passworD$_3',
    false,
    false,
    'Shannon',
    'Doe',
    new Date(),
    new Date(),
    new Date(),
    'A nice person.',
    'https://www.example.com/shannon/',
    null,
    [Role.basic().getRole],
  );

  const basicUser = await seedUser(
    database,
    'Anne@Doe.com',
    'Anne_Doe',
    'passworD$_4',
    true,
    false,
    'Anne',
    'Doe',
    new Date(),
    new Date(),
    new Date(),
    'A nice person.',
    'https://www.example.com/anne/',
    null,
    [Role.basic().getRole],
  );

  // Seed refresh tokens

  const expiredRefreshToken = await seedRefreshToken(
    database,
    basicUser._id.toString(),
    new Date(2000, 10, 10),
  );

  const validRefreshToken_1 = await seedRefreshToken(
    database,
    basicUser._id.toString(),
    new Date(),
    1000,
    '192.168.0.1',
  );

  const usedRefreshToken = await seedRefreshToken(
    database,
    basicUser._id.toString(),
    undefined,
    undefined,
    undefined,
    new Date(),
    expiredRefreshToken._id.toString(),
  );

  const revokedRefreshToken = await seedRefreshToken(
    database,
    basicUser._id.toString(),
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    new Date(),
  );

  const validRefreshToken_2 = await seedRefreshToken(
    database,
    deletedUser._id.toString(),
  );

  const validRefreshToken_3 = await seedRefreshToken(
    database,
    blockedUser._id.toString(),
    undefined,
    undefined,
    '192.168.0.1',
  );

  // Seed wishers

  const wisher_1 = await seedWisher(database);
  const wisher_2 = await seedWisher(database);

  // Seed wishes

  const wish_1 = await seedWish(
    database,
    wisher_1._id.toString(),
    'New Laptop',
    'A brand new laptop.',
    PrivacyLevel.Public,
    new Date(),
    new Date(),
    ['https://www.example.com', 'https://www.example.net'],
    ['https://www.example.com/1.jpg', 'https://www.example.net/1.jpg'],
    ['Tech', 'Shopping'],
    null,
    new Date(),
    new Date(),
  );

  const wish_2 = await seedWish(
    database,
    wisher_1._id.toString(),
    'Develop a TODO app.',
    'Develop a cross-platform app.',
    PrivacyLevel.JustFriends,
    new Date(),
    new Date(),
    ['https://www.example.com'],
    ['https://www.example.com/1.jpg'],
    ['Development'],
    null,
    null,
    new Date(),
  );

  const wish_3 = await seedWish(
    database,
    wisher_2._id.toString(),
    'Write a book',
    'Write an autobiographical book.',
    PrivacyLevel.OnlyMe,
    new Date(),
    new Date(),
  );

  const wish_4 = await seedWish(
    database,
    wisher_2._id.toString(),
    'Learn to swim',
    'Learn various swimming styles.',
    PrivacyLevel.Public,
    new Date(),
    new Date(),
    ['https://www.example.com', 'https://www.example.net'],
    ['https://www.example.com/1.jpg', 'https://www.example.net/1.jpg'],
    ['Sports', 'Learn'],
    new Date(),
  );

  // Seed wish stages

  const wishStage_1 = await seedWishStage(
    database,
    wish_1._id.toString(),
    'Found the best laptop model',
    'Find a nice laptop model to buy.',
    new Date(),
    ['https://www.example.com/stage', 'https://www.example.net/stage'],
    [
      'https://www.example.com/stage/1.png',
      'https://www.example.com/stage/2.png',
    ],
  );

  const wishStage_2 = await seedWishStage(
    database,
    wish_1._id.toString(),
    'Buy it!',
    'Buy the laptop.',
    new Date(),
    ['https://www.example.com/stage'],
    ['https://www.example.com/stage/1.png'],
  );

  const wishStage_3 = await seedWishStage(
    database,
    wish_2._id.toString(),
    'Choose a multiplatform framework',
    'Cross-platform framework with support for desktop Windows apps.',
    new Date(),
    [],
    [],
  );

  const wishStage_4 = await seedWishStage(
    database,
    wish_2._id.toString(),
    'Install the IDE',
    'Install the IDE to start with the development of the app.',
    new Date(),
    [],
    [],
  );

  const wishStage_5 = await seedWishStage(
    database,
    wish_4._id.toString(),
    'Enroll in a swimming school',
    'Swimming school near my house.',
    new Date(),
    [],
    [],
  );

  return {
    deletedUser,
    blockedUser,
    unverifiedUser,
    basicUser,
    expiredRefreshToken,
    validRefreshToken_1,
    usedRefreshToken,
    revokedRefreshToken,
    validRefreshToken_2,
    validRefreshToken_3,
    wisher_1,
    wisher_2,
    wish_1,
    wish_2,
    wish_3,
    wish_4,
    wishStage_1,
    wishStage_2,
    wishStage_3,
    wishStage_4,
    wishStage_5,
  };
}
