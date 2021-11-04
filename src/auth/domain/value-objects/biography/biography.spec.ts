import { Biography } from '..';

describe('auth', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('biography', () => {
        it('should throw an error when trying to create a Biography from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Biography.create(undefined)).toThrowError(
            'Invalid biography',
          );
        });

        it('should throw an error when trying to create a Biography from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Biography.create(null)).toThrowError(
            'Invalid biography',
          );
        });

        it('should throw an error when trying to create a Biography from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Biography.create('')).toThrowError('Invalid biography.');
        });

        it('should throw an error when trying to create a Biography from an string with more characters than the limit', () => {
          // Arrange

          // Act
          const invalidBiography = 'a'.repeat(Biography.MaxLength + 1);

          // Assert
          expect(() => Biography.create(invalidBiography)).toThrowError(
            'Invalid biography.',
          );
        });

        it('should create a Biography instance from the largest valid string and should store the value', () => {
          // Arrange

          // Act
          const largestValidBiography = 'a'.repeat(Biography.MaxLength);
          const biography = Biography.create(largestValidBiography);

          // Assert
          expect(biography.getBiography).toBe(largestValidBiography);
        });

        it('should create a Biography instance and should store the value', () => {
          // Arrange

          // Act
          const text = 'A person.';
          const biography = Biography.create(text);

          // Assert
          expect(biography.getBiography).toBe(text);
        });

        it('create two Biography instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const text_1 = 'A person.';
          const text_2 = 'A nice person.';
          const biography_1 = Biography.create(text_1);
          const biography_2 = Biography.create(text_2);
          const result = biography_1.equals(biography_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two Biography instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const name = 'Doeh';
          const biography_1 = Biography.create(name);
          const biography_2 = Biography.create(name);
          const result = biography_1.equals(biography_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
