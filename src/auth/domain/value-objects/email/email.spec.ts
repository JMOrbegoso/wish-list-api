import { Email } from '..';

describe('auth', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('email', () => {
        it('should throw an error when trying to create a Email from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Email.create(undefined)).toThrowError('Invalid email');
        });

        it('should throw an error when trying to create a Email from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Email.create(null)).toThrowError('Invalid email');
        });

        it('should throw an error when trying to create a Email from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Email.create('')).toThrowError('Invalid email');
        });

        it('should throw an error when trying to create a Email from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidEmail = 'aaa.bbb';

          // Assert
          expect(() => Email.create(invalidEmail)).toThrowError(
            'Invalid email',
          );
        });

        it('should throw an error when trying to create a Email from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidEmail = 'aaa bbb';

          // Assert
          expect(() => Email.create(invalidEmail)).toThrowError(
            'Invalid email',
          );
        });

        it('should throw an error when trying to create a Email from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidEmail = 'aaaaaaa bbbbbbb';

          // Assert
          expect(() => Email.create(invalidEmail)).toThrowError(
            'Invalid email',
          );
        });

        it('should create a Email instance and should store the value', () => {
          // Arrange

          // Act
          const text = 'John@DOE.com';
          const email = Email.create(text);

          // Assert
          expect(email.getEmail).toBe(text);
        });

        it('create two Email instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const text_1 = 'John@Doe.com';
          const text_2 = 'Johnny@Doe.com';
          const email_1 = Email.create(text_1);
          const email_2 = Email.create(text_2);
          const result = email_1.equals(email_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two Email instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const text = 'john_100@doe.com';
          const email_1 = Email.create(text);
          const email_2 = Email.create(text);
          const result = email_1.equals(email_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
