import {
  InvalidPasswordError,
  MalformedPasswordError,
  Password,
  PasswordIsTooLongError,
  PasswordIsTooShortError,
} from '..';

const validValues = [
  '1A%' + 'a'.repeat(Password.MinLength - 3),
  '1A%' + 'a'.repeat(Password.MaxLength - 3),
  'Abcd1*',
  'aAbBcC%1',
  'aA$b%B(c)C0',
  'aA$b%B(c)C1',
  'aA$b%B(1)[C]',
];

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('password', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create a Password from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => Password.create(invalid)).toThrowError(
              InvalidPasswordError,
            );
          },
        );

        test.each([
          'a'.repeat(Password.MinLength - 1),
          '1'.repeat(Password.MinLength - 1),
          'a'.repeat(Password.MinLength - 3),
          '1'.repeat(Password.MinLength - 3),
          'AA',
          'AAA',
          'ABCDE',
          '11111',
        ])(
          'should throw an error when trying to create a Password from %p (Less characters than the limit)',
          (shorter) => {
            // Arrange

            // Act

            // Assert
            expect(() => Password.create(shorter)).toThrowError(
              PasswordIsTooShortError,
            );
          },
        );

        test.each([
          'a'.repeat(Password.MaxLength + 1),
          '1'.repeat(Password.MaxLength + 1),
          '_'.repeat(Password.MaxLength + 1),
          'a'.repeat(Password.MaxLength + 5),
          '1'.repeat(Password.MaxLength + 5),
          '_'.repeat(Password.MaxLength + 5),
          'a'.repeat(Password.MaxLength + 10),
          '1'.repeat(Password.MaxLength + 10),
          '_'.repeat(Password.MaxLength + 10),
        ])(
          'should throw an error when trying to create a Password from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => Password.create(larger)).toThrowError(
              PasswordIsTooLongError,
            );
          },
        );

        test.each([
          'aaa.bbb',
          '        ',
          'aaa bbb',
          'aaaaaaa bbbbbbb',
          'aaaaaañ',
          'ññññññ',
          'aaabbbÄ',
          'aaabbb,',
          'aaabbb§',
        ])(
          'should throw an error when trying to create a Password from %p (Malformed)',
          (malformed) => {
            // Arrange

            // Act

            // Assert
            expect(() => Password.create(malformed)).toThrowError(
              MalformedPasswordError,
            );
          },
        );

        test.each(validValues)('should create a Password from %p', (valid) => {
          // Arrange

          // Act
          const password = Password.create(valid);

          // Assert
          expect(password.getPassword).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two Password created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const password_1 = Password.create(text1);
            const password_2 = Password.create(text2);
            const result = password_1.equals(password_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two Password created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const password1 = Password.create(text);
            const password2 = Password.create(text);
            const result = password1.equals(password2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
