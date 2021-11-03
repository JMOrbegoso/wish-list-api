import { WishTitle } from '..';

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('wish-title', () => {
        it('should throw an error when trying to create a WishTitle from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishTitle.create(undefined)).toThrowError(
            'Invalid wish title',
          );
        });

        it('should throw an error when trying to create a WishTitle from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishTitle.create(null)).toThrowError(
            'Invalid wish title',
          );
        });

        it('should throw an error when trying to create a WishTitle from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => WishTitle.create('')).toThrowError('Invalid wish title');
        });

        it('should throw an error when trying to create a WishTitle from an string with more characters than the limit', () => {
          // Arrange

          // Act
          const invalidTitle = 'a'.repeat(WishTitle.MaxLength + 1);

          // Assert
          expect(() => WishTitle.create(invalidTitle)).toThrowError(
            'Invalid wish title',
          );
        });

        it('should create a WishTitle instance from the largest valid string and should store the value', () => {
          // Arrange

          // Act
          const largestValidTitle = 'a'.repeat(WishTitle.MaxLength);
          const wishTitle = WishTitle.create(largestValidTitle);

          // Assert
          expect(wishTitle.getTitle).toBe(largestValidTitle);
        });

        it('should create a WishTitle instance and should store the value', () => {
          // Arrange

          // Act
          const title = 'New Laptop';
          const wishTitle = WishTitle.create(title);

          // Assert
          expect(wishTitle.getTitle).toBe(title);
        });

        it('create two WishTitle instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const title_1 = 'New Laptop';
          const title_2 = 'New Tablet';
          const wishTitle_1 = WishTitle.create(title_1);
          const wishTitle_2 = WishTitle.create(title_2);
          const result = wishTitle_1.equals(wishTitle_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two WishTitle instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const title = 'New Laptop';
          const wishTitle_1 = WishTitle.create(title);
          const wishTitle_2 = WishTitle.create(title);
          const result = wishTitle_1.equals(wishTitle_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
