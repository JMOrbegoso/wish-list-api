import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LocalLoginCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { Username } from '../../../domain/value-objects';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';
import { EncryptionService } from '../../services';

@CommandHandler(LocalLoginCommand)
export class LocalLoginHandler implements ICommandHandler<LocalLoginCommand> {
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(command: LocalLoginCommand): Promise<OutputUserDto> {
    const username = Username.create(command.username);

    // Get user by Username
    const user = await this.unitOfWork.userRepository.getOneByUsername(
      username,
    );
    if (!user) throw new NotFoundException();

    // Check if the passwords match
    if (
      !this.encryptionService.passwordMatch(
        command.password,
        user.passwordHash.getPasswordHash,
      )
    )
      throw new UnauthorizedException('Wrong password.');

    // Check if the user was deleted
    if (user.isDeleted) throw new UnauthorizedException('User is deleted.');

    // Check if the user was blocked
    if (user.isBlocked) throw new UnauthorizedException('User is blocked.');

    // Check if the user is verified
    if (!user.isVerified)
      throw new UnauthorizedException('User is not verified.');

    return userToOutputUserDto(user);
  }
}
