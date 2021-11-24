import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UndeleteUserCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
import { UserRepository } from '../../../../users/domain/repositories';

@CommandHandler(UndeleteUserCommand)
export class UndeleteUserHandler
  implements ICommandHandler<UndeleteUserCommand>
{
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UndeleteUserCommand): Promise<void> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.userRepository.getOne(id);
    if (!user) throw new NotFoundException();

    // Check if the user is not deleted
    if (!user.isDeleted) throw new BadRequestException('User is not deleted.');

    // Update the user properties
    user.undelete();

    // Add the updated user to the users repository
    this.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
