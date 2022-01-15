import { MockedObject } from 'ts-jest/dist/utils/testing';
import { VerificationCode, VerificationCodeId } from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';
import { MillisecondsDate } from '../../../../shared/domain/value-objects';
import { SecondsDuration } from '../../value-objects';
import {
  InvalidVerificationCodeCreatedAtError,
  InvalidVerificationCodeDurationError,
} from './exceptions';

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('verification-code', () => {
        it('create a VerificationCode with invalid id should throw error', () => {
          // Arrange
          const createdAt = {} as MockedObject<MillisecondsDate>;
          const duration = {} as MockedObject<SecondsDuration>;

          // Act

          // Assert
          expect(() =>
            VerificationCode.create(null, createdAt, duration),
          ).toThrowError(InvalidEntityIdError);
        });

        it('create a VerificationCode with invalid createdAt should throw error', () => {
          // Arrange
          const verificationCodeId = {} as MockedObject<VerificationCodeId>;
          const duration = {} as MockedObject<SecondsDuration>;

          // Act

          // Assert
          expect(() =>
            VerificationCode.create(verificationCodeId, null, duration),
          ).toThrowError(InvalidVerificationCodeCreatedAtError);
        });

        it('create a VerificationCode with invalid duration should throw error', () => {
          // Arrange
          const verificationCodeId = {
            value: 'verification-code-id',
          } as MockedObject<VerificationCodeId>;
          const createdAt = {
            getMilliseconds: new Date().getTime(),
          } as MockedObject<MillisecondsDate>;

          // Act

          // Assert
          expect(() =>
            VerificationCode.create(verificationCodeId, createdAt, null),
          ).toThrowError(InvalidVerificationCodeDurationError);
        });

        it('should create a VerificationCode', () => {
          // Arrange
          const verificationCodeId = {
            value: 'verification-code-id',
          } as MockedObject<VerificationCodeId>;
          const createdAt = {
            getMilliseconds: 100000,
          } as MockedObject<MillisecondsDate>;
          const duration = {
            getDuration: 1000,
          } as MockedObject<SecondsDuration>;

          // Act
          const verificationCode = VerificationCode.create(
            verificationCodeId,
            createdAt,
            duration,
          );

          // Assert
          expect(verificationCode.id.value).toBe(verificationCodeId.value);
          expect(verificationCode.createdAt.getMilliseconds).toBe(
            createdAt.getMilliseconds,
          );
          expect(verificationCode.duration.getDuration).toBe(
            duration.getDuration,
          );
        });

        it('should create an expired VerificationCode', async () => {
          // Arrange
          const verificationCodeId = {
            value: 'verification-code-id',
          } as MockedObject<VerificationCodeId>;
          const createdAt = {
            getMilliseconds: new Date(1990, 1, 1).getTime(),
          } as MockedObject<MillisecondsDate>;
          const durationInSeconds = 100;
          const duration = {
            getDuration: durationInSeconds,
          } as MockedObject<SecondsDuration>;

          // Act
          const verificationCode = VerificationCode.create(
            verificationCodeId,
            createdAt,
            duration,
          );

          // Assert
          expect(verificationCode.id.value).toBe(verificationCodeId.value);
          expect(verificationCode.createdAt.getMilliseconds).toBe(
            createdAt.getMilliseconds,
          );
          expect(verificationCode.duration.getDuration).toBe(durationInSeconds);
          expect(verificationCode.expireAt.getMilliseconds).toBeTruthy();
          expect(verificationCode.isExpired).toBe(true);
        });

        it('comparing two entities should call "equals" method from VerificationCodeId', () => {
          // Arrange
          const verificationCodeId = {
            equals: jest.fn(),
          } as MockedObject<VerificationCodeId>;
          const createdAt = {} as MockedObject<MillisecondsDate>;
          const duration = {} as MockedObject<SecondsDuration>;
          const verificationCode = VerificationCode.create(
            verificationCodeId,
            createdAt,
            duration,
          );

          // Act
          verificationCode.equals(verificationCode);

          // Assert
          expect(verificationCodeId.equals.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
