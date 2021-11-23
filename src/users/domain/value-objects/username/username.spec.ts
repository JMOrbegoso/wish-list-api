import {
  Username,
  InvalidUsernameError,
  UsernameIsTooShortError,
  UsernameIsTooLongError,
  MalformedUsernameError,
} from '..';

const validValues = [
  'a'.repeat(Username.MinLength),
  'a'.repeat(Username.MaxLength),
  '1'.repeat(Username.MinLength),
  '1'.repeat(Username.MaxLength),
  '_'.repeat(Username.MinLength),
  '_'.repeat(Username.MaxLength),
  'JohnDoe',
  'John_Doe',
  'Johnny_Doe',
  'john_doe_0',
  'JOHNDOE',
  'John-Doe',
  'John-Doe_100',
  '1John1',
  '_John-1-Doe_',
  '_John-Doe_1_',
  '999-a-999',
  '999999',
];

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('username', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create an Username from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => Username.create(invalid)).toThrowError(
              InvalidUsernameError,
            );
          },
        );

        test.each([
          'a'.repeat(Username.MinLength - 1),
          '1'.repeat(Username.MinLength - 1),
          'a'.repeat(Username.MinLength - 3),
          '1'.repeat(Username.MinLength - 3),
          'AA',
          'AAA',
          'ABCDE',
          '11111',
        ])(
          'should throw an error when trying to create an Username from %p (Less characters than the limit)',
          (shorter) => {
            // Arrange

            // Act

            // Assert
            expect(() => Username.create(shorter)).toThrowError(
              UsernameIsTooShortError,
            );
          },
        );

        test.each([
          'a'.repeat(Username.MaxLength + 1),
          '1'.repeat(Username.MaxLength + 1),
          '_'.repeat(Username.MaxLength + 1),
          'a'.repeat(Username.MaxLength + 5),
          '1'.repeat(Username.MaxLength + 5),
          '_'.repeat(Username.MaxLength + 5),
          'a'.repeat(Username.MaxLength + 10),
          '1'.repeat(Username.MaxLength + 10),
          '_'.repeat(Username.MaxLength + 10),
        ])(
          'should throw an error when trying to create an Username from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => Username.create(larger)).toThrowError(
              UsernameIsTooLongError,
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
          'should throw an error when trying to create an Username from %p (Malformed)',
          (malformed) => {
            // Arrange

            // Act

            // Assert
            expect(() => Username.create(malformed)).toThrowError(
              MalformedUsernameError,
            );
          },
        );

        test.each(validValues)('should create an Username from %p', (valid) => {
          // Arrange

          // Act
          const username = Username.create(valid);

          // Assert
          expect(username.getUsername).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two Username created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const username1 = Username.create(text1);
            const username2 = Username.create(text2);
            const result = username1.equals(username2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two Username created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const username1 = Username.create(text);
            const username2 = Username.create(text);
            const result = username1.equals(username2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
