import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { MillisecondsDate } from '../../../../shared/domain/value-objects';
import {
  User,
  UserId,
  VerificationCode,
  VerificationCodeId,
} from '../../../domain/entities';
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
    const userId = UserId.create(command.id);
    const email = Email.create(command.email);
    const username = Username.create(command.username);

    // Check if the id is in use by other user
    const userExists = await this.userRepository.userExists(
      userId,
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
    const birthday = MillisecondsDate.createFromString(command.birthday);
    const createdAt = MillisecondsDate.now();
    const biography = Biography.create(command.biography);
    const roles = [Role.basic()];

    // Create the new user
    const user = User.create(
      userId,
      email,
      username,
      passwordHash,
      isVerified,
      [],
      isBlocked,
      firstName,
      lastName,
      birthday,
      createdAt,
      createdAt,
      biography,
      roles,
    );

    // Create the new verification code
    const verificationCodeId = VerificationCodeId.create(
      this.uniqueIdGeneratorService.generateId(),
    );
    const verificationCode = VerificationCode.create(
      verificationCodeId,
      MillisecondsDate.now(),
      VerificationCode.defaultDuration,
    );

    // Add the new entities to the transaction
    this.userRepository.addUser(user);
    this.userRepository.addVerificationCode(verificationCode, user.id);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();

    // Send the account confirmation email
    await this.emailSenderService.send(
      email.getEmail,
      'Welcome to Wish List - Account confirmation email',
      `<h1>
        Welcome ${firstName.getFirstName} ${lastName.getLastName}
      </h1>
      <p>
        You can activate your account ${username.getUsername} using this verification code: ${verificationCode.id.base64}
      </p>`,
    );
  }
}
