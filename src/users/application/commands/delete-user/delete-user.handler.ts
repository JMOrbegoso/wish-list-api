import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { UserRepository } from '../../../domain/repositories';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.userRepository.getOne(id);
    if (!user) throw new NotFoundException();

    // Check if the user is already deleted
    if (user.isDeleted)
      throw new BadRequestException('User is already deleted.');

    // Update the user properties
    user.delete();

    // Add the updated user to the users repository
    await this.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
