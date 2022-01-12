import { WisherId } from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wisher-id', () => {
        it('create a WisherId with id null should throw error', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WisherId.create(null)).toThrowError(
            InvalidEntityIdError,
          );
        });

        it('should create a WisherId with id = "id-1"', () => {
          // Arrange

          // Act
          const wisherId = WisherId.create('id-1');

          // Assert
          expect(wisherId.value).toBe('id-1');
        });

        it('comparing an entity id with null should return false', () => {
          // Arrange
          const wisherId = WisherId.create('id-2');

          // Act
          const result = wisherId.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two different entity ids should return false', () => {
          // Arrange
          const wisherId_1 = WisherId.create('id-1');
          const wisherId_2 = WisherId.create('id-2');

          // Act
          const result = wisherId_1.equals(wisherId_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two equals entity ids should return true', () => {
          // Arrange
          const wisherId_1 = WisherId.create('id-1');
          const wisherId_2 = WisherId.create('id-1');

          // Act
          const result = wisherId_1.equals(wisherId_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
