import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
import { UndeleteUserCommand } from '..';

@CommandHandler(UndeleteUserCommand)
export class UndeleteUserHandler
  implements ICommandHandler<UndeleteUserCommand>
{
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: UndeleteUserCommand): Promise<void> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.unitOfWork.userRepository.getOne(id);
    if (!user) throw new NotFoundException('User not found.');

    // Check if the user is not deleted
    if (!user.isDeleted) throw new BadRequestException('User is not deleted.');

    // Update the user properties
    user.deletedAt = null;

    // Add the updated user to the users repository
    this.unitOfWork.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
