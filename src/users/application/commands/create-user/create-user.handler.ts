import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../domain/entities';
import { CreateUserCommand } from '..';
import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../../core/domain/value-objects';
import {
  Email,
  UserName,
  PasswordHash,
  IsVerified,
  IsBlocked,
  FirstName,
  LastName,
  Biography,
} from '../../../domain/value-objects';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: CreateUserCommand): Promise<void> {
    // Generate the email and username properties of the new user first to validate them
    const id = UniqueId.create(command.id);
    const email = Email.create(command.email);
    const userName = UserName.create(command.userName);

    // Check if the id is in use by other user
    const userWithSameId = await this.unitOfWork.userRepository.getOne(id);
    if (userWithSameId) throw new Error('Id is in use.');

    // Check if the email is in use by other user
    const userWithSameEmail =
      await this.unitOfWork.userRepository.getOneByEmail(email);
    if (userWithSameEmail) throw new Error('Email in use.');

    // Check if the username is in use by other user
    const userWithSameUserName =
      await this.unitOfWork.userRepository.getOneByUserName(userName);
    if (userWithSameUserName) throw new Error('UserName in use.');

    // Generate the properties of the new User
    const passwordHash = PasswordHash.create(command.passwordHash);
    const isVerified = IsVerified.notVerified();
    const isBlocked = IsBlocked.notBlocked();
    const firstName = FirstName.create(command.firstName);
    const lastName = LastName.create(command.lastName);
    const birthday = MillisecondsDate.createFromMilliseconds(command.birthday);
    const createdAt = MillisecondsDate.create();
    const biography = command.biography
      ? Biography.create(command.biography)
      : null;
    const profilePicture = command.profilePicture
      ? WebUrl.create(command.profilePicture)
      : null;

    // Create the new user
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
      createdAt,
      biography,
      profilePicture,
      null,
    );

    // Add the new user to the users repository
    this.unitOfWork.userRepository.add(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
