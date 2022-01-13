import { WishStageId } from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wish-stage-id', () => {
        it('create a WishStageId with id null should throw error', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishStageId.create(null)).toThrowError(
            InvalidEntityIdError,
          );
        });

        it('should create a WishStageId with id = "id-1"', () => {
          // Arrange

          // Act
          const wishStageId = WishStageId.create('id-1');

          // Assert
          expect(wishStageId.value).toBe('id-1');
        });

        it('comparing an entity id with null should return false', () => {
          // Arrange
          const wishStageId = WishStageId.create('id-2');

          // Act
          const result = wishStageId.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two different entity ids should return false', () => {
          // Arrange
          const wishStageId_1 = WishStageId.create('id-1');
          const wishStageId_2 = WishStageId.create('id-2');

          // Act
          const result = wishStageId_1.equals(wishStageId_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two equals entity ids should return true', () => {
          // Arrange
          const wishStageId_1 = WishStageId.create('id-1');
          const wishStageId_2 = WishStageId.create('id-1');

          // Act
          const result = wishStageId_1.equals(wishStageId_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
