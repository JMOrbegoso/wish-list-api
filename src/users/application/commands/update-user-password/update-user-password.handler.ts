import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserPasswordCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UserId } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { PasswordHash } from '../../../domain/value-objects';
import { EncryptionService } from '../../services';

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler
  implements ICommandHandler<UpdateUserPasswordCommand>
{
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(command: UpdateUserPasswordCommand): Promise<void> {
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

    // Generate the new User password hash
    const hash = this.encryptionService.hashPassword(command.password);
    const passwordHash = PasswordHash.create(hash);

    // Update user properties
    user.updatePasswordHash(passwordHash);

    // Add the new user to the users repository
    this.userRepository.updateUser(user);

    // Save changes using Unit of Work
    await this.unitOfWork.commitChanges();
  }
}
