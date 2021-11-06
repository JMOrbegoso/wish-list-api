import { Password } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('password', () => {
        it('should throw an error when trying to create a Password from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Password.create(undefined)).toThrowError(
            'Invalid password',
          );
        });

        it('should throw an error when trying to create a Password from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Password.create(null)).toThrowError('Invalid password');
        });

        it('should throw an error when trying to create a Password from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => Password.create('')).toThrowError('Invalid password');
        });

        it('should throw an error when trying to create a Password from an string with less characters than the limit', () => {
          // Arrange

          // Act
          const invalidPassword = 'a'.repeat(Password.MinLength - 1);

          // Assert
          expect(() => Password.create(invalidPassword)).toThrowError(
            'Invalid password',
          );
        });

        it('should create a Password instance from the shortest valid string and should store the value', () => {
          // Arrange
          const passwordPrefix = '1A%';
          const shortestValidPassword =
            passwordPrefix +
            'a'.repeat(Password.MinLength - passwordPrefix.length);

          // Act
          const password = Password.create(shortestValidPassword);

          // Assert
          expect(password.getPassword).toBe(shortestValidPassword);
        });

        it('should throw an error when trying to create a Password from an string with more characters than the limit', () => {
          // Arrange

          // Act
          const invalidPassword = 'a'.repeat(Password.MaxLength + 1);

          // Assert
          expect(() => Password.create(invalidPassword)).toThrowError(
            'Invalid password',
          );
        });

        it('should create a Password instance from the largest valid string and should store the value', () => {
          // Arrange
          const passwordPrefix = '1A%';
          const largestValidPassword =
            passwordPrefix +
            'a'.repeat(Password.MaxLength - passwordPrefix.length);

          // Act
          const password = Password.create(largestValidPassword);

          // Assert
          expect(password.getPassword).toBe(largestValidPassword);
        });

        it('should throw an error when trying to create a Password from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidPassword = 'aaañbbb';

          // Assert
          expect(() => Password.create(invalidPassword)).toThrowError(
            'Invalid password',
          );
        });

        it('should throw an error when trying to create a Password from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidPassword = 'aaa bbb';

          // Assert
          expect(() => Password.create(invalidPassword)).toThrowError(
            'Invalid password',
          );
        });

        it('should throw an error when trying to create a Password from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidPassword = 'aaaaaaa bbbbbbb';

          // Assert
          expect(() => Password.create(invalidPassword)).toThrowError(
            'Invalid password',
          );
        });

        it('should create a Password instance and should store the value', () => {
          // Arrange

          // Act
          const text = 'aAbBcC%1';
          const password = Password.create(text);

          // Assert
          expect(password.getPassword).toBe(text);
        });

        it('create two Password instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const text_1 = 'aA$b%B(c)C0';
          const text_2 = 'aA$b%B(c)C1';
          const password_1 = Password.create(text_1);
          const password_2 = Password.create(text_2);
          const result = password_1.equals(password_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two Password instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const text = 'aA$b%B(1)[C]';
          const password_1 = Password.create(text);
          const password_2 = Password.create(text);
          const result = password_1.equals(password_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
