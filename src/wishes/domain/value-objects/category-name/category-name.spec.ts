import { CategoryName, InvalidCategoryNameError } from '..';

describe('wishes', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('category-name', () => {
        const validValues = [
          'Tech',
          'University',
          'Travels',
          'School',
          'Home',
          'Tv',
        ];

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

        test.each(validValues)(
          'should to create a CategoryName from %p',
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
