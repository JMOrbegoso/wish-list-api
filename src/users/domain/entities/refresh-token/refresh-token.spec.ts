import { MockedObject } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import { RefreshToken } from '..';
import {
  MillisecondsDate,
  UniqueId,
} from '../../../../core/domain/value-objects';
import { Ip, SecondsDuration } from '../../value-objects';

const validValues = [
  [
    mocked<UniqueId>({
      getId: 'id-0',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<UniqueId>({
      getId: 'user-0',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<MillisecondsDate>({
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<SecondsDuration>({
      getDuration: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as SecondsDuration),
    mocked<Ip>({
      getIp: '192.168.1.1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Ip),
    mocked<MillisecondsDate>({
      getMilliseconds: 1,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-1',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<UniqueId>({
      getId: 'user-1',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<MillisecondsDate>({
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<SecondsDuration>({
      getDuration: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as SecondsDuration),
    mocked<Ip>({
      getIp: '192.168.1.1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Ip),
    null,
    mocked<MillisecondsDate>({
      getMilliseconds: 2,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-2',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<UniqueId>({
      getId: 'user-2',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<MillisecondsDate>({
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<SecondsDuration>({
      getDuration: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as SecondsDuration),
    mocked<Ip>({
      getIp: '192.168.1.1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Ip),
    null,
    null,
    mocked<MillisecondsDate>({
      getMilliseconds: 3,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-3',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<UniqueId>({
      getId: 'user-3',
      equals: jest.fn(),
    } as unknown as UniqueId),
    mocked<MillisecondsDate>({
      getMilliseconds: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as MillisecondsDate),
    mocked<SecondsDuration>({
      getDuration: 4,
      equals: jest.fn().mockReturnValue(true),
    } as unknown as SecondsDuration),
    mocked<Ip>({
      getIp: '192.168.1.1',
      equals: jest.fn().mockReturnValue(true),
    } as unknown as Ip),
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
          'should create an RefreshToken with [id: %p], [userId: %p], [createdAt: %p], [secondsDuration: %p], [ip: %p], [replacedAt: %p], [replacedBy: %p], [revokedAt: %p]',
          (
            id: MockedObject<UniqueId>,
            userId: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ip: MockedObject<Ip>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange

            // Act
            const refreshToken = RefreshToken.create(
              id,
              userId,
              createdAt,
              secondsDuration,
              ip,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            // Assert
            expect(refreshToken.id.getId).toBe(id.getId);
            expect(refreshToken.userId.getId).toBe(userId.getId);
            expect(refreshToken.createdAt.getMilliseconds).toBe(
              createdAt.getMilliseconds,
            );
            expect(refreshToken.duration).toBe(secondsDuration.getDuration);
            expect(refreshToken.ip).toBe(ip.getIp);

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
            userId: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ip: MockedObject<Ip>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const refreshToken = RefreshToken.create(
              id,
              userId,
              createdAt,
              secondsDuration,
              ip,
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
          'replace RefreshToken should change the property value',
          (
            id: MockedObject<UniqueId>,
            userId: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ip: MockedObject<Ip>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const refreshToken = RefreshToken.create(
              id,
              userId,
              createdAt,
              secondsDuration,
              ip,
              replacedAt,
              replacedBy,
              revokedAt,
            );

            const newRefreshToken = mocked<UniqueId>({
              getId: 'newHash',
            } as unknown as UniqueId);

            // Act
            refreshToken.replace(newRefreshToken);

            // Assert
            expect(refreshToken.replacedBy.getId).toBe(newRefreshToken.getId);
            expect(refreshToken.replacedAt).not.toBeNull();
            expect(refreshToken.wasReplaced).toBeTruthy();
          },
        );

        test.each(validValues)(
          'revoke RefreshToken should change the property value',
          (
            id: MockedObject<UniqueId>,
            userId: MockedObject<UniqueId>,
            createdAt: MockedObject<MillisecondsDate>,
            secondsDuration: MockedObject<SecondsDuration>,
            ip: MockedObject<Ip>,
            replacedAt: MockedObject<MillisecondsDate>,
            replacedBy: MockedObject<UniqueId>,
            revokedAt: MockedObject<MillisecondsDate>,
          ) => {
            // Arrange
            const refreshToken = RefreshToken.create(
              id,
              userId,
              createdAt,
              secondsDuration,
              ip,
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
