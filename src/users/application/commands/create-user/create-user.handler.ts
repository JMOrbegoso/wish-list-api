import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../core/domain/value-objects';
import { UserRepository } from '../../../../users/domain/repositories';
import { User } from '../../../domain/entities';
import {
  Biography,
  Email,
  FirstName,
  IsBlocked,
  IsVerified,
  LastName,
  PasswordHash,
  Username,
} from '../../../domain/value-objects';
import { EncryptionService } from '../../services';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    // Generate the email and username properties of the new user first to validate them
    const id = UniqueId.create(command.id);
    const email = Email.create(command.email);
    const username = Username.create(command.username);

    // Check if the id is in use by other user
    const userExists = await this.userRepository.userExists(
      id,
      email,
      username,
    );
    if (userExists)
      throw new BadRequestException('Id, Email or Username already in use.');

    // Generate the properties of the new User
    const hash = this.encryptionService.hashPassword(command.password);
    const passwordHash = PasswordHash.create(hash);
    const isVerified = IsVerified.notVerified();
    const isBlocked = IsBlocked.notBlocked();
    const firstName = FirstName.create(command.firstName);
    const lastName = LastName.create(command.lastName);
    const birthday = MillisecondsDate.createFromMilliseconds(command.birthday);
    const createdAt = MillisecondsDate.create();
    const biography = Biography.create(command.biography);
    const profilePicture = command.profilePicture
      ? WebUrl.create(command.profilePicture)
      : null;

    // Create the new user
    const user = User.create(
      id,
      email,
      username,
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
    this.userRepository.add(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
