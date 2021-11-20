import { User } from '../../domain/entities';
import { UserEntity } from '../persistence/entities';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../core/domain/value-objects';
import {
  Biography,
  Email,
  FirstName,
  IsBlocked,
  IsVerified,
  LastName,
  PasswordHash,
  UserName,
} from '../../domain/value-objects';

export function userEntityToUser(userEntity: UserEntity): User {
  const id = UniqueId.create(userEntity.id);
  const email = Email.create(userEntity.email);
  const userName = UserName.create(userEntity.userName);
  const passwordHash = PasswordHash.create(userEntity.passwordHash);
  const isVerified = IsVerified.create(userEntity.isVerified);
  const isBlocked = IsBlocked.create(userEntity.isBlocked);
  const firstName = FirstName.create(userEntity.firstName);
  const lastName = LastName.create(userEntity.lastName);
  const birthday = MillisecondsDate.createFromDate(userEntity.birthday);
  const createdAt = MillisecondsDate.createFromDate(userEntity.createdAt);
  const updatedAt = MillisecondsDate.createFromDate(userEntity.updatedAt);
  const biography = Biography.create(userEntity.biography);
  const profilePicture = userEntity.profilePicture
    ? WebUrl.create(userEntity.profilePicture)
    : null;
  const deletedAt = userEntity.deletedAt
    ? MillisecondsDate.createFromDate(userEntity.deletedAt)
    : null;

  return User.create(
    id,
    email,
    userName,
    passwordHash,
    isVerified,
    isBlocked,
    firstName,
    lastName,
    birthday,
    createdAt,
    updatedAt,
    biography,
    profilePicture,
    deletedAt,
  );
}
