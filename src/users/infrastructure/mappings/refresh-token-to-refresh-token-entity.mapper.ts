import { RefreshToken } from '../../domain/entities';
import { RefreshTokenEntity } from '../persistence/entities';

export function refreshTokenToRefreshTokenEntity(
  refreshToken: RefreshToken,
): RefreshTokenEntity {
  const refreshTokenEntity = new RefreshTokenEntity();

  refreshTokenEntity.id = refreshToken.id.value.toString();
  refreshTokenEntity.createdAt = refreshToken.createdAt.getDate;
  refreshTokenEntity.duration = refreshToken.duration;
  refreshTokenEntity.ipAddress = refreshToken.ipAddress;
  refreshTokenEntity.replacedAt = refreshToken?.replacedAt?.getDate ?? null;
  refreshTokenEntity.replacedBy =
    refreshToken?.replacedBy?.value?.toString() ?? null;
  refreshTokenEntity.revokedAt = refreshToken?.revokedAt?.getDate ?? null;

  return refreshTokenEntity;
}
