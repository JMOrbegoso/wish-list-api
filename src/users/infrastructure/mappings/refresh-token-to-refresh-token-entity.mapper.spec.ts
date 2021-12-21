import { MockedObject } from 'ts-jest/dist/utils/testing';
import { RefreshToken } from '../../domain/entities';
import { refreshTokenToRefreshTokenEntity } from '.';

const validValues = [
  [
    {
      id: {
        getId: 'id-0',
      },
      userId: {
        getId: 'user-id-0',
      },
      createdAt: { getDate: new Date(2000, 5, 5) },
      duration: { getDuration: 100 },
      ipAddress: { getIpAddress: '192.168.1.1' },
      replacedAt: { getDate: new Date(2000, 5, 5) },
      replacedBy: { getId: 'user-id-1' },
      revokedAt: { getDate: new Date(2000, 5, 5) },
    } as unknown as MockedObject<RefreshToken>,
  ],
  [
    {
      id: {
        getId: 'id-0',
      },
      userId: {
        getId: 'user-id-0',
      },
      createdAt: { getDate: new Date(2000, 5, 5) },
      duration: { getDuration: 100 },
      ipAddress: { getIpAddress: '192.168.1.1' },
      replacedAt: null,
      replacedBy: null,
      revokedAt: { getDate: new Date(2000, 5, 5) },
    } as unknown as MockedObject<RefreshToken>,
  ],
  [
    {
      id: {
        getId: 'id-0',
      },
      userId: {
        getId: 'user-id-0',
      },
      createdAt: { getDate: new Date(2000, 5, 5) },
      duration: { getDuration: 100 },
      ipAddress: { getIpAddress: '192.168.1.1' },
      replacedAt: { getDate: new Date(2000, 5, 5) },
      replacedBy: { getId: 'user-id-1' },
      revokedAt: null,
    } as unknown as MockedObject<RefreshToken>,
  ],
  [
    {
      id: {
        getId: 'id-0',
      },
      userId: {
        getId: 'user-id-0',
      },
      createdAt: { getDate: new Date(2000, 5, 5) },
      duration: { getDuration: 100 },
      ipAddress: { getIpAddress: '192.168.1.1' },
      replacedAt: null,
      replacedBy: null,
      revokedAt: null,
    } as unknown as MockedObject<RefreshToken>,
  ],
];

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('RefreshToken to RefreshTokenEntity', () => {
        test.each(validValues)(
          'should map RefreshToken to RefreshTokenEntity keeping all the property values',
          (refreshToken: RefreshToken) => {
            // Arrange

            // Act
            const refreshTokenEntity =
              refreshTokenToRefreshTokenEntity(refreshToken);

            // Assert
            expect(refreshTokenEntity.id).toBe(refreshToken.id.getId);
            expect(refreshTokenEntity.id).toBe(refreshToken.id.getId);
            expect(refreshTokenEntity.userId).toBe(refreshToken.userId.getId);
            expect(refreshTokenEntity.createdAt).toBe(
              refreshToken.createdAt.getDate,
            );
            expect(refreshTokenEntity.duration).toBe(refreshToken.duration);
            expect(refreshTokenEntity.ipAddress).toBe(refreshToken.ipAddress);

            if (refreshToken.replacedAt)
              expect(refreshTokenEntity.replacedAt.getTime()).toBe(
                refreshToken.replacedAt.getDate.getTime(),
              );
            else expect(refreshTokenEntity.replacedAt).toBeNull();

            if (refreshToken.replacedBy)
              expect(refreshTokenEntity.replacedBy).toBe(
                refreshToken.replacedBy.getId,
              );
            else expect(refreshTokenEntity.replacedBy).toBeNull();

            if (refreshToken.revokedAt)
              expect(refreshTokenEntity.revokedAt.getTime()).toBe(
                refreshToken.revokedAt.getDate.getTime(),
              );
            else expect(refreshTokenEntity.revokedAt).toBeNull();
          },
        );
      });
    });
  });
});
