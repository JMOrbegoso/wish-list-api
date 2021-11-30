import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshAccessTokenCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
import { RefreshToken, User } from '../../../domain/entities';
import {
  RefreshTokenRepository,
  UserRepository,
} from '../../../domain/repositories';
import { Ip } from '../../../domain/value-objects';
import { AuthTokensDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';
import { TokenService, UniqueIdGeneratorService } from '../../services';

@CommandHandler(RefreshAccessTokenCommand)
export class RefreshAccessTokenHandler
  implements ICommandHandler<RefreshAccessTokenCommand>
{
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenService: TokenService,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
  ) {}

  async execute(command: RefreshAccessTokenCommand): Promise<AuthTokensDto> {
    const refreshTokenToUseId = UniqueId.create(command.refreshTokenToUse);
    const ip = Ip.create(command.ipAddress);

    const refreshTokenToUse = await this.refreshTokenRepository.getOne(
      refreshTokenToUseId,
    );
    if (!refreshTokenToUse) throw new UnauthorizedException();

    const user = await this.userRepository.getOne(refreshTokenToUse.userId);
    if (!user) throw new UnauthorizedException();

    // Check if the refresh token is valid
    if (refreshTokenToUse.wasReplaced || refreshTokenToUse.isRevoked) {
      // Revoke all valid tokens generated by the User
      const refreshTokensByUserId =
        await this.refreshTokenRepository.getAllByUserId(user.id);
      refreshTokensByUserId
        .filter((rt) => rt.isValid)
        .forEach((rt) => {
          rt.revoke();
          this.refreshTokenRepository.update(rt);
        });

      // Revoke all valid tokens generated by the Ip
      const refreshTokensByIp = await this.refreshTokenRepository.getAllByIp(
        ip,
      );
      refreshTokensByIp
        .filter((rt) => rt.isValid)
        .forEach((rt) => {
          rt.revoke();
          this.refreshTokenRepository.update(rt);
        });

      // Commit changes
      await this.unitOfWork.commitChanges();
    }

    if (!refreshTokenToUse.isValid) throw new UnauthorizedException();

    // Generate the access token
    const access_token = this.generateAccessToken(user);

    // Generate the new refresh token
    const newRefreshToken = RefreshToken.create(
      this.uniqueIdGeneratorService.generateId(),
      refreshTokenToUse.userId,
      ip,
    );
    this.refreshTokenRepository.add(newRefreshToken);

    // replace the origin refresh token
    refreshTokenToUse.replace(newRefreshToken.id);
    this.refreshTokenRepository.update(refreshTokenToUse);

    // Save changes in persistence
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
