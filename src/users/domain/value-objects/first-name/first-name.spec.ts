import { FirstName, InvalidFirstNameError, FirstNameIsTooLongError } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('first-name', () => {
        const validValues = [
          'a'.repeat(FirstName.MaxLength),
          '1'.repeat(FirstName.MaxLength),
          '_'.repeat(FirstName.MaxLength),
          'John',
          'Johnny',
          'Johnny_0',
          '1John1',
          '_John-1-Doe_',
          '_John-Doe_1_',
          '999-a-999',
          '999999',
        ];

        test.each([undefined, null, ''])(
          'should throw an error when trying to create a FirstName from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => FirstName.create(invalid)).toThrowError(
              InvalidFirstNameError,
            );
          },
        );

        test.each([
          'a'.repeat(FirstName.MaxLength + 1),
          '1'.repeat(FirstName.MaxLength + 1),
          '_'.repeat(FirstName.MaxLength + 1),
          'a'.repeat(FirstName.MaxLength + 5),
          '1'.repeat(FirstName.MaxLength + 5),
          '_'.repeat(FirstName.MaxLength + 5),
          'a'.repeat(FirstName.MaxLength + 10),
          '1'.repeat(FirstName.MaxLength + 10),
          '_'.repeat(FirstName.MaxLength + 10),
        ])(
          'should throw an error when trying to create a FirstName from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => FirstName.create(larger)).toThrowError(
              FirstNameIsTooLongError,
            );
          },
        );

        test.each(validValues)(
          'should to create a FirstName from %p',
          (valid) => {
            // Arrange

            // Act
            const firstName = FirstName.create(valid);

            // Assert
            expect(firstName.getFirstName).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two FirstName created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const firstName_1 = FirstName.create(text1);
            const firstName_2 = FirstName.create(text2);
            const result = firstName_1.equals(firstName_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two FirstName created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const firstName1 = FirstName.create(text);
            const firstName2 = FirstName.create(text);
            const result = firstName1.equals(firstName2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
