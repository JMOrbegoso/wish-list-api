import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlockUserCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { UserRepository } from '../../../domain/repositories';

@CommandHandler(BlockUserCommand)
export class BlockUserHandler implements ICommandHandler<BlockUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: BlockUserCommand): Promise<void> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.userRepository.getOne(id);
    if (!user) throw new NotFoundException();

    // Check if the user is already blocked
    if (user.isBlocked)
      throw new BadRequestException('User is already blocked.');

    // Update the user properties
    user.block();

    // Add the updated user to the users repository
    this.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
