import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserProfilePictureCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { WebUrl } from '../../../../shared/domain/value-objects';
import { UserId } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

@CommandHandler(UpdateUserProfilePictureCommand)
export class UpdateUserProfilePictureHandler
  implements ICommandHandler<UpdateUserProfilePictureCommand>
{
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UpdateUserProfilePictureCommand): Promise<void> {
    const userId = UserId.create(command.id);

    // Get user by id
    const user = await this.userRepository.getOneById(userId);
    if (!user) throw new NotFoundException();

    // Check if the user was deleted
    if (user.isDeleted) throw new BadRequestException('User is deleted.');

    // Check if the user was blocked
    if (user.isBlocked) throw new BadRequestException('User is blocked.');

    // Check if the user is not verified
    if (!user.isVerified)
      throw new BadRequestException('User is not verified.');

    // Generate the properties of the User
    const profilePicture = command.profilePicture
      ? WebUrl.create(command.profilePicture)
      : null;

    // Update user properties
    user.updateProfilePicture(profilePicture);

    // Update the user using users repository
    this.userRepository.updateUser(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
