import { RefreshTokenId } from '..';
import { InvalidEntityIdError } from '../../../../shared/domain/entities';

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('refresh-token-id', () => {
        it('create a RefreshTokenId with id null should throw error', () => {
          // Arrange

          // Act

          // Assert
          expect(() => RefreshTokenId.create(null)).toThrowError(
            InvalidEntityIdError,
          );
        });

        it('should create a RefreshTokenId with id = "id-1"', () => {
          // Arrange

          // Act
          const refreshTokenId = RefreshTokenId.create('id-1');

          // Assert
          expect(refreshTokenId.value).toBe('id-1');
        });

        it('comparing an entity id with null should return false', () => {
          // Arrange
          const refreshTokenId = RefreshTokenId.create('id-2');

          // Act
          const result = refreshTokenId.equals(null);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two different entity ids should return false', () => {
          // Arrange
          const refreshTokenId_1 = RefreshTokenId.create('id-1');
          const refreshTokenId_2 = RefreshTokenId.create('id-2');

          // Act
          const result = refreshTokenId_1.equals(refreshTokenId_2);

          // Assert
          expect(result).toBe(false);
        });

        it('comparing two equals entity ids should return true', () => {
          // Arrange
          const refreshTokenId_1 = RefreshTokenId.create('id-1');
          const refreshTokenId_2 = RefreshTokenId.create('id-1');

          // Act
          const result = refreshTokenId_1.equals(refreshTokenId_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
