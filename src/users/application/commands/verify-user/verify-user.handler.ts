import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyUserCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { VerificationCode } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

@CommandHandler(VerifyUserCommand)
export class VerifyUserHandler implements ICommandHandler<VerifyUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: VerifyUserCommand): Promise<void> {
    const id = UniqueId.create(command.verificationCode);
    const verificationCode = VerificationCode.create(id);

    // Get user by verification code
    const user = await this.userRepository.getOneByVerificationCode(
      verificationCode,
    );
    if (!user) throw new NotFoundException();

    // Check if the user is already verified
    if (user.isVerified)
      throw new BadRequestException('User is already verified.');

    // Update the user properties
    user.verify();

    // Add the updated user to the users repository
    await this.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
