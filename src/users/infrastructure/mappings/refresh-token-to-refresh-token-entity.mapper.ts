import { RefreshToken } from '../../domain/entities';
import { RefreshTokenEntity } from '../persistence/entities';

export function refreshTokenToRefreshTokenEntity(
  refreshToken: RefreshToken,
): RefreshTokenEntity {
  const refreshTokenEntity = new RefreshTokenEntity();

  refreshTokenEntity.id = refreshToken.id.getId;
  refreshTokenEntity.userId = refreshToken.userId.getId;
  refreshTokenEntity.createdAt = refreshToken.createdAt.getDate;
  refreshTokenEntity.duration = refreshToken.duration;
  refreshTokenEntity.ipAddress = refreshToken.ipAddress;
  refreshTokenEntity.replacedAt = refreshToken?.replacedAt?.getDate ?? null;
  refreshTokenEntity.replacedBy = refreshToken?.replacedBy?.getId ?? null;
  refreshTokenEntity.revokedAt = refreshToken?.revokedAt?.getDate ?? null;

  return refreshTokenEntity;
}
