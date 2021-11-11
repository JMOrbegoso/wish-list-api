import { Email, InvalidEmailError, MalformedEmailError } from '..';

const validValues = [
  'John@DOE.com',
  'John@Doe.com',
  'John-@Doe.com',
  'John-5@Doe.com',
  'John@Do-e.com',
  'Johnny@Doe.com',
  'john_100@doe.com',
];

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('email', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create an Email from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => Email.create(invalid)).toThrowError(InvalidEmailError);
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
          'should throw an error when trying to create an Email from %p (Malformed)',
          (malformed) => {
            // Arrange

            // Act

            // Assert
            expect(() => Email.create(malformed)).toThrowError(
              MalformedEmailError,
            );
          },
        );

        test.each(validValues)('should create an Email from %p', (valid) => {
          // Arrange

          // Act
          const email = Email.create(valid);

          // Assert
          expect(email.getEmail).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two Email created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const email_1 = Email.create(text1);
            const email_2 = Email.create(text2);
            const result = email_1.equals(email_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two Email created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const email1 = Email.create(text);
            const email2 = Email.create(text);
            const result = email1.equals(email2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
