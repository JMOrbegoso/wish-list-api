import { IsVerified, InvalidIsVerifiedStatus } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('is-verified', () => {
        const validValues = [true, false];

        test.each([undefined, null])(
          'should throw an error when trying to create a IsVerified from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => IsVerified.create(invalid)).toThrowError(
              InvalidIsVerifiedStatus,
            );
          },
        );

        test.each(validValues)(
          'should to create a IsVerified from %p',
          (valid) => {
            // Arrange

            // Act
            const isVerified = IsVerified.create(valid);

            // Assert
            expect(isVerified.getStatus).toBe(valid);
          },
        );

        it('should create an IsVerified with verified status', () => {
          // Arrange

          // Act
          const isVerified = IsVerified.verified();

          // Assert
          expect(isVerified.getStatus).toBe(true);
        });

        it('should create an IsVerified with not verified status', () => {
          // Arrange

          // Act
          const isVerified = IsVerified.notVerified();

          // Assert
          expect(isVerified.getStatus).toBe(false);
        });

        it('create two IsVerified instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const isVerified_1 = IsVerified.verified();
          const isVerified_2 = IsVerified.create(false);
          const result = isVerified_1.equals(isVerified_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two IsVerified instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const isVerified_1 = IsVerified.notVerified();
          const isVerified_2 = IsVerified.create(false);
          const result = isVerified_1.equals(isVerified_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
