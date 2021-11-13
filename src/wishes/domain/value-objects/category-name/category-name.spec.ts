import {
  CategoryName,
  InvalidCategoryNameError,
  CategoryNameIsTooLongError,
} from '..';

const validValues = [
  'a'.repeat(CategoryName.MaxLength),
  '1'.repeat(CategoryName.MaxLength),
  '_'.repeat(CategoryName.MaxLength),
  'Tech',
  'University',
  'Travels',
  'School',
  'Home',
  'Tv',
];

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('category-name', () => {
        test.each([undefined, null, ''])(
          'should throw an error when trying to create a CategoryName from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => CategoryName.create(invalid)).toThrowError(
              InvalidCategoryNameError,
            );
          },
        );

        test.each([
          'a'.repeat(CategoryName.MaxLength + 1),
          '1'.repeat(CategoryName.MaxLength + 1),
          '_'.repeat(CategoryName.MaxLength + 1),
          'a'.repeat(CategoryName.MaxLength + 5),
          '1'.repeat(CategoryName.MaxLength + 5),
          '_'.repeat(CategoryName.MaxLength + 5),
          'a'.repeat(CategoryName.MaxLength + 10),
          '1'.repeat(CategoryName.MaxLength + 10),
          '_'.repeat(CategoryName.MaxLength + 10),
        ])(
          'should throw an error when trying to create a CategoryName from %p (More characters than the limit)',
          (larger) => {
            // Arrange

            // Act

            // Assert
            expect(() => CategoryName.create(larger)).toThrowError(
              CategoryNameIsTooLongError,
            );
          },
        );

        test.each(validValues)(
          'should create a CategoryName from %p',
          (valid) => {
            // Arrange

            // Act
            const categoryName = CategoryName.create(valid);

            // Assert
            expect(categoryName.getName).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two CategoryName created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const categoryName_1 = CategoryName.create(text1);
            const categoryName_2 = CategoryName.create(text2);
            const result = categoryName_1.equals(categoryName_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two CategoryName created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const categoryName1 = CategoryName.create(text);
            const categoryName2 = CategoryName.create(text);
            const result = categoryName1.equals(categoryName2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
