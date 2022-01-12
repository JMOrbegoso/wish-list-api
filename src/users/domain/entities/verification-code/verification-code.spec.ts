import { MockedObject } from 'ts-jest/dist/utils/testing';
import { VerificationCode, VerificationCodeId } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('verification-code', () => {
        it('should create a VerificationCode with [id: %p]', () => {
          // Arrange
          const verificationCodeId = {} as MockedObject<VerificationCodeId>;

          // Act
          const verificationCode = VerificationCode.create(verificationCodeId);

          // Assert
          expect(verificationCode.id.value).toBe(verificationCodeId.value);
        });

        it('comparing two entities should call "equals" method from VerificationCodeId', () => {
          // Arrange
          const verificationCodeId = {
            equals: jest.fn(),
          } as MockedObject<VerificationCodeId>;
          const verificationCode = VerificationCode.create(verificationCodeId);

          // Act
          verificationCode.equals(verificationCode);

          // Assert
          expect(verificationCodeId.equals.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
