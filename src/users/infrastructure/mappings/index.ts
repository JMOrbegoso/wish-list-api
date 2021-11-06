import { ObjectId } from '@mikro-orm/mongodb';
import { genSaltSync, hashSync as hashPasswordSync } from 'bcrypt';
import { User } from '../../domain/entities';
import { UserEntity } from '../persistence/entities';
import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../core/domain/value-objects';
import {
  Email,
  UserName,
  PasswordHash,
  IsVerified,
  IsBlocked,
  FirstName,
  LastName,
  Biography,
} from '../../domain/value-objects';
import { CreateUserDto } from '../dtos';
import { CreateUserCommand } from '../../application/commands';

export function toUser(userEntity: UserEntity): User {
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
  const biography = userEntity.biography
    ? Biography.create(userEntity.biography)
    : null;
  const profilePicture = userEntity.profilePicture
    ? WebUrl.create(userEntity.profilePicture)
    : null;
  const deletedAt = userEntity.deletedAt
    ? MillisecondsDate.createFromDate(userEntity.deletedAt)
    : null;

  const user = User.create(
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

  return user;
}

export function toUserEntity(user: User): UserEntity {
  const userEntity = new UserEntity();

  userEntity.id = user.id.getId;
  userEntity.email = user.email.getEmail;
  userEntity.normalizedEmail = user.email.getNormalizedEmail;
  userEntity.userName = user.userName.getUserName;
  userEntity.normalizedUserName = user.userName.getNormalizedUserName;
  userEntity.passwordHash = user.passwordHash.getPasswordHash;
  userEntity.isVerified = user.isVerified.getStatus;
  userEntity.isBlocked = user.isBlocked.getStatus;
  userEntity.firstName = user.firstName.getFirstName;
  userEntity.lastName = user.lastName.getLastName;
  userEntity.birthday = user.birthday.getDate;
  userEntity.createdAt = user.createdAt.getDate;
  userEntity.updatedAt = user.updatedAt.getDate;
  userEntity.biography = user.biography?.getBiography;
  userEntity.profilePicture = user.profilePicture?.getUrl;
  userEntity.deletedAt = user.deletedAt?.getDate;

  return userEntity;
}

export function toCreateUserCommand(dto: CreateUserDto): CreateUserCommand {
  const id = UniqueId.create(new ObjectId().toString());
  const email = Email.create(dto.email);
  const userName = UserName.create(dto.userName);
  const passwordHash = PasswordHash.create(encryptPassword(dto.password));
  const isVerified = IsVerified.notVerified();
  const isBlocked = IsBlocked.notBlocked();
  const firstName = FirstName.create(dto.firstName);
  const lastName = LastName.create(dto.lastName);
  const birthday = MillisecondsDate.createFromMilliseconds(dto.birthday);
  const createdAt = MillisecondsDate.create();
  const updatedAt = createdAt;
  const biography = dto.biography ? Biography.create(dto.biography) : null;
  const profilePicture = dto.profilePicture
    ? WebUrl.create(dto.profilePicture)
    : null;

  return new CreateUserCommand(
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
  );
}

function encryptPassword(password: string): string {
  const salt = genSaltSync(10);
  const hash = hashPasswordSync(password, salt);
  return hash;
}
