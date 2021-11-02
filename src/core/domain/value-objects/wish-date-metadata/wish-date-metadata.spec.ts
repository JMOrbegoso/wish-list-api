import { WishDateMetadata } from '..';

describe('core', () => {
  describe('value-objects', () => {
    describe('wish-date-metadata', () => {
      it('should create valid wish date metadata', () => {
        // Arrange

        // Act
        const millisecondsDate = Date.now();
        const wishDateMetadata = WishDateMetadata.create(undefined);

        // Assert
        expect(wishDateMetadata.value).toBeCloseTo(millisecondsDate);
      });

      it('should create valid wish date metadata', () => {
        // Arrange

        // Act
        const millisecondsDate = Date.now();
        const wishDateMetadata = WishDateMetadata.create(null);

        // Assert
        expect(wishDateMetadata.value).toBeCloseTo(millisecondsDate);
      });

      it('should create valid wish date metadata', () => {
        // Arrange

        // Act
        const date = new Date('1999-10-10');
        const wishDateMetadata = WishDateMetadata.create(date.getTime());

        // Assert
        expect(wishDateMetadata.value).toBeCloseTo(date.getTime());
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const date_1 = new Date('1999-10-10');
        const date_2 = new Date('1990-5-5');
        const wishDateMetadata_1 = WishDateMetadata.create(date_1.getTime());
        const wishDateMetadata_2 = WishDateMetadata.create(date_2.getTime());

        const result = wishDateMetadata_1.equals(wishDateMetadata_2);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const date = new Date('1990-5-5');
        const wishDateMetadata = WishDateMetadata.create(date.getTime());
        const result = wishDateMetadata.equals(undefined);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const date = new Date('1990-5-5');
        const wishDateMetadata = WishDateMetadata.create(date.getTime());
        const result = wishDateMetadata.equals(null);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be equal', () => {
        // Arrange

        // Act
        const date = new Date('1990-5-5');
        const wishDateMetadata_1 = WishDateMetadata.create(date.getTime());
        const wishDateMetadata_2 = WishDateMetadata.create(date.getTime());
        const result = wishDateMetadata_1.equals(wishDateMetadata_2);

        // Assert
        expect(result).toBe(true);
      });
    });
  });
});
