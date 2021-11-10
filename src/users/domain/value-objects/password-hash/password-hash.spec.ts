import { PasswordHash, InvalidPasswordHashError } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('password-hash', () => {
        const validValues = [
          '$2a$10$Ro0CUfOqk6cXEKf3dyaM7OhSCvnwM9s4wIX9JeLapehKK5YdLxKcm',
          '$2a$10$Ro0HUfOqk0cDIOf9dyaM7OhSCvnwM9s4wUX1JeLapehKK5YdLxKcm',
          '$2a$10$Ro0CIfOqk3cXEKf5dyaM7OhSCvnwM9s4wIX9JeLapehKK5YdLxKcn',
          '$2a$10$Ro0XYfOqk1cXEKf4dyaY7OhSCvnwM9s4wIX9JeDapehKK5YdLxKcm',
        ];

        test.each([undefined, null, ''])(
          'should throw an error when trying to create a PasswordHash from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => PasswordHash.create(invalid)).toThrowError(
              InvalidPasswordHashError,
            );
          },
        );

        test.each(validValues)(
          'should create a PasswordHash from %p',
          (valid) => {
            // Arrange

            // Act
            const passwordHash = PasswordHash.create(valid);

            // Assert
            expect(passwordHash.getPasswordHash).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two PasswordHash created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const passwordHash_1 = PasswordHash.create(text1);
            const passwordHash_2 = PasswordHash.create(text2);
            const result = passwordHash_1.equals(passwordHash_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two PasswordHash created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const passwordHash1 = PasswordHash.create(text);
            const passwordHash2 = PasswordHash.create(text);
            const result = passwordHash1.equals(passwordHash2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
