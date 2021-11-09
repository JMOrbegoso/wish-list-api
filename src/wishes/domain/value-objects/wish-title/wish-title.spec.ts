import { WishTitle, InvalidWishTitleError, WishTitleIsTooLongError } from '..';

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('wish-title', () => {
        const validValues = [
          'a'.repeat(WishTitle.MaxLength),
          '1'.repeat(WishTitle.MaxLength),
          '_'.repeat(WishTitle.MaxLength),
          'PC',
          'Laptop',
          'Tablet',
        ];

        test.each([undefined, null, ''])(
          'should throw an error when trying to create a WishTitle from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => WishTitle.create(invalid)).toThrowError(
              InvalidWishTitleError,
            );
          },
        );

        test.each([
          'a'.repeat(WishTitle.MaxLength + 1),
          '1'.repeat(WishTitle.MaxLength + 1),
          '_'.repeat(WishTitle.MaxLength + 1),
          'a'.repeat(WishTitle.MaxLength + 5),
          '1'.repeat(WishTitle.MaxLength + 5),
          '_'.repeat(WishTitle.MaxLength + 5),
          'a'.repeat(WishTitle.MaxLength + 10),
          '1'.repeat(WishTitle.MaxLength + 10),
          '_'.repeat(WishTitle.MaxLength + 10),
        ])(
          'should throw an error when trying to create a WishTitle from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => WishTitle.create(larger)).toThrowError(
              WishTitleIsTooLongError,
            );
          },
        );

        test.each(validValues)(
          'should to create a WishTitle from %p',
          (valid) => {
            // Arrange

            // Act
            const wishTitle = WishTitle.create(valid);

            // Assert
            expect(wishTitle.getTitle).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two WishTitle created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const wishTitle_1 = WishTitle.create(text1);
            const wishTitle_2 = WishTitle.create(text2);
            const result = wishTitle_1.equals(wishTitle_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two WishTitle created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const wishTitle1 = WishTitle.create(text);
            const wishTitle2 = WishTitle.create(text);
            const result = wishTitle1.equals(wishTitle2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
