import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnblockUserCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';

@CommandHandler(UnblockUserCommand)
export class UnblockUserHandler implements ICommandHandler<UnblockUserCommand> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: UnblockUserCommand): Promise<void> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.unitOfWork.userRepository.getOne(id);
    if (!user) throw new NotFoundException();

    // Check if the user is not blocked
    if (!user.isBlocked) throw new BadRequestException('User is not blocked.');

    // Update the user properties
    user.unblock();

    // Add the updated user to the users repository
    this.unitOfWork.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
