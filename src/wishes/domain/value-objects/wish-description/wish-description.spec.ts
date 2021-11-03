import { WishDescription } from '..';

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('wish-description', () => {
        it('should throw an error when trying to create a WishDescription from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishDescription.create(undefined)).toThrowError(
            'Invalid wish description',
          );
        });

        it('should throw an error when trying to create a WishDescription from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishDescription.create(null)).toThrowError(
            'Invalid wish description',
          );
        });

        it('should throw an error when trying to create a WishDescription from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishDescription.create('')).toThrowError(
            'Invalid wish description',
          );
        });

        it('should throw an error when trying to create a WishDescription from an string with more characters than the limit', () => {
          // Arrange

          // Act
          const invalidDescription = 'a'.repeat(WishDescription.MaxLength + 1);

          // Assert
          expect(() => WishDescription.create(invalidDescription)).toThrowError(
            'Invalid wish description',
          );
        });

        it('should create a WishDescription instance from the largest valid string and should store the value', () => {
          // Arrange

          // Act
          const largestValidDescription = 'a'.repeat(WishDescription.MaxLength);
          const wishDescription = WishDescription.create(
            largestValidDescription,
          );

          // Assert
          expect(wishDescription.getDescription).toBe(largestValidDescription);
        });

        it('should create a WishDescription instance and should store the value', () => {
          // Arrange

          // Act
          const description = 'Nice wish.';
          const wishDescription = WishDescription.create(description);

          // Assert
          expect(wishDescription.getDescription).toBe(description);
        });

        it('create two WishDescription instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const description_1 = 'Nice wish.';
          const description_2 = 'No so nice wish.';
          const wishDescription_1 = WishDescription.create(description_1);
          const wishDescription_2 = WishDescription.create(description_2);
          const result = wishDescription_1.equals(wishDescription_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two WishDescription instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const description = 'Nice wish.';
          const wishDescription_1 = WishDescription.create(description);
          const wishDescription_2 = WishDescription.create(description);
          const result = wishDescription_1.equals(wishDescription_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
