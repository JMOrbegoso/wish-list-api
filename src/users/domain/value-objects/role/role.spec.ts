import { InvalidRoleError, Role } from '..';

const validValues = [
  'super-admin',
  'admin',
  'moderator',
  'basic',
  'client',
  'public',
];

describe('users', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('role', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create a Role from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => Role.create(invalid)).toThrowError(InvalidRoleError);
          },
        );

        it('should create a Role with admin role', () => {
          // Arrange

          // Act
          const role = Role.admin();

          // Assert
          expect(role.getRole).toBe('Admin');
        });

        it('should create a Role with moderator role', () => {
          // Arrange

          // Act
          const role = Role.moderator();

          // Assert
          expect(role.getRole).toBe('Moderator');
        });

        it('should create a Role with basic role', () => {
          // Arrange

          // Act
          const role = Role.basic();

          // Assert
          expect(role.getRole).toBe('Basic');
        });

        test.each(validValues)('should create a Role from %p', (valid) => {
          // Arrange

          // Act
          const role = Role.create(valid);

          // Assert
          expect(role.getRole).toBe(valid);
        });

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two Role created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const Role_1 = Role.create(text1);
            const Role_2 = Role.create(text2);
            const result = Role_1.equals(Role_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two Role created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const Role1 = Role.create(text);
            const Role2 = Role.create(text);
            const result = Role1.equals(Role2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
