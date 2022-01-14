import { MockedObject } from 'ts-jest/dist/utils/testing';
import { VerificationCodeEntity } from '../persistence/entities';
import { verificationCodeEntityToVerificationCode } from '.';

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('VerificationCodeEntity to VerificationCode', () => {
        it('should map VerificationCodeEntity to VerificationCode keeping all the property values', () => {
          // Arrange
          const verificationCodeEntity = {
            id: 'id-0',
            createdAt: new Date(2021, 5, 5),
            duration: 100,
          } as MockedObject<VerificationCodeEntity>;
          // Act
          const verificationCode = verificationCodeEntityToVerificationCode(
            verificationCodeEntity,
          );

          // Assert
          expect(verificationCode.id.value).toBe(verificationCodeEntity.id);

          expect(verificationCode.createdAt.getDate.getTime()).toBe(
            verificationCodeEntity.createdAt.getTime(),
          );
          expect(verificationCode.duration).toBe(
            verificationCodeEntity.duration,
          );
        });
      });
    });
  });
});
