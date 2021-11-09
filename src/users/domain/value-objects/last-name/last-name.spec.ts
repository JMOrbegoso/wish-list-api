import { LastName, InvalidLastNameError, LastNameIsTooLongError } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('last-name', () => {
        const validValues = [
          'a'.repeat(LastName.MaxLength),
          '1'.repeat(LastName.MaxLength),
          '_'.repeat(LastName.MaxLength),
          'Doe',
          'Doeh',
          '_John-1-Doe_',
          '_John-Doe_1_',
          '999-a-999',
          '999999',
        ];

        test.each([undefined, null, ''])(
          'should throw an error when trying to create a LastName from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => LastName.create(invalid)).toThrowError(
              InvalidLastNameError,
            );
          },
        );

        test.each([
          'a'.repeat(LastName.MaxLength + 1),
          '1'.repeat(LastName.MaxLength + 1),
          '_'.repeat(LastName.MaxLength + 1),
          'a'.repeat(LastName.MaxLength + 5),
          '1'.repeat(LastName.MaxLength + 5),
          '_'.repeat(LastName.MaxLength + 5),
          'a'.repeat(LastName.MaxLength + 10),
          '1'.repeat(LastName.MaxLength + 10),
          '_'.repeat(LastName.MaxLength + 10),
        ])(
          'should throw an error when trying to create a LastName from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => LastName.create(larger)).toThrowError(
              LastNameIsTooLongError,
            );
          },
        );

        test.each(validValues)(
          'should to create a LastName from %p',
          (valid) => {
            // Arrange

            // Act
            const lastName = LastName.create(valid);

            // Assert
            expect(lastName.getLastName).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two LastName created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const lastName_1 = LastName.create(text1);
            const lastName_2 = LastName.create(text2);
            const result = lastName_1.equals(lastName_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two LastName created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const lastName1 = LastName.create(text);
            const lastName2 = LastName.create(text);
            const result = lastName1.equals(lastName2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
