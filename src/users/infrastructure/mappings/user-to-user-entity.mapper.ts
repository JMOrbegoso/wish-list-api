import { Collection } from '@mikro-orm/core';
import { User } from '../../domain/entities';
import {
  RefreshTokenEntity,
  UserEntity,
  VerificationCodeEntity,
} from '../persistence/entities';

export function userToUserEntity(
  user: User,
  verificationCodeEntities: VerificationCodeEntity[],
  refreshTokenEntities: RefreshTokenEntity[],
): UserEntity {
  const userEntity = new UserEntity();

  userEntity.id = user.id.value.toString();
  userEntity.email = user.email.getEmail;
  userEntity.normalizedEmail = user.email.getNormalizedEmail;
  userEntity.username = user.username.getUsername;
  userEntity.normalizedUsername = user.username.getNormalizedUsername;
  userEntity.passwordHash = user.passwordHash.getPasswordHash;
  userEntity.isVerified = user.isVerified;
  userEntity.verificationCodes = new Collection<VerificationCodeEntity>(
    userEntity,
    verificationCodeEntities,
  );
  userEntity.isBlocked = user.isBlocked;
  userEntity.firstName = user.firstName.getFirstName;
  userEntity.lastName = user.lastName.getLastName;
  userEntity.birthday = user.birthday.getDate;
  userEntity.createdAt = user.createdAt.getDate;
  userEntity.updatedAt = user.updatedAt.getDate;
  userEntity.biography = user.biography.getBiography;
  userEntity.profilePicture = user.profilePicture?.getUrl ?? null;
  userEntity.deletedAt = user.deletedAt?.getDate ?? null;
  userEntity.roles = user.roles;
  userEntity.refreshTokens = new Collection<RefreshTokenEntity>(
    userEntity,
    refreshTokenEntities,
  );

  return userEntity;
}
