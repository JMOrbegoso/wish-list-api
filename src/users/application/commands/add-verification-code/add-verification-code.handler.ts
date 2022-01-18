import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddVerificationCodeCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { DateTime } from '../../../../shared/domain/value-objects';
import { VerificationCode, VerificationCodeId } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { Email } from '../../../domain/value-objects';
import { EmailSenderService, UniqueIdGeneratorService } from '../../services';

@CommandHandler(AddVerificationCodeCommand)
export class AddVerificationCodeHandler
  implements ICommandHandler<AddVerificationCodeCommand>
{
  constructor(
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
    private readonly emailSenderService: EmailSenderService,
    private readonly userRepository: UserRepository,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async execute(command: AddVerificationCodeCommand): Promise<void> {
    if (!command?.email) throw new BadRequestException('Invalid email.');

    // Generate the value objects to validate them
    const email = Email.create(command.email);

    // Get the user
    const user = await this.userRepository.getOneByEmail(email);
    if (!user) throw new NotFoundException();

    // Check if the user can be verified
    if (user.isDeleted) throw new BadRequestException('User is deleted.');
    if (user.isBlocked) throw new BadRequestException('User is blocked.');
    if (user.isVerified)
      throw new BadRequestException('User is already verified.');

    // Create the new verification code
    const verificationCodeId = VerificationCodeId.create(
      this.uniqueIdGeneratorService.generateId(),
    );
    const verificationCode = VerificationCode.create(
      verificationCodeId,
      DateTime.now(),
      VerificationCode.defaultDuration,
    );

    // Add the new verification code to the user
    user.addVerificationCode(verificationCode);

    // Use the repository
    this.userRepository.updateUser(user);
    this.userRepository.addVerificationCode(verificationCode, user.id);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();

    // Send the account confirmation email
    await this.emailSenderService.send(
      email.getEmail,
      'Welcome to Wish List - Account confirmation email',
      `<h1>
        Welcome ${user.firstName.getFirstName} ${user.lastName.getLastName}
      </h1>
      <p>
        You can activate your account ${user.username.getUsername} using this verification code: ${verificationCode.id.base64}
      </p>`,
    );
  }
}
