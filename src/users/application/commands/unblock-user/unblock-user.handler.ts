import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UnblockUserCommand } from '..';
import { UniqueId } from '../../../../core/domain/value-objects';
import { IsBlocked } from '../../../../users/domain/value-objects';

@CommandHandler(UnblockUserCommand)
export class UnblockUserHandler implements ICommandHandler<UnblockUserCommand> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: UnblockUserCommand): Promise<void> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.unitOfWork.userRepository.getOne(id);
    if (!user) return null;

    // Check if the user is not blocked
    if (!user.isBlocked.getStatus) return;

    // Update the user properties
    user.isBlocked = IsBlocked.notBlocked();

    // Add the updated user to the users repository
    this.unitOfWork.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
