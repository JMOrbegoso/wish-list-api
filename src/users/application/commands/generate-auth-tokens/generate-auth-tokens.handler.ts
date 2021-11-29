import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateAuthTokensCommand } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import {
  MillisecondsDate,
  UniqueId,
} from '../../../../core/domain/value-objects';
import { RefreshToken } from '../../../domain/entities';
import { RefreshTokenRepository } from '../../../domain/repositories';
import { Ip, SecondsDuration } from '../../../domain/value-objects';
import { AuthTokensDto, OutputUserDto } from '../../dtos';
import { TokenService, UniqueIdGeneratorService } from '../../services';

@CommandHandler(GenerateAuthTokensCommand)
export class GenerateAuthTokensHandler
  implements ICommandHandler<GenerateAuthTokensCommand>
{
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly tokenService: TokenService,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
  ) {}

  async execute(command: GenerateAuthTokensCommand): Promise<AuthTokensDto> {
    const userId = UniqueId.create(command.outputUserDto.id);
    const ip = Ip.create(command.ipAddress);

    const access_token = this.generateAccessToken(command.outputUserDto);
    const refresh_token = this.generateRefreshToken(userId, ip);

    await this.unitOfWork.commitChanges();

    return {
      access_token,
      refresh_token,
    };
  }

  private generateAccessToken(outputUserDto: OutputUserDto): string {
    const { id, ...body } = outputUserDto;
    const payload = { sub: id, ...body };
    return this.tokenService.signPayload(payload);
  }

  private generateRefreshToken(userId: UniqueId, ip: Ip): string {
    const uniqueId = this.uniqueIdGeneratorService.generateId();

    const refreshToken = RefreshToken.create(
      uniqueId,
      userId,
      MillisecondsDate.create(),
      SecondsDuration.twoWeeks(),
      ip,
    );
    this.refreshTokenRepository.add(refreshToken);
    return uniqueId.getId;
  }
}
