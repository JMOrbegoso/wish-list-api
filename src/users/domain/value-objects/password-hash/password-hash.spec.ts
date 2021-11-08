import { PasswordHash, InvalidPasswordHashError } from '..';

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('password-hash', () => {
        it('should throw an error when trying to create a PasswordHash from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => PasswordHash.create(undefined)).toThrowError(
            InvalidPasswordHashError,
          );
        });

        it('should throw an error when trying to create a PasswordHash from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => PasswordHash.create(null)).toThrowError(
            InvalidPasswordHashError,
          );
        });

        it('should throw an error when trying to create a PasswordHash from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => PasswordHash.create('')).toThrowError(
            InvalidPasswordHashError,
          );
        });

        it('should create a PasswordHash instance and should store the value', () => {
          // Arrange

          // Act
          const text =
            '$2a$10$Ro0CUfOqk6cXEKf3dyaM7OhSCvnwM9s4wIX9JeLapehKK5YdLxKcm';
          const passwordHash = PasswordHash.create(text);

          // Assert
          expect(passwordHash.getPasswordHash).toBe(text);
        });

        it('create two PasswordHash instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const text_1 =
            '$2a$10$Ro0CUfOqk6cXEKf3dyaM7OhSCvnwM9s4wIX9JeLapehKK5YdLxKcm';
          const text_2 =
            '$2a$10$Ro0CUfOqk6cXEKf3dyaM7OhSCvnwM9s4wIX9JeLapehKK5YdLxKcn';
          const passwordHash_1 = PasswordHash.create(text_1);
          const passwordHash_2 = PasswordHash.create(text_2);
          const result = passwordHash_1.equals(passwordHash_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two PasswordHash instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const text =
            '$2a$10$Ro0CUfOqk6cXEKf3dyaM7OhSCvnwM9s4wIX9JeLapehKK5YdLxKcm';
          const passwordHash_1 = PasswordHash.create(text);
          const passwordHash_2 = PasswordHash.create(text);
          const result = passwordHash_1.equals(passwordHash_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
