import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UndeleteUserCommand } from '..';
import { UniqueId } from '../../../../core/domain/value-objects';

@CommandHandler(UndeleteUserCommand)
export class UndeleteUserHandler
  implements ICommandHandler<UndeleteUserCommand>
{
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: UndeleteUserCommand): Promise<void> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.unitOfWork.userRepository.getOne(id);
    if (!user) return null;

    // Check if the user is not deleted
    if (!user.deletedAt) return;

    // Update the user properties
    user.deletedAt = null;

    // Add the updated user to the users repository
    this.unitOfWork.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
