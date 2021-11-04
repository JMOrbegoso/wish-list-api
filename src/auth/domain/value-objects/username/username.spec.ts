import { UserName } from '..';

describe('auth', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('username', () => {
        it('should throw an error when trying to create a UserName from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => UserName.create(undefined)).toThrowError(
            'Invalid username',
          );
        });

        it('should throw an error when trying to create a UserName from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => UserName.create(null)).toThrowError('Invalid username');
        });

        it('should throw an error when trying to create a UserName from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => UserName.create('')).toThrowError('Invalid username');
        });

        it('should throw an error when trying to create a UserName from an string with less characters than the limit', () => {
          // Arrange

          // Act
          const invalidUserName = 'a'.repeat(UserName.MinLength - 1);

          // Assert
          expect(() => UserName.create(invalidUserName)).toThrowError(
            'Invalid username',
          );
        });

        it('should create a UserName instance from the shortest valid string and should store the value', () => {
          // Arrange

          // Act
          const shortestValidUserName = 'a'.repeat(UserName.MinLength);
          const username = UserName.create(shortestValidUserName);

          // Assert
          expect(username.getUserName).toBe(shortestValidUserName);
        });

        it('should throw an error when trying to create a UserName from an string with more characters than the limit', () => {
          // Arrange

          // Act
          const invalidUserName = 'a'.repeat(UserName.MaxLength + 1);

          // Assert
          expect(() => UserName.create(invalidUserName)).toThrowError(
            'Invalid username',
          );
        });

        it('should create a UserName instance from the largest valid string and should store the value', () => {
          // Arrange

          // Act
          const largestValidUserName = 'a'.repeat(UserName.MaxLength);
          const username = UserName.create(largestValidUserName);

          // Assert
          expect(username.getUserName).toBe(largestValidUserName);
        });

        it('should throw an error when trying to create a UserName from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidUserName = 'aaa.bbb';

          // Assert
          expect(() => UserName.create(invalidUserName)).toThrowError(
            'Invalid username',
          );
        });

        it('should throw an error when trying to create a UserName from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidUserName = 'aaa bbb';

          // Assert
          expect(() => UserName.create(invalidUserName)).toThrowError(
            'Invalid username',
          );
        });

        it('should throw an error when trying to create a UserName from a string with characters that do not match the regex', () => {
          // Arrange

          // Act
          const invalidUserName = 'aaaaaaa bbbbbbb';

          // Assert
          expect(() => UserName.create(invalidUserName)).toThrowError(
            'Invalid username',
          );
        });

        it('should create a UserName instance and should store the value', () => {
          // Arrange

          // Act
          const text = 'John-Doe_100';
          const username = UserName.create(text);

          // Assert
          expect(username.getUserName).toBe(text);
        });

        it('create two UserName instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const text_1 = 'John_Doe';
          const text_2 = 'Johnny_Doe';
          const username_1 = UserName.create(text_1);
          const username_2 = UserName.create(text_2);
          const result = username_1.equals(username_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two UserName instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const text = 'john_doe_0';
          const username_1 = UserName.create(text);
          const username_2 = UserName.create(text);
          const result = username_1.equals(username_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
