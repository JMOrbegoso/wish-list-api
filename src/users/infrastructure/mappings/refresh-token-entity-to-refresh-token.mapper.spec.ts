import { mocked } from 'ts-jest/utils';
import { RefreshTokenEntity } from '../persistence/entities';
import { refreshTokenEntityToRefreshToken } from '.';

const validValues = [
  [
    mocked<RefreshTokenEntity>({
      id: 'id-0',
      userId: 'user-id-0',
      createdAt: new Date(2021, 5, 5),
      duration: 100,
      ip: '192.168.0.1',
      replacedAt: null,
      replacedBy: null,
      revokedAt: null,
    } as unknown as RefreshTokenEntity),
  ],
  [
    mocked<RefreshTokenEntity>({
      id: 'id-0',
      userId: 'user-id-0',
      createdAt: new Date(2021, 5, 5),
      duration: 100,
      ip: '192.168.0.1',
      replacedAt: null,
      replacedBy: null,
      revokedAt: new Date(2021, 5, 5),
    } as unknown as RefreshTokenEntity),
  ],
  [
    mocked<RefreshTokenEntity>({
      id: 'id-0',
      userId: 'user-id-0',
      createdAt: new Date(2021, 5, 5),
      duration: 100,
      ip: '192.168.0.1',
      replacedAt: new Date(2021, 5, 5),
      replacedBy: 'id-1',
      revokedAt: null,
    } as unknown as RefreshTokenEntity),
  ],
  [
    mocked<RefreshTokenEntity>({
      id: 'id-0',
      userId: 'user-id-0',
      createdAt: new Date(2021, 5, 5),
      duration: 100,
      ip: '192.168.0.1',
      replacedAt: new Date(2021, 5, 5),
      replacedBy: 'id-1',
      revokedAt: new Date(2021, 5, 5),
    } as unknown as RefreshTokenEntity),
  ],
];

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('RefreshTokenEntity to RefreshToken', () => {
        test.each(validValues)(
          'should map RefreshTokenEntity to RefreshToken keeping all the property values',
          (refreshTokenEntity: RefreshTokenEntity) => {
            // Arrange

            // Act
            const refreshToken =
              refreshTokenEntityToRefreshToken(refreshTokenEntity);

            // Assert
            expect(refreshToken.id.getId).toBe(refreshTokenEntity.id);

            expect(refreshToken.userId.getId).toBe(refreshTokenEntity.userId);
            expect(refreshToken.createdAt.getMilliseconds).toBe(
              refreshTokenEntity.createdAt.getTime(),
            );
            expect(refreshToken.duration).toBe(refreshTokenEntity.duration);
            expect(refreshToken.ip).toBe(refreshTokenEntity.ip);
            if (refreshTokenEntity.replacedAt)
              expect(refreshToken.replacedAt.getMilliseconds).toBe(
                refreshTokenEntity.replacedAt.getTime(),
              );
            else expect(refreshToken.replacedAt).toBeNull();
            if (refreshTokenEntity.replacedBy)
              expect(refreshToken.replacedBy.getId).toBe(
                refreshTokenEntity.replacedBy,
              );
            else expect(refreshToken.replacedBy).toBeNull();
            if (refreshTokenEntity.revokedAt)
              expect(refreshToken.revokedAt.getMilliseconds).toBe(
                refreshTokenEntity.revokedAt.getTime(),
              );
            else expect(refreshToken.revokedAt).toBeNull();
          },
        );
      });
    });
  });
});
