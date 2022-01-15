import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { VerificationCodeId } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: VerifyUserCommand): Promise<void> {
    if (!command?.verificationCode)
      throw new BadRequestException('Invalid verification code.');

    const verificationCodeId = VerificationCodeId.create(
      command.verificationCode,
    );

    // Get user by verification code
    const user = await this.userRepository.getOneByVerificationCodeId(
      verificationCodeId,
    );
    if (!user) throw new NotFoundException();

    // Check if the user can be verified
    if (user.isDeleted) throw new BadRequestException('User is deleted.');
    if (user.isBlocked) throw new BadRequestException('User is blocked.');
    if (user.isVerified)
      throw new BadRequestException('User is already verified.');

    // Check if the verification code is valid
    if (
      user.verificationCodes.find((code) => code.id.equals(verificationCodeId))
        .isExpired
    )
      throw new BadRequestException('Verification code is expired.');

    // Update the user properties
    user.verify();

    // Add the updated user to the users repository
    this.userRepository.updateUser(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
