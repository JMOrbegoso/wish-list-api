import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserProfileCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../core/domain/value-objects';
import { UserRepository } from '../../../domain/repositories';
import { Biography, FirstName, LastName } from '../../../domain/value-objects';

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler
  implements ICommandHandler<UpdateUserProfileCommand>
{
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UpdateUserProfileCommand): Promise<void> {
    const id = UniqueId.create(command.id);

    // Get user by id
    const user = await this.userRepository.getOne(id);
    if (!user) throw new NotFoundException();

    // Check if the user was deleted
    if (user.isDeleted) throw new BadRequestException('User is deleted.');

    // Check if the user was blocked
    if (user.isBlocked) throw new BadRequestException('User is blocked.');

    // Check if the user is not verified
    if (!user.isVerified)
      throw new BadRequestException('User is not verified.');

    // Generate the properties of the User
    const firstName = FirstName.create(command.firstName);
    const lastName = LastName.create(command.lastName);
    const birthday = MillisecondsDate.createFromMilliseconds(command.birthday);
    const biography = Biography.create(command.biography);
    const profilePicture = command.profilePicture
      ? WebUrl.create(command.profilePicture)
      : null;

    // Update user properties
    user.updateProfile(
      firstName,
      lastName,
      birthday,
      biography,
      profilePicture,
    );

    // Add the new user to the users repository
    this.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
