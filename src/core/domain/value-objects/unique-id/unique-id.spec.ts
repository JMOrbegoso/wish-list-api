import { UniqueId, InvalidUniqueIdError } from '..';

describe('core', () => {
  describe('domain', () => {
    describe('value-objects', () => {
      describe('unique-id', () => {
        const validValues = [
          '1',
          'id',
          '61872ad79452fa50b7b70f80',
          '61872ad79452gd41c8c80f81',
        ];

        test.each([undefined, null, ''])(
          'should throw an error when trying to create an UniqueId from %p',
          (invalid) => {
            // Arrange

            // Act

            // Assert
            expect(() => UniqueId.create(invalid)).toThrowError(
              InvalidUniqueIdError,
            );
          },
        );

        test.each(validValues)(
          'should to create an UniqueId from %p',
          (valid) => {
            // Arrange

            // Act
            const userName = UniqueId.create(valid);

            // Assert
            expect(userName.getId).toBe(valid);
          },
        );

        test.each([
          [validValues[0], validValues[1]],
          [validValues[1], validValues[0]],
          [validValues[0], validValues[2]],
          [validValues[2], validValues[0]],
          [validValues[0], validValues[3]],
        ])(
          'comparing two UniqueId created from two different values (%p and %p) should return false',
          (text1, text2) => {
            // Arrange

            // Act
            const userName_1 = UniqueId.create(text1);
            const userName_2 = UniqueId.create(text2);
            const result = userName_1.equals(userName_2);

            // Assert
            expect(result).toBe(false);
          },
        );

        test.each(validValues)(
          'comparing two UniqueId created from the same value (%p) should return true',
          (text) => {
            // Arrange

            // Act
            const userName1 = UniqueId.create(text);
            const userName2 = UniqueId.create(text);
            const result = userName1.equals(userName2);

            // Assert
            expect(result).toBe(true);
          },
        );
      });
    });
  });
});
