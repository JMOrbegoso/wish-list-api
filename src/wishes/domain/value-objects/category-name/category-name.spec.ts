import { CategoryName } from '..';

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('category-name', () => {
        it('should throw an error when trying to create a CategoryName from undefined', () => {
          // Arrange

          // Act

          // Assert
          expect(() => CategoryName.create(undefined)).toThrowError(
            'Invalid category name',
          );
        });

        it('should throw an error when trying to create a CategoryName from null', () => {
          // Arrange

          // Act

          // Assert
          expect(() => CategoryName.create(null)).toThrowError(
            'Invalid category name',
          );
        });

        it('should throw an error when trying to create a CategoryName from an empty string', () => {
          // Arrange

          // Act

          // Assert
          expect(() => CategoryName.create('')).toThrowError(
            'Invalid category name',
          );
        });

        it('should create a CategoryName instance and should store the value', () => {
          // Arrange

          // Act
          const name = 'Tech';
          const categoryName = CategoryName.create(name);

          // Assert
          expect(categoryName.getName).toBe(name);
        });

        it('create two CategoryName instances with different value and compare them using "equals" should return false', () => {
          // Arrange

          // Act
          const name_1 = 'Tech';
          const name_2 = 'Future';
          const categoryName_1 = CategoryName.create(name_1);
          const categoryName_2 = CategoryName.create(name_2);
          const result = categoryName_1.equals(categoryName_2);

          // Assert
          expect(result).toBe(false);
        });

        it('create two CategoryName instances with the same value and compare them using "equals" should return true', () => {
          // Arrange

          // Act
          const name = 'Tech';
          const categoryName_1 = CategoryName.create(name);
          const categoryName_2 = CategoryName.create(name);
          const result = categoryName_1.equals(categoryName_2);

          // Assert
          expect(result).toBe(true);
        });
      });
    });
  });
});
