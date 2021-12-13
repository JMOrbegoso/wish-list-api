import {
  MillisecondsDate,
  UniqueId,
} from '../../../shared/domain/value-objects';
import { RefreshToken } from '../../domain/entities';
import { IpAddress, SecondsDuration } from '../../domain/value-objects';
import { RefreshTokenEntity } from '../persistence/entities';

export function refreshTokenEntityToRefreshToken(
  refreshTokenEntity: RefreshTokenEntity,
): RefreshToken {
  const id = UniqueId.create(refreshTokenEntity.id);
  const userId = UniqueId.create(refreshTokenEntity.userId);
  const createdAt = MillisecondsDate.createFromDate(
    refreshTokenEntity.createdAt,
  );
  const secondsDuration = SecondsDuration.create(refreshTokenEntity.duration);
  const ipAddress = IpAddress.create(refreshTokenEntity.ipAddress);
  const replacedAt = refreshTokenEntity.replacedAt
    ? MillisecondsDate.createFromDate(refreshTokenEntity.replacedAt)
    : null;
  const replacedBy = refreshTokenEntity.replacedBy
    ? UniqueId.create(refreshTokenEntity.replacedBy)
    : null;
  const revokedAt = refreshTokenEntity.revokedAt
    ? MillisecondsDate.createFromDate(refreshTokenEntity.revokedAt)
    : null;

  return RefreshToken.create(
    id,
    userId,
    ipAddress,
    createdAt,
    secondsDuration,
    replacedAt,
    replacedBy,
    revokedAt,
  );
}
