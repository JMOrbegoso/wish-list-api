import { UserId } from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('user-id', () => {
        it('create a UserId with id null should throw error', () => {
          // Arrange

          // Act

          // Assert
          expect(() => UserId.create(null)).toThrowError(InvalidEntityIdError);
        });

        it('should create a UserId with id = "id-1"', () => {
          // Arrange

          // Act
          const userId = UserId.create('id-1');

          // Assert
          expect(userId.value).toBe('id-1');
        });

        it('comparing an entity id with null should return false', () => {
          // Arrange
          const userId = UserId.create('id-2');

          // Act
          const result = userId.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two different entity ids should return false', () => {
          // Arrange
          const userId_1 = UserId.create('id-1');
          const userId_2 = UserId.create('id-2');

          // Act
          const result = userId_1.equals(userId_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two equals entity ids should return true', () => {
          // Arrange
          const userId_1 = UserId.create('id-1');
          const userId_2 = UserId.create('id-1');

          // Act
          const result = userId_1.equals(userId_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
