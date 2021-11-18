import { User } from '../../domain/entities';
import { UserEntity } from '../persistence/entities';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import {
  CreateUserCommand,
  UpdateUserCommand,
} from '../../../users/application/commands';
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
} from '../../../users/domain/value-objects';

export class Mapper {
  public static toUserDomain(userEntity: UserEntity): User {
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

  public static toUserEntity(user: User): UserEntity {
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

  public static toCreateUserCommand(dto: CreateUserDto): CreateUserCommand {
    return new CreateUserCommand(
      dto.id,
      dto.email,
      dto.userName,
      dto.password,
      dto.firstName,
      dto.lastName,
      dto.birthday,
      dto.biography,
      dto.profilePicture,
    );
  }

  public static toUpdateUserCommand(dto: UpdateUserDto): UpdateUserCommand {
    return new UpdateUserCommand(
      dto.id,
      dto.firstName,
      dto.lastName,
      dto.birthday,
      dto.biography,
      dto.profilePicture,
    );
  }
}
