import {
  WishDescription,
  InvalidWishDescriptionError,
  WishDescriptionIsTooLongError,
} from '..';

const validValues = [
  'a'.repeat(WishDescription.MaxLength),
  '1'.repeat(WishDescription.MaxLength),
  '_'.repeat(WishDescription.MaxLength),
  'A nice wish.',
  'Nice wish.',
];

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('wish-description', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create a WishDescription from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => WishDescription.create(invalid)).toThrowError(
              InvalidWishDescriptionError,
            );
          },
        );

        test.each([
          'a'.repeat(WishDescription.MaxLength + 1),
          '1'.repeat(WishDescription.MaxLength + 1),
          '_'.repeat(WishDescription.MaxLength + 1),
          'a'.repeat(WishDescription.MaxLength + 5),
          '1'.repeat(WishDescription.MaxLength + 5),
          '_'.repeat(WishDescription.MaxLength + 5),
          'a'.repeat(WishDescription.MaxLength + 10),
          '1'.repeat(WishDescription.MaxLength + 10),
          '_'.repeat(WishDescription.MaxLength + 10),
        ])(
          'should throw an error when trying to create a WishDescription from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => WishDescription.create(larger)).toThrowError(
              WishDescriptionIsTooLongError,
            );
          },
        );

        test.each(validValues)(
          'should create a WishDescription from %p',
          (valid) => {
            // Arrange

            // Act
            const wishDescription = WishDescription.create(valid);

            // Assert
            expect(wishDescription.getDescription).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two WishDescription created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const wishDescription_1 = WishDescription.create(text1);
            const wishDescription_2 = WishDescription.create(text2);
            const result = wishDescription_1.equals(wishDescription_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two WishDescription created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const wishDescription1 = WishDescription.create(text);
            const wishDescription2 = WishDescription.create(text);
            const result = wishDescription1.equals(wishDescription2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
