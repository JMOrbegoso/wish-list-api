import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../core/domain/value-objects';
import { User, VerificationCode } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
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
} from '../../../domain/value-objects';
import {
  EmailSenderService,
  EncryptionService,
  UniqueIdGeneratorService,
} from '../../services';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
    private readonly emailSenderService: EmailSenderService,
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
    const roles = [Role.basic()];

    // Generate the verfication code
    const verificationCodeId = this.uniqueIdGeneratorService.generateId();
    const verificationCode = VerificationCode.create(verificationCodeId);

    // Create the new user
    const user = User.create(
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
      createdAt,
      biography,
      roles,
      profilePicture,
      null,
    );

    // Add the new user to the users repository
    this.userRepository.add(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();

    // Send an account confirmation code the user email
    await this.emailSenderService.send(
      user.email.getEmail,
      'Confirm Account',
      `your code is ${user.verificationCode}`,
    );
  }
}
