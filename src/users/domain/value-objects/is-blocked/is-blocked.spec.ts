import { IsBlocked, InvalidIsBlockedStatus } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('blocked', () => {
        it('should throw an error when trying to create an IsBlocked from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => IsBlocked.create(undefined)).toThrowError(
            InvalidIsBlockedStatus,
          );
        });

        it('should throw an error when trying to create an IsBlocked from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => IsBlocked.create(null)).toThrowError(
            InvalidIsBlockedStatus,
          );
        });

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

        it('should create an IsBlocked with blocked status using the function create', () => {
          // Arrange

          // Act
          const isBlocked = IsBlocked.create(true);

          // Assert
          expect(isBlocked.getStatus).toBe(true);
        });

        it('should create an IsBlocked with not blocked status using the function create', () => {
          // Arrange

          // Act
          const isBlocked = IsBlocked.create(false);

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
