import { MockedObject } from 'ts-jest/dist/utils/testing';
import { VerificationCode } from '../../domain/entities';
import { verificationCodeToVerificationCodeEntity } from '.';

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('VerificationCode to VerificationCodeEntity', () => {
        it('should map VerificationCode to VerificationCodeEntity keeping all the property values', () => {
          // Arrange
          const verificationCode = {
            id: {
              value: 'id-0',
            },
            createdAt: { getDate: new Date(2000, 5, 5) },
            duration: { getDuration: 1000 },
          } as MockedObject<VerificationCode>;

          // Act
          const verificationCodeEntity =
            verificationCodeToVerificationCodeEntity(verificationCode);

          // Assert
          expect(verificationCodeEntity.id).toBe(verificationCode.id.value);
          expect(verificationCodeEntity.createdAt.getTime()).toBe(
            verificationCode.createdAt.getDate.getTime(),
          );
          expect(verificationCodeEntity.duration).toBe(
            verificationCode.duration.getDuration,
          );
        });
      });
    });
  });
});
