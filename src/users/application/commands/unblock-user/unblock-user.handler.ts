import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnblockUserCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UserId } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

@CommandHandler(UnblockUserCommand)
export class UnblockUserHandler implements ICommandHandler<UnblockUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UnblockUserCommand): Promise<void> {
    const userId = UserId.create(command.id);

    // Get user by id
    const user = await this.userRepository.getOneById(userId);
    if (!user) throw new NotFoundException();

    // Check if the user is not blocked
    if (!user.isBlocked) throw new BadRequestException('User is not blocked.');

    // Update the user properties
    user.unblock();

    // Add the updated user to the users repository
    this.userRepository.updateUser(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
