import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LocalLoginCommand } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { RefreshToken, User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { IpAddress, Username } from '../../../domain/value-objects';
import { AuthTokensDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';
import {
  EncryptionService,
  TokenService,
  UniqueIdGeneratorService,
} from '../../services';

@CommandHandler(LocalLoginCommand)
export class LocalLoginHandler implements ICommandHandler<LocalLoginCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly unitOfWork: UnitOfWork,
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
  ) {}

  async execute(command: LocalLoginCommand): Promise<AuthTokensDto> {
    const username = Username.create(command.username);
    const ipAddress = IpAddress.create(command.ipAddress);

    // Get user by Username
    const user = await this.userRepository.getOneByUsername(username);
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

    // Generate the access token
    const access_token = this.generateAccessToken(user);

    // Generate the new refresh token
    const newRefreshToken = RefreshToken.create(
      this.uniqueIdGeneratorService.generateId(),
      ipAddress,
    );

    // Update the user
    user.addRefreshToken(newRefreshToken);

    // Save changes in persistence
    await this.userRepository.update(user);
    await this.unitOfWork.commitChanges();

    return {
      access_token,
      refresh_token: newRefreshToken.id.getId,
    };
  }

  private generateAccessToken(user: User): string {
    const outputUserDto = userToOutputUserDto(user);

    const { id, ...body } = outputUserDto;
    const payload = { sub: id, ...body };
    return this.tokenService.signPayload(payload);
  }
}
