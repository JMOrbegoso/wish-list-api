import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UndeleteUserCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UserId } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

@CommandHandler(UndeleteUserCommand)
export class UndeleteUserHandler
  implements ICommandHandler<UndeleteUserCommand>
{
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UndeleteUserCommand): Promise<void> {
    const userId = UserId.create(command.id);

    // Get user by id
    const user = await this.userRepository.getOneById(userId);
    if (!user) throw new NotFoundException();

    // Check if the user is not deleted
    if (!user.isDeleted) throw new BadRequestException('User is not deleted.');

    // Update the user properties
    user.undelete();

    // Add the updated user to the users repository
    this.userRepository.updateUser(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
