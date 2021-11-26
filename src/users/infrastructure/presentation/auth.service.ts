import { Injectable } from '@nestjs/common';
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
