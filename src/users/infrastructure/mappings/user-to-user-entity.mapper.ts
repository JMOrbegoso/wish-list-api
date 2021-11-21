import { User } from '../../domain/entities';
import { UserEntity } from '../persistence/entities';

export function userToUserEntity(user: User): UserEntity {
  const userEntity = new UserEntity();

  userEntity.id = user.id.getId;
  userEntity.email = user.email.getEmail;
  userEntity.normalizedEmail = user.email.getNormalizedEmail;
  userEntity.username = user.username.getUsername;
  userEntity.normalizedUsername = user.username.getNormalizedUsername;
  userEntity.passwordHash = user.passwordHash.getPasswordHash;
  userEntity.isVerified = user.isVerified.getStatus;
  userEntity.isBlocked = user.isBlocked.getStatus;
  userEntity.firstName = user.firstName.getFirstName;
  userEntity.lastName = user.lastName.getLastName;
  userEntity.birthday = user.birthday.getDate;
  userEntity.createdAt = user.createdAt.getDate;
  userEntity.updatedAt = user.updatedAt.getDate;
  userEntity.biography = user.biography.getBiography;
  userEntity.profilePicture = user.profilePicture?.getUrl ?? null;
  userEntity.deletedAt = user.deletedAt?.getDate ?? null;

  return userEntity;
}