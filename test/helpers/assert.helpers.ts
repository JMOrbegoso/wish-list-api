import { OutputUserDto } from '../../src/users/application/dtos';
import { RefreshTokenEntity } from '../../src/users/infrastructure/persistence/entities';
import {
  OutputWishDto,
  OutputWishStageDto,
} from '../../src/wishes/application/dtos';
import {
  WishEntity,
  WishStageEntity,
} from '../../src/wishes/infrastructure/persistence/entities';
import { RefreshTokenDb, UserDb, WishDb, WishStageDb } from '.';

export function assertOutputWish(
  outputWish: OutputWishDto,
  wishDb: WishDb,
): void {
  expect(outputWish).toBeTruthy();
  expect(outputWish.id).toBe(wishDb._id.toString());
  expect(outputWish.wisherId).toBe(wishDb.wisher.toString());
  expect(outputWish.title).toBe(wishDb.title);
  expect(outputWish.description).toBe(wishDb.description);
  expect(outputWish.privacyLevel).toBe(wishDb.privacyLevel);
  expect(outputWish.createdAt).toBe(wishDb.createdAt.toISOString());
  expect(outputWish.updatedAt).toBe(wishDb.updatedAt.toISOString());

  for (let i = 0; i < wishDb.urls.length; i++)
    expect(outputWish.urls[i]).toBe(wishDb.urls[i]);

  for (let i = 0; i < wishDb.imageUrls.length; i++)
    expect(outputWish.imageUrls[i]).toBe(wishDb.imageUrls[i]);

  for (let i = 0; i < wishDb.categories.length; i++)
    expect(outputWish.categories[i]).toBe(wishDb.categories[i]);

  if (wishDb.deletedAt)
    expect(outputWish.deletedAt).toBe(wishDb.deletedAt.toISOString());
  else expect(outputWish.deletedAt).toBeNull();

  if (wishDb.startedAt)
    expect(outputWish.startedAt).toBe(wishDb.startedAt.toISOString());
  else expect(outputWish.startedAt).toBeNull();

  if (wishDb.completedAt)
    expect(outputWish.completedAt).toBe(wishDb.completedAt.toISOString());
  else expect(outputWish.completedAt).toBeNull();
}

export function assertOutputWishStage(
  outputWishStage: OutputWishStageDto,
  wishStageDb: WishStageDb,
): void {
  expect(outputWishStage).toBeTruthy();
  expect(outputWishStage.id).toBe(wishStageDb._id.toString());
  expect(outputWishStage.title).toBe(wishStageDb.title);
  expect(outputWishStage.description).toBe(wishStageDb.description);
  expect(outputWishStage.createdAt).toBe(wishStageDb.createdAt.toISOString());

  for (let i = 0; i < wishStageDb.urls.length; i++)
    expect(outputWishStage.urls[i]).toBe(wishStageDb.urls[i]);

  for (let i = 0; i < wishStageDb.imageUrls.length; i++)
    expect(outputWishStage.imageUrls[i]).toBe(wishStageDb.imageUrls[i]);
}

export function assertWishStage(
  wishStageEntity: WishStageEntity,
  wishStageDb: WishStageDb,
): void {
  expect(wishStageEntity).toBeTruthy();

  expect(wishStageEntity._id.toString()).toBe(wishStageDb._id.toString());
  expect(wishStageEntity.title).toBe(wishStageDb.title);
  expect(wishStageEntity.description).toBe(wishStageDb.description);
  expect(wishStageEntity.createdAt.toISOString()).toBe(
    wishStageDb.createdAt.toISOString(),
  );

  for (let i = 0; i < wishStageDb.urls.length; i++)
    expect(wishStageEntity.urls[i]).toBe(wishStageDb.urls[i]);

  for (let i = 0; i < wishStageDb.imageUrls.length; i++)
    expect(wishStageEntity.imageUrls[i]).toBe(wishStageDb.imageUrls[i]);
}

export function assertWish(wishEntity: WishEntity, wishDb: WishDb): void {
  expect(wishEntity).toBeTruthy();

  expect(wishEntity._id.toString()).toBe(wishDb._id.toString());
  expect(wishEntity.wisher.toString()).toBe(wishDb.wisher.toString());
  expect(wishEntity.title).toBe(wishDb.title);
  expect(wishEntity.description).toBe(wishDb.description);
  expect(wishEntity.privacyLevel).toBe(wishDb.privacyLevel);
  expect(wishEntity.createdAt.toISOString()).toBe(
    wishDb.createdAt.toISOString(),
  );
  expect(wishEntity.updatedAt).toBeTruthy();

  for (let i = 0; i < wishDb.urls.length; i++)
    expect(wishEntity.urls[i]).toBe(wishDb.urls[i]);

  for (let i = 0; i < wishDb.imageUrls.length; i++)
    expect(wishEntity.imageUrls[i]).toBe(wishDb.imageUrls[i]);

  for (let i = 0; i < wishDb.categories.length; i++)
    expect(wishEntity.categories[i]).toBe(wishDb.categories[i]);

  if (wishDb.deletedAt)
    expect(wishEntity.deletedAt.toISOString()).toBe(
      wishDb.deletedAt.toISOString(),
    );
  else expect(wishEntity.deletedAt).toBeNull();

  if (wishDb.startedAt)
    expect(wishEntity.startedAt.toISOString()).toBe(
      wishDb.startedAt.toISOString(),
    );
  else expect(wishEntity.startedAt).toBeNull();

  if (wishDb.completedAt)
    expect(wishEntity.completedAt.toISOString()).toBe(
      wishDb.completedAt.toISOString(),
    );
  else expect(wishEntity.completedAt).toBeNull();
}

export function assertOutputUser(
  outputUser: OutputUserDto,
  userDb: UserDb,
): void {
  expect(outputUser).toBeTruthy();

  expect(outputUser.id).toBe(userDb._id.toString());
  expect(outputUser.email).toBe(userDb.email);
  expect(outputUser.username).toBe(userDb.username);
  expect(outputUser.isVerified).toBe(userDb.isVerified);
  expect(outputUser.isBlocked).toBe(userDb.isBlocked);
  expect(outputUser.firstName).toBe(userDb.firstName);
  expect(outputUser.lastName).toBe(userDb.lastName);
  expect(outputUser.birthday).toBe(userDb.birthday.toISOString());
  expect(outputUser.createdAt).toBe(userDb.createdAt.toISOString());
  expect(outputUser.updatedAt).toBe(userDb.updatedAt.toISOString());
  expect(outputUser.biography).toBe(userDb.biography);

  for (let i = 0; i < userDb.roles.length; i++)
    expect(outputUser.roles[i]).toBe(userDb.roles[i]);

  if (userDb.profilePicture)
    expect(outputUser.profilePicture).toBe(userDb.profilePicture);
  else expect(outputUser.profilePicture).toBeNull();

  if (userDb.deletedAt)
    expect(outputUser.deletedAt).toBe(userDb.deletedAt.toISOString());
  else expect(outputUser.deletedAt).toBeNull();
}

export function assertRefreshToken(
  refreshToken: RefreshTokenEntity,
  refreshTokenDb: RefreshTokenDb,
): void {
  expect(refreshToken).toBeTruthy();

  expect(refreshToken._id.toString()).toBe(refreshTokenDb._id.toString());
  expect(refreshToken.user.toString()).toBe(refreshTokenDb.user.toString());
  expect(refreshToken.createdAt.toISOString()).toBe(
    refreshTokenDb.createdAt.toISOString(),
  );
  expect(refreshToken.duration).toBe(refreshTokenDb.duration);
  expect(refreshToken.ipAddress).toBe(refreshTokenDb.ipAddress);

  if (refreshTokenDb.replacedAt)
    expect(refreshToken.replacedAt.toISOString()).toBe(
      refreshTokenDb.replacedAt.toISOString(),
    );
  else expect(refreshToken.replacedAt).toBeNull();

  if (refreshTokenDb.replacedBy)
    expect(refreshToken.replacedBy).toBe(refreshTokenDb.replacedBy);
  else expect(refreshToken.replacedBy).toBeNull();

  if (refreshTokenDb.revokedAt)
    expect(refreshToken.revokedAt.toISOString()).toBe(
      refreshTokenDb.revokedAt.toISOString(),
    );
  else expect(refreshToken.revokedAt).toBeNull();
}
