import { MillisecondsDate, WebUrl } from '../../../shared/domain/value-objects';
import { User, UserId } from '../../domain/entities';
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
import {
  RefreshTokenEntity,
  UserEntity,
  VerificationCodeEntity,
} from '../persistence/entities';
import {
  refreshTokenEntityToRefreshToken,
  verificationCodeEntityToVerificationCode,
} from '.';

export function userEntityToUser(userEntity: UserEntity): User {
  const userId = UserId.create(userEntity.id);
  const email = Email.create(userEntity.email);
  const username = Username.create(userEntity.username);
  const passwordHash = PasswordHash.create(userEntity.passwordHash);
  const isVerified = IsVerified.create(userEntity.isVerified);
  const verificationCodes = userEntity.verificationCodes
    .toArray()
    .map((vc: VerificationCodeEntity) =>
      verificationCodeEntityToVerificationCode(vc),
    );
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
    userId,
    email,
    username,
    passwordHash,
    isVerified,
    verificationCodes,
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
