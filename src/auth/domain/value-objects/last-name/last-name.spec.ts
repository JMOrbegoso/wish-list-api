import { LastName } from '..';

describe('auth', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('last-name', () => {
        it('should throw an error when trying to create a LastName from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => LastName.create(undefined)).toThrowError(
            'Invalid last name',
          );
        });

        it('should throw an error when trying to create a LastName from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => LastName.create(null)).toThrowError('Invalid last name');
        });

        it('should throw an error when trying to create a LastName from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => LastName.create('')).toThrowError('Invalid last name');
        });

        it('should throw an error when trying to create a LastName from an string with more characters than the limit', () => {
          // Arrange

          // Act
          const invalidLastName = 'a'.repeat(LastName.MaxLength + 1);

          // Assert
          expect(() => LastName.create(invalidLastName)).toThrowError(
            'Invalid last name.',
          );
        });

        it('should create a LastName instance from the largest valid string and should store the value', () => {
          // Arrange

          // Act
          const largestValidLastName = 'a'.repeat(LastName.MaxLength);
          const lastName = LastName.create(largestValidLastName);

          // Assert
          expect(lastName.getLastName).toBe(largestValidLastName);
        });

        it('should create a LastName instance and should store the value', () => {
          // Arrange

          // Act
          const name = 'Doe';
          const lastName = LastName.create(name);

          // Assert
          expect(lastName.getLastName).toBe(name);
        });

        it('create two LastName instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const name_1 = 'Doe';
          const name_2 = 'Doeh';
          const lastName_1 = LastName.create(name_1);
          const lastName_2 = LastName.create(name_2);
          const result = lastName_1.equals(lastName_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two LastName instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const name = 'Doeh';
          const lastName_1 = LastName.create(name);
          const lastName_2 = LastName.create(name);
          const result = lastName_1.equals(lastName_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
