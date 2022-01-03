import { Db as MongoDatabase } from 'mongodb';
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

export async function dropDatabase(database: MongoDatabase): Promise<void> {
  await database.dropDatabase();
}

export type Seed = {
  /**
   * Deleted basic user:
   * - Deleted.
   * - Not blocked.
   * - Not verified.
   * - Roles: Basic.
   */
  deletedUser: UserDb;
  /**
   * Blocked basic user:
   * - Not deleted.
   * - Blocked.
   * - Not verified.
   * - Roles: Basic.
   */
  blockedUser: UserDb;
  /**
   * Basic user not verified:
   * - Not deleted.
   * - Not blocked.
   * - Not verified.
   * - Roles: Basic.
   */
  unverifiedUser: UserDb;
  /**
   * Valid basic user:
   * - Not deleted.
   * - Not blocked.
   * - Verified.
   * - Roles: Basic.
   */
  basicUser: UserDb;
  /**
   * Valid moderator user:
   * - Not deleted.
   * - Not blocked.
   * - Verified.
   * - Roles: Moderator.
   */
  moderatorUser: UserDb;
  /**
   * Valid admin user:
   * - Not deleted.
   * - Not blocked.
   * - Verified.
   * - Roles: Admin.
   */
  adminUser: UserDb;
  /**
   * Expired refresh token created by **basicUser**.
   */
  expiredRefreshToken: RefreshTokenDb;
  /**
   * Valid refresh token created by **basicUser** with custom Ip address.
   */
  validRefreshToken_1: RefreshTokenDb;
  /**
   * Used refresh token created by **basicUser**.
   */
  usedRefreshToken: RefreshTokenDb;
  /**
   * Revoked refresh token created by **basicUser**.
   */
  revokedRefreshToken: RefreshTokenDb;
  /**
   * Valid refresh token created by **deletedUser** with default Ip address.
   */
  validRefreshToken_2: RefreshTokenDb;
  /**
   * Valid refresh token created by **blockedUser** with custom Ip address.
   */
  validRefreshToken_3: RefreshTokenDb;
  /**
   * Wisher based on **basicUser**.
   */
  basicUserAsWisher: WisherDb;
  /**
   * Wisher based on **moderatorUser**.
   */
  moderatorUserAsWisher: WisherDb;
  /**
   * Public Wish created by **basicUserAsWisher**.
   */
  publicWish_1: WishDb;
  /**
   * Just Friends Wish created by **basicUserAsWisher**.
   */
  justFriendsWish: WishDb;
  /**
   * Only Me Wish created by **moderatorUserAsWisher**.
   */
  onlyMeWish: WishDb;
  /**
   * Public Wish created by **moderatorUserAsWisher**.
   */
  publicWish_2: WishDb;
  /**
   * Wish Stage 1 owned by **PublicWish_1**.
   */
  wishStage_1_of_PublicWish_1: WishStageDb;
  /**
   * Wish Stage 2 owned by **PublicWish_1**.
   */
  wishStage_2_of_PublicWish_1: WishStageDb;
  /**
   * Wish Stage 1 owned by **JustFriendsWish**.
   */
  wishStage_1_of_JustFriendsWish: WishStageDb;
  /**
   * Wish Stage 2 owned by **JustFriendsWish**.
   */
  wishStage_2_of_JustFriendsWish: WishStageDb;
  /**
   * Wish Stage owned by **PublicWish_2**.
   */
  wishStage_of_PublicWish_2: WishStageDb;
};

export async function seedDatabaseItems(
  database: MongoDatabase,
): Promise<Seed> {
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

  const moderatorUser = await seedUser(
    database,
    'Stephen@Doe.com',
    'Stephen_Doe',
    'passworD$_4',
    true,
    false,
    'Stephen',
    'Doe',
    new Date(),
    new Date(),
    new Date(),
    'A nice person.',
    'https://www.example.com/stephen/',
    null,
    [Role.moderator().getRole],
  );

  const adminUser = await seedUser(
    database,
    'Sylvester@Doe.com',
    'Sylvester_Doe',
    'passworD$_4',
    true,
    false,
    'Sylvester',
    'Doe',
    new Date(),
    new Date(),
    new Date(),
    'A nice person.',
    'https://www.example.com/sylvester/',
    null,
    [Role.admin().getRole],
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

  const basicUserAsWisher = await seedWisher(
    database,
    basicUser._id.toString(),
  );
  const moderatorUserAsWisher = await seedWisher(
    database,
    moderatorUser._id.toString(),
  );

  // Seed wishes

  const publicWish_1 = await seedWish(
    database,
    basicUserAsWisher._id.toString(),
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

  const justFriendsWish = await seedWish(
    database,
    basicUserAsWisher._id.toString(),
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

  const onlyMeWish = await seedWish(
    database,
    moderatorUserAsWisher._id.toString(),
    'Write a book',
    'Write an autobiographical book.',
    PrivacyLevel.OnlyMe,
    new Date(),
    new Date(),
  );

  const publicWish_2 = await seedWish(
    database,
    moderatorUserAsWisher._id.toString(),
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

  const wishStage_1_of_PublicWish_1 = await seedWishStage(
    database,
    publicWish_1._id.toString(),
    'Found the best laptop model',
    'Find a nice laptop model to buy.',
    new Date(),
    ['https://www.example.com/stage', 'https://www.example.net/stage'],
    [
      'https://www.example.com/stage/1.png',
      'https://www.example.com/stage/2.png',
    ],
  );

  const wishStage_2_of_PublicWish_1 = await seedWishStage(
    database,
    publicWish_1._id.toString(),
    'Buy it!',
    'Buy the laptop.',
    new Date(),
    ['https://www.example.com/stage'],
    ['https://www.example.com/stage/1.png'],
  );

  const wishStage_1_of_JustFriendsWish = await seedWishStage(
    database,
    justFriendsWish._id.toString(),
    'Choose a multiplatform framework',
    'Cross-platform framework with support for desktop Windows apps.',
    new Date(),
    [],
    [],
  );

  const wishStage_2_of_JustFriendsWish = await seedWishStage(
    database,
    justFriendsWish._id.toString(),
    'Install the IDE',
    'Install the IDE to start with the development of the app.',
    new Date(),
    [],
    [],
  );

  const wishStage_of_PublicWish_2 = await seedWishStage(
    database,
    publicWish_2._id.toString(),
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
    moderatorUser,
    adminUser,
    expiredRefreshToken,
    validRefreshToken_1,
    usedRefreshToken,
    revokedRefreshToken,
    validRefreshToken_2,
    validRefreshToken_3,
    basicUserAsWisher,
    moderatorUserAsWisher,
    publicWish_1,
    justFriendsWish,
    onlyMeWish,
    publicWish_2,
    wishStage_1_of_PublicWish_1,
    wishStage_2_of_PublicWish_1,
    wishStage_1_of_JustFriendsWish,
    wishStage_2_of_JustFriendsWish,
    wishStage_of_PublicWish_2,
  };
}
