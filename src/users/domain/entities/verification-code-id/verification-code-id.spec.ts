import { VerificationCodeId } from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('verification-code-id', () => {
        it('create a VerificationCodeId with id null should throw error', () => {
          // Arrange

          // Act

          // Assert
          expect(() => VerificationCodeId.create(null)).toThrowError(
            InvalidEntityIdError,
          );
        });

        it('should create a VerificationCodeId with id = "id-1"', () => {
          // Arrange

          // Act
          const verificationCodeId = VerificationCodeId.create('id-1');

          // Assert
          expect(verificationCodeId.value).toBe('id-1');
          expect(verificationCodeId.base64).not.toBe('id-1');
          expect(verificationCodeId.base64).toBeTruthy();
        });

        it('comparing an entity id with null should return false', () => {
          // Arrange
          const verificationCodeId = VerificationCodeId.create('id-2');

          // Act
          const result = verificationCodeId.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two different entity ids should return false', () => {
          // Arrange
          const verificationCodeId_1 = VerificationCodeId.create('id-1');
          const verificationCodeId_2 = VerificationCodeId.create('id-2');

          // Act
          const result = verificationCodeId_1.equals(verificationCodeId_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two equals entity ids should return true', () => {
          // Arrange
          const verificationCodeId_1 = VerificationCodeId.create('id-1');
          const verificationCodeId_2 = VerificationCodeId.create('id-1');

          // Act
          const result = verificationCodeId_1.equals(verificationCodeId_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
