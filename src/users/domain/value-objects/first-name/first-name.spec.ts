import { FirstName, InvalidFirstNameError, FirstNameIsTooLongError } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('first-name', () => {
        it('should throw an error when trying to create a FirstName from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => FirstName.create(undefined)).toThrowError(
            InvalidFirstNameError,
          );
        });

        it('should throw an error when trying to create a FirstName from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => FirstName.create(null)).toThrowError(
            InvalidFirstNameError,
          );
        });

        it('should throw an error when trying to create a FirstName from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => FirstName.create('')).toThrowError(
            InvalidFirstNameError,
          );
        });

        it('should throw an error when trying to create a FirstName from a string with more characters than the limit', () => {
          // Arrange

          // Act
          const invalidFirstName = 'a'.repeat(FirstName.MaxLength + 1);

          // Assert
          expect(() => FirstName.create(invalidFirstName)).toThrowError(
            FirstNameIsTooLongError,
          );
        });

        it('should create a FirstName instance from the largest valid string and should store the value', () => {
          // Arrange

          // Act
          const largestValidFirstName = 'a'.repeat(FirstName.MaxLength);
          const firstName = FirstName.create(largestValidFirstName);

          // Assert
          expect(firstName.getFirstName).toBe(largestValidFirstName);
        });

        it('should create a FirstName instance and should store the value', () => {
          // Arrange

          // Act
          const name = 'John';
          const firstName = FirstName.create(name);

          // Assert
          expect(firstName.getFirstName).toBe(name);
        });

        it('create two FirstName instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const name_1 = 'John';
          const name_2 = 'Johnny';
          const firstName_1 = FirstName.create(name_1);
          const firstName_2 = FirstName.create(name_2);
          const result = firstName_1.equals(firstName_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two FirstName instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const name = 'John';
          const firstName_1 = FirstName.create(name);
          const firstName_2 = FirstName.create(name);
          const result = firstName_1.equals(firstName_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
