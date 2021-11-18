import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UnitOfWork } from '../../../../core/domain/repositories';
import {
  UniqueId,
  MillisecondsDate,
  WebUrl,
} from '../../../../core/domain/value-objects';
import { FirstName, LastName, Biography } from '../../../domain/value-objects';
import { UpdateUserCommand } from '..';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    // Generate the email and username properties of the new user first to validate them
    const id = UniqueId.create(command.id);

    // Check if the email is in use by other user
    const user = await this.unitOfWork.userRepository.getOne(id);
    if (!user) throw new NotFoundException('User not found.');

    // Generate the properties of the new User
    const firstName = FirstName.create(command.firstName);
    const lastName = LastName.create(command.lastName);
    const birthday = MillisecondsDate.createFromMilliseconds(command.birthday);
    const biography = command.biography
      ? Biography.create(command.biography)
      : null;
    const profilePicture = command.profilePicture
      ? WebUrl.create(command.profilePicture)
      : null;

    // Update user properties
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthday = birthday;
    user.biography = biography;
    user.profilePicture = profilePicture;

    // Add the new user to the users repository
    this.unitOfWork.userRepository.update(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
