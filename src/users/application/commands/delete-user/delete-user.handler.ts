import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { DeleteUserCommand } from '..';
import {
  UniqueId,
  MillisecondsDate,
} from '../../../../core/domain/value-objects';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: DeleteUserCommand): Promise<Date> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.unitOfWork.userRepository.getOne(id);
    if (!user) return null;

    // Check if the user is already deleted
    if (user.deletedAt) return user.deletedAt.getDate;

    // Update the user properties
    user.deletedAt = MillisecondsDate.create();

    // Add the updated user to the users repository
    this.unitOfWork.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();

    return user.deletedAt.getDate;
  }
}
