import { Biography, InvalidBiographyError, BiographyIsTooLongError } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('biography', () => {
        const validValues = [
          'a'.repeat(Biography.MaxLength),
          '1'.repeat(Biography.MaxLength),
          '_'.repeat(Biography.MaxLength),
          'A person.',
          'A nice person.',
          'A kind person.',
          'A person 1.',
        ];

        test.each([undefined, null, ''])(
          'should throw an error when trying to create a Biography from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => Biography.create(invalid)).toThrowError(
              InvalidBiographyError,
            );
          },
        );

        test.each([
          'a'.repeat(Biography.MaxLength + 1),
          '1'.repeat(Biography.MaxLength + 1),
          '_'.repeat(Biography.MaxLength + 1),
          'a'.repeat(Biography.MaxLength + 5),
          '1'.repeat(Biography.MaxLength + 5),
          '_'.repeat(Biography.MaxLength + 5),
          'a'.repeat(Biography.MaxLength + 10),
          '1'.repeat(Biography.MaxLength + 10),
          '_'.repeat(Biography.MaxLength + 10),
        ])(
          'should throw an error when trying to create a Biography from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => Biography.create(larger)).toThrowError(
              BiographyIsTooLongError,
            );
          },
        );

        test.each(validValues)('should create a Biography from %p', (valid) => {
          // Arrange

          // Act
          const biography = Biography.create(valid);

          // Assert
          expect(biography.getBiography).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two Biography created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const biography_1 = Biography.create(text1);
            const biography_2 = Biography.create(text2);
            const result = biography_1.equals(biography_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two Biography created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const biography1 = Biography.create(text);
            const biography2 = Biography.create(text);
            const result = biography1.equals(biography2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
