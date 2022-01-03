import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../shared/domain/value-objects';
import { User, VerificationCode } from '../../domain/entities';
import {
  Biography,
  Email,
  FirstName,
  IsBlocked,
  IsVerified,
  LastName,
  PasswordHash,
  Role,
  Username,
} from '../../domain/value-objects';
import { RefreshTokenEntity, UserEntity } from '../persistence/entities';
import { refreshTokenEntityToRefreshToken } from '.';

export function userEntityToUser(userEntity: UserEntity): User {
  const id = UniqueId.create(userEntity.id);
  const email = Email.create(userEntity.email);
  const username = Username.create(userEntity.username);
  const passwordHash = PasswordHash.create(userEntity.passwordHash);
  const isVerified = IsVerified.create(userEntity.isVerified);
  const verificationCodeId = UniqueId.create(userEntity.verificationCode);
  const verificationCode = VerificationCode.create(verificationCodeId);
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
  const roles = userEntity.roles.map((r) => Role.create(r));
  const refreshTokens = userEntity.refreshTokens
    .toArray()
    .map((rt: RefreshTokenEntity) => refreshTokenEntityToRefreshToken(rt));

  return User.create(
    id,
    email,
    username,
    passwordHash,
    isVerified,
    verificationCode,
    isBlocked,
    firstName,
    lastName,
    birthday,
    createdAt,
    updatedAt,
    biography,
    roles,
    refreshTokens,
    profilePicture,
    deletedAt,
  );
}
