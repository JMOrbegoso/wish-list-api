import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { VerificationCode, VerificationCodeId } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: VerifyUserCommand): Promise<void> {
    const verificationCodeId = VerificationCodeId.create(
      command.verificationCode,
    );
    const verificationCode = VerificationCode.create(verificationCodeId);

    // Get user by verification code
    const user = await this.userRepository.getOneByVerificationCode(
      verificationCode,
    );
    if (!user) throw new NotFoundException();

    // Check if the user can be verified
    if (user.isDeleted) throw new BadRequestException('User is deleted.');
    if (user.isBlocked) throw new BadRequestException('User is blocked.');
    if (user.isVerified)
      throw new BadRequestException('User is already verified.');

    // Update the user properties
    user.verify();

    // Add the updated user to the users repository
    this.userRepository.updateUser(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
