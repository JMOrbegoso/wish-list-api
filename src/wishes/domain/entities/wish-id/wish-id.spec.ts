import { WishId } from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wish-id', () => {
        it('create a WishId with id null should throw error', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishId.create(null)).toThrowError(InvalidEntityIdError);
        });

        it('should create a WishId with id = "id-1"', () => {
          // Arrange

          // Act
          const wishId = WishId.create('id-1');

          // Assert
          expect(wishId.value).toBe('id-1');
        });

        it('comparing an entity id with null should return false', () => {
          // Arrange
          const wishId = WishId.create('id-2');

          // Act
          const result = wishId.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two different entity ids should return false', () => {
          // Arrange
          const wishId_1 = WishId.create('id-1');
          const wishId_2 = WishId.create('id-2');

          // Act
          const result = wishId_1.equals(wishId_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two equals entity ids should return true', () => {
          // Arrange
          const wishId_1 = WishId.create('id-1');
          const wishId_2 = WishId.create('id-1');

          // Act
          const result = wishId_1.equals(wishId_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
