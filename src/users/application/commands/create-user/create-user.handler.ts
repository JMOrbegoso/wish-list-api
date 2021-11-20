import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
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
import { EncryptionService } from '../../services';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    // Generate the email and username properties of the new user first to validate them
    const id = UniqueId.create(command.id);
    const email = Email.create(command.email);
    const userName = UserName.create(command.userName);

    // Check if the id is in use by other user
    const userWithSameId = await this.unitOfWork.userRepository.getOne(id);
    if (userWithSameId)
      throw new BadRequestException('The Id is already in use.');

    // Check if the email is in use by other user
    const userWithSameEmail =
      await this.unitOfWork.userRepository.getOneByEmail(email);
    if (userWithSameEmail)
      throw new BadRequestException('The Email is already in use.');

    // Check if the username is in use by other user
    const userWithSameUserName =
      await this.unitOfWork.userRepository.getOneByUserName(userName);
    if (userWithSameUserName)
      throw new BadRequestException('The UserName is already in use.');

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
