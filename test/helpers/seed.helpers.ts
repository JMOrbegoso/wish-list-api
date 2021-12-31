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
  user_1: UserDb;
  user_2: UserDb;
  user_3: UserDb;
  user_4: UserDb;
  refreshToken_1: RefreshTokenDb;
  refreshToken_2: RefreshTokenDb;
  refreshToken_3: RefreshTokenDb;
  refreshToken_4: RefreshTokenDb;
  refreshToken_5: RefreshTokenDb;
  refreshToken_6: RefreshTokenDb;

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

  const user_1 = await seedUser(
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

  const user_2 = await seedUser(
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

  const user_3 = await seedUser(
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

  const user_4 = await seedUser(
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

  const refreshToken_1 = await seedRefreshToken(
    database,
    user_4._id.toString(),
    new Date(2000, 10, 10),
  );

  const refreshToken_2 = await seedRefreshToken(
    database,
    user_4._id.toString(),
    new Date(),
    1000,
    '192.168.0.1',
  );

  const refreshToken_3 = await seedRefreshToken(
    database,
    user_4._id.toString(),
    undefined,
    undefined,
    undefined,
    new Date(),
    refreshToken_1._id.toString(),
  );

  const refreshToken_4 = await seedRefreshToken(
    database,
    user_4._id.toString(),
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    new Date(),
  );

  const refreshToken_5 = await seedRefreshToken(
    database,
    user_1._id.toString(),
  );

  const refreshToken_6 = await seedRefreshToken(
    database,
    user_2._id.toString(),
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
    user_1,
    user_2,
    user_3,
    user_4,
    refreshToken_1,
    refreshToken_2,
    refreshToken_3,
    refreshToken_4,
    refreshToken_5,
    refreshToken_6,
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
