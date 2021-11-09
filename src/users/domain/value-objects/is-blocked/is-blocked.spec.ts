import { IsBlocked, InvalidIsBlockedStatus } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('blocked', () => {
        const validValues = [true, false];

        test.each([undefined, null])(
          'should throw an error when trying to create a IsBlocked from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => IsBlocked.create(invalid)).toThrowError(
              InvalidIsBlockedStatus,
            );
          },
        );

        test.each(validValues)(
          'should to create a IsBlocked from %p',
          (valid) => {
            // Arrange

            // Act
            const isBlocked = IsBlocked.create(valid);

            // Assert
            expect(isBlocked.getStatus).toBe(valid);
          },
        );

        it('should create an IsBlocked with blocked status', () => {
          // Arrange

          // Act
          const isBlocked = IsBlocked.blocked();

          // Assert
          expect(isBlocked.getStatus).toBe(true);
        });

        it('should create an IsBlocked with not blocked status', () => {
          // Arrange

          // Act
          const isBlocked = IsBlocked.notBlocked();

          // Assert
          expect(isBlocked.getStatus).toBe(false);
        });

        it('create two IsBlocked instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const isBlocked_1 = IsBlocked.blocked();
          const isBlocked_2 = IsBlocked.create(false);
          const result = isBlocked_1.equals(isBlocked_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two IsBlocked instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const isBlocked_1 = IsBlocked.notBlocked();
          const isBlocked_2 = IsBlocked.create(false);
          const result = isBlocked_1.equals(isBlocked_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
