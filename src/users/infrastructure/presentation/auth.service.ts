import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnitOfWork } from '../../../core/domain/repositories';
import { UniqueIdGeneratorService } from '../../../users/application/services';
import { AuthTokensDto } from '../dtos';
import { RefreshTokenEntity } from '../persistence/entities';
import { RefreshTokenRepositoryMongoDb } from '../persistence/repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly uniqueIdGeneratorService: UniqueIdGeneratorService,
    private readonly refreshTokenRepository: RefreshTokenRepositoryMongoDb,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  public async generateAuthTokens(
    userId: string,
    ip: string,
  ): Promise<AuthTokensDto> {
    const access_token = this.generateAccessToken(userId);
    const refresh_token = this.generateRefreshToken(userId, ip);

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

    const userId = refreshToken.userId;

    // Check if the refresh token is valid
    if (!refreshToken.isValid) {
      if (refreshToken.wasReplaced || refreshToken.isRevoked) {
        await this.refreshTokenRepository.revokeValidTokensByUserId(userId);
        await this.refreshTokenRepository.revokeValidTokensByIp(ip);
        await this.unitOfWork.commitChanges();
      }
      throw new UnauthorizedException();
    }

    const refresh_token = this.generateRefreshToken(userId, ip);
    refreshToken.replace(refresh_token);
    await this.unitOfWork.commitChanges();

    const access_token = this.generateAccessToken(userId);

    return {
      access_token,
      refresh_token,
    };
  }

  private generateAccessToken(userId: string): string {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(userId: string, ip: string): string {
    const id = this.uniqueIdGeneratorService.generateId();
    const refreshToken = RefreshTokenEntity.create(id, userId, ip);
    this.refreshTokenRepository.add(refreshToken);
    return id;
  }
}
