import { MillisecondsDate } from '../../../shared/domain/value-objects';
import { RefreshToken, RefreshTokenId } from '../../domain/entities';
import { IpAddress, SecondsDuration } from '../../domain/value-objects';
import { RefreshTokenEntity } from '../persistence/entities';

export function refreshTokenEntityToRefreshToken(
  refreshTokenEntity: RefreshTokenEntity,
): RefreshToken {
  const refreshTokenId = RefreshTokenId.create(refreshTokenEntity.id);
  const createdAt = MillisecondsDate.createFromDate(
    refreshTokenEntity.createdAt,
  );
  const secondsDuration = SecondsDuration.create(refreshTokenEntity.duration);
  const ipAddress = IpAddress.create(refreshTokenEntity.ipAddress);
  const replacedAt = refreshTokenEntity.replacedAt
    ? MillisecondsDate.createFromDate(refreshTokenEntity.replacedAt)
    : null;
  const replacedByRefreshTokenId = refreshTokenEntity.replacedBy
    ? RefreshTokenId.create(refreshTokenEntity.replacedBy)
    : null;
  const revokedAt = refreshTokenEntity.revokedAt
    ? MillisecondsDate.createFromDate(refreshTokenEntity.revokedAt)
    : null;

  return RefreshToken.create(
    refreshTokenId,
    ipAddress,
    createdAt,
    secondsDuration,
    replacedAt,
    replacedByRefreshTokenId,
    revokedAt,
  );
}
