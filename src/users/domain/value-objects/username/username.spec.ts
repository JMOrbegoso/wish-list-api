import {
  UserName,
  InvalidUserNameError,
  UserNameIsTooShortError,
  UserNameIsTooLongError,
  MalformedUserNameError,
} from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('username', () => {
        const validValues = [
          'a'.repeat(UserName.MinLength),
          'a'.repeat(UserName.MaxLength),
          '1'.repeat(UserName.MinLength),
          '1'.repeat(UserName.MaxLength),
          '_'.repeat(UserName.MinLength),
          '_'.repeat(UserName.MaxLength),
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

        test.each([undefined, null, ''])(
          'should throw an error when trying to create a UserName from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => UserName.create(invalid)).toThrowError(
              InvalidUserNameError,
            );
          },
        );

        test.each([
          'a'.repeat(UserName.MinLength - 1),
          '1'.repeat(UserName.MinLength - 1),
          'a'.repeat(UserName.MinLength - 3),
          '1'.repeat(UserName.MinLength - 3),
          'AA',
          'AAA',
          'ABCDE',
          '11111',
        ])(
          'should throw an error when trying to create a UserName from %p (Less characters than the limit)',
          (shorter) => {
            // Arrange

            // Act

            // Assert
            expect(() => UserName.create(shorter)).toThrowError(
              UserNameIsTooShortError,
            );
          },
        );

        test.each([
          'a'.repeat(UserName.MaxLength + 1),
          '1'.repeat(UserName.MaxLength + 1),
          '_'.repeat(UserName.MaxLength + 1),
          'a'.repeat(UserName.MaxLength + 5),
          '1'.repeat(UserName.MaxLength + 5),
          '_'.repeat(UserName.MaxLength + 5),
          'a'.repeat(UserName.MaxLength + 10),
          '1'.repeat(UserName.MaxLength + 10),
          '_'.repeat(UserName.MaxLength + 10),
        ])(
          'should throw an error when trying to create a UserName from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => UserName.create(larger)).toThrowError(
              UserNameIsTooLongError,
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
          'should throw an error when trying to create a UserName from %p (Malformed)',
          (malformed) => {
            // Arrange

            // Act

            // Assert
            expect(() => UserName.create(malformed)).toThrowError(
              MalformedUserNameError,
            );
          },
        );

        test.each(validValues)(
          'should to create a UserName from %p',
          (valid) => {
            // Arrange

            // Act
            const userName = UserName.create(valid);

            // Assert
            expect(userName.getUserName).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two UserName created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const userName_1 = UserName.create(text1);
            const userName_2 = UserName.create(text2);
            const result = userName_1.equals(userName_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two UserName created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const userName1 = UserName.create(text);
            const userName2 = UserName.create(text);
            const result = userName1.equals(userName2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
