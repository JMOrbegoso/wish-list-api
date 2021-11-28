import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UniqueId } from '../../../core/domain/value-objects';
import { OutputUserDto } from '../../../users/application/dtos';
import { userToOutputUserDto } from '../../../users/application/mappings';
import { UniqueIdGeneratorService } from '../../../users/application/services';
import { UserRepository } from '../../../users/domain/repositories';
import { AuthTokensDto } from '../dtos';
import { RefreshTokenEntity } from '../persistence/entities';
import { RefreshTokenRepositoryMongoDb } from '../persistence/repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepositoryMongoDb,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  public async generateAuthTokens(
    outputUserDto: OutputUserDto,
    ip: string,
  ): Promise<AuthTokensDto> {
    const access_token = this.generateAccessToken(outputUserDto);
    const refresh_token = this.generateRefreshToken(outputUserDto.id, ip);

    await this.unitOfWork.commitChanges();

    return {
      access_token,
      refresh_token,
    };
  }

  public async refreshAccessToken(
    refreshTokenToUse: string,
    ip: string,
  ): Promise<AuthTokensDto> {
    const refreshToken = await this.refreshTokenRepository.getOne(
      refreshTokenToUse,
    );
    if (!refreshToken) throw new UnauthorizedException();

    const userId = UniqueId.create(refreshToken.userId);
    const user = await this.userRepository.getOne(userId);

    if (!user) throw new UnauthorizedException();

    // Check if the refresh token is valid
    if (!refreshToken.isValid) {
      if (refreshToken.wasReplaced || refreshToken.isRevoked) {
        await this.refreshTokenRepository.revokeValidTokensByUserId(userId);
        await this.refreshTokenRepository.revokeValidTokensByIp(ip);
        await this.unitOfWork.commitChanges();
      }
      throw new UnauthorizedException();
    }

    const refresh_token = this.generateRefreshToken(userId.getId, ip);

    const outputUserDto = userToOutputUserDto(user);

    refreshToken.replace(refresh_token);
    await this.unitOfWork.commitChanges();

    const access_token = this.generateAccessToken(outputUserDto);

    return {
      access_token,
      refresh_token,
    };
  }

  private generateAccessToken(outputUserDto: OutputUserDto): string {
    const { id, ...body } = outputUserDto;
    const payload = { sub: id, ...body };
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(userId: string, ip: string): string {
    const id = this.uniqueIdGeneratorService.generateId();
    const refreshToken = RefreshTokenEntity.create(id, userId, ip);
    this.refreshTokenRepository.add(refreshToken);
    return id;
  }
}
