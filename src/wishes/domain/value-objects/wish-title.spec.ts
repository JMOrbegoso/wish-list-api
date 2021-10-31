import { WishTitle } from '.';

describe('wishes', () => {
  describe('value-objects', () => {
    describe('wish-title', () => {
      it('should throw error on validation', () => {
        // Arrange

        // Act

        // Assert
        expect(() => WishTitle.create(undefined)).toThrowError(
          'Invalid wish title',
        );
      });

      it('should throw error on validation', () => {
        // Arrange

        // Act

        // Assert
        expect(() => WishTitle.create(null)).toThrowError('Invalid wish title');
      });

      it('should throw error on validation', () => {
        // Arrange

        // Act

        // Assert
        expect(() => WishTitle.create('')).toThrowError('Invalid wish title');
      });

      it('created value object should store the value', () => {
        // Arrange

        // Act
        const name = 'John';
        const nameValueObject = WishTitle.create(name);

        // Assert
        expect(nameValueObject.value).toBe(name);
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const name_1 = 'John';
        const name_2 = 'Johnny';
        const nameValueObject_1 = WishTitle.create(name_1);
        const nameValueObject_2 = WishTitle.create(name_2);
        const result = nameValueObject_1.equals(nameValueObject_2);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const name = 'John';
        const nameValueObject = WishTitle.create(name);
        const result = nameValueObject.equals(undefined);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be different', () => {
        // Arrange

        // Act
        const name = 'John';
        const nameValueObject = WishTitle.create(name);
        const result = nameValueObject.equals(null);

        // Assert
        expect(result).toBe(false);
      });

      it('both value objects should be equal', () => {
        // Arrange

        // Act
        const name = 'John';
        const nameValueObject_1 = WishTitle.create(name);
        const nameValueObject_2 = WishTitle.create(name);
        const result = nameValueObject_1.equals(nameValueObject_2);

        // Assert
        expect(result).toBe(true);
      });
    });
  });
});
