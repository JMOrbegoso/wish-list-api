import { MockedObject } from 'ts-jest/dist/utils/testing';
import { InvalidRefreshTokenError, RefreshToken } from '..';
import {
  InvalidMillisecondsDateError,
  InvalidUniqueIdError,
  MillisecondsDate,
  UniqueId,
} from '../../../../shared/domain/value-objects';
import {
  InvalidIpAddressError,
  InvalidSecondsDurationError,
  IpAddress,
  SecondsDuration,
} from '../../value-objects';

const validValues = [
  [
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getMilliseconds: 4,
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
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-1',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getMilliseconds: 4,
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
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
    {
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-2',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getMilliseconds: 4,
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
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as MockedObject<MillisecondsDate>,
  ],
  [
    {
      getId: 'id-3',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
    {
      getMilliseconds: 4,
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
            ).toThrowError(InvalidIpAddressError);
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
            ).toThrowError(InvalidMillisecondsDateError);
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
            ).toThrowError(InvalidSecondsDurationError);
          },
        );

        test.each(validValues)(
          'should create an RefreshToken with [id: %p], [createdAt: %p], [secondsDuration: %p], [ipAddress: %p], [replacedAt: %p], [replacedBy: %p], [revokedAt: %p]',
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
          },
        );
      });
    });
  });
});
