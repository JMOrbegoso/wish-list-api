import { MockedObject } from 'ts-jest/dist/utils/testing';
import { RefreshToken } from '..';
import {
  InvalidUniqueIdError,
  MillisecondsDate,
  UniqueId,
} from '../../../../shared/domain/value-objects';
import { IpAddress, SecondsDuration } from '../../value-objects';
import {
  InvalidRefreshTokenCreatedAtError,
  InvalidRefreshTokenDurationError,
  InvalidRefreshTokenError,
  InvalidRefreshTokenIpAddressError,
} from './exceptions';

const validValues = [
  [
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getDuration: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<SecondsDuration>,
    {
      getIpAddress: '192.168.1.1',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IpAddress>,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-1',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getDuration: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<SecondsDuration>,
    {
      getIpAddress: '192.168.1.1',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IpAddress>,
    null,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-2',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getDuration: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<SecondsDuration>,
    {
      getIpAddress: '192.168.1.1',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IpAddress>,
    null,
    null,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-3',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getMilliseconds: new Date().getTime(),
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getDuration: 4,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<SecondsDuration>,
    {
      getIpAddress: '192.168.1.1',
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<IpAddress>,
    null,
    null,
    null,
  ],
];

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('refresh-token', () => {
        test.each(validValues)(
          'create a RefreshToken with invalid id should throw error',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              RefreshToken.create(
                null,
                ipAddress,
                createdAt,
                secondsDuration,
                replacedAt,
                replacedBy,
                revokedAt,
              ),
            ).toThrowError(InvalidUniqueIdError);
          },
        );

        test.each(validValues)(
          'create a RefreshToken with invalid ipAddress should throw error',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              RefreshToken.create(
                id,
                null,
                createdAt,
                secondsDuration,
                replacedAt,
                replacedBy,
                revokedAt,
              ),
            ).toThrowError(InvalidRefreshTokenIpAddressError);
          },
        );

        test.each(validValues)(
          'create a RefreshToken with invalid createdAt should throw error',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              RefreshToken.create(
                id,
                ipAddress,
                null,
                secondsDuration,
                replacedAt,
                replacedBy,
                revokedAt,
              ),
            ).toThrowError(InvalidRefreshTokenCreatedAtError);
          },
        );

        test.each(validValues)(
          'create a RefreshToken with invalid secondsDuration should throw error',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act

            // Assert
            expect(() =>
              RefreshToken.create(
                id,
                ipAddress,
                createdAt,
                null,
                replacedAt,
                replacedBy,
                revokedAt,
              ),
            ).toThrowError(InvalidRefreshTokenDurationError);
          },
        );

        test.each(validValues)(
          'should create a RefreshToken with [id: %p], [createdAt: %p], [secondsDuration: %p], [ipAddress: %p]',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
          ) => {
            // Arrange

            // Act
            const refreshToken = RefreshToken.create(
              id,
              ipAddress,
              createdAt,
              secondsDuration,
            );

            // Assert
            expect(refreshToken.id.getId).toBe(id.getId);
            expect(refreshToken.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(refreshToken.duration).toBe(secondsDuration.getDuration);
            expect(refreshToken.ipAddress).toBe(ipAddress.getIpAddress);

            expect(refreshToken.replacedAt).toBeNull();
            expect(refreshToken.replacedBy).toBeNull();
            expect(refreshToken.wasReplaced).toBeFalsy();

            expect(refreshToken.revokedAt).toBeNull();
            expect(refreshToken.isRevoked).toBeFalsy();
          },
        );

        test.each(validValues)(
          'should create a RefreshToken with [id: %p], [createdAt: %p], [secondsDuration: %p], [ipAddress: %p], [replacedAt: %p], [replacedBy: %p], [revokedAt: %p]',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            const refreshToken = RefreshToken.create(
              id,
              ipAddress,
              createdAt,
              secondsDuration,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            // Assert
            expect(refreshToken.id.getId).toBe(id.getId);
            expect(refreshToken.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(refreshToken.duration).toBe(secondsDuration.getDuration);
            expect(refreshToken.ipAddress).toBe(ipAddress.getIpAddress);

            if (replacedAt)
              expect(refreshToken.replacedAt.getMilliseconds).toBe(
                replacedAt.getMilliseconds,
              );
            else expect(refreshToken.replacedAt).toBeNull();

            if (replacedBy)
              expect(refreshToken.replacedBy.getId).toBe(replacedBy.getId);
            else expect(refreshToken.replacedBy).toBeNull();

            if (revokedAt)
              expect(refreshToken.revokedAt.getMilliseconds).toBe(
                revokedAt.getMilliseconds,
              );
            else expect(refreshToken.revokedAt).toBeNull();
          },
        );

        test.each(validValues)(
          'should create a valid RefreshToken',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            secondsDuration = {
              getDuration: 10000,
            } as MockedObject<SecondsDuration>;
            replacedAt = null;
            replacedBy = null;
            revokedAt = null;

            // Act
            const refreshToken = RefreshToken.create(
              id,
              ipAddress,
              createdAt,
              secondsDuration,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            // Assert
            expect(refreshToken.isExpired).toBeFalsy();
            expect(refreshToken.wasReplaced).toBeFalsy();
            expect(refreshToken.isRevoked).toBeFalsy();
            expect(refreshToken.isValid).toBeTruthy();
          },
        );

        test.each(validValues)(
          'should create a expired RefreshToken',
          async (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const durationInSeconds = 1;
            secondsDuration = {
              getDuration: durationInSeconds,
            } as MockedObject<SecondsDuration>;
            replacedAt = null;
            replacedBy = null;
            revokedAt = null;

            await new Promise((resolve) =>
              setTimeout(resolve, (durationInSeconds + 1) * 1000),
            );

            // Act
            const refreshToken = RefreshToken.create(
              id,
              ipAddress,
              createdAt,
              secondsDuration,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            // Assert
            expect(refreshToken.isExpired).toBeTruthy();
            expect(refreshToken.wasReplaced).toBeFalsy();
            expect(refreshToken.isRevoked).toBeFalsy();
            expect(refreshToken.isValid).toBeFalsy();
          },
        );

        test.each(validValues)(
          'comparing two entities should call "equals" method from UniqueId',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const refreshToken = RefreshToken.create(
              id,
              ipAddress,
              createdAt,
              secondsDuration,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            // Act
            refreshToken.equals(refreshToken);

            // Assert
            expect(id.equals.mock.calls).toHaveLength(1);
          },
        );

        test.each(validValues)(
          'replace RefreshToken with a invalid one should throw error',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const refreshToken = RefreshToken.create(
              id,
              ipAddress,
              createdAt,
              secondsDuration,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            // Act

            // Assert
            expect(() => refreshToken.replace(null)).toThrowError(
              InvalidRefreshTokenError,
            );
          },
        );

        test.each(validValues)(
          'replace RefreshToken should change the property value',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const refreshToken = RefreshToken.create(
              id,
              ipAddress,
              createdAt,
              secondsDuration,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            const newRefreshToken = {
              id: { getId: 'newHash' },
            } as MockedObject<RefreshToken>;

            // Act
            refreshToken.replace(newRefreshToken);

            // Assert
            expect(refreshToken.replacedBy.getId).toBe(
              newRefreshToken.id.getId,
            );
            expect(refreshToken.replacedAt).not.toBeNull();
            expect(refreshToken.wasReplaced).toBeTruthy();
            expect(refreshToken.isValid).toBeFalsy();
          },
        );

        test.each(validValues)(
          'revoke RefreshToken should change the property value',
          (
            id: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ipAddress: MockedObject<IpAddress>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const refreshToken = RefreshToken.create(
              id,
              ipAddress,
              createdAt,
              secondsDuration,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            // Act
            refreshToken.revoke();

            // Assert
            expect(refreshToken.revokedAt).not.toBeNull();
            expect(refreshToken.isRevoked).toBeTruthy();
            expect(refreshToken.isValid).toBeFalsy();
          },
        );
      });
    });
  });
});
